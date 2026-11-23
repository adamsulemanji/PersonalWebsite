import * as cdk from "aws-cdk-lib";
import * as athena from "aws-cdk-lib/aws-athena";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as cloudwatch_actions from "aws-cdk-lib/aws-cloudwatch-actions";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as glue from "aws-cdk-lib/aws-glue";
import * as iam from "aws-cdk-lib/aws-iam";
import * as rum from "aws-cdk-lib/aws-rum";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";

import { FrontendConstruct } from "./cloudfront";

export interface ObservabilityConstructProps {
  frontendConstruct: FrontendConstruct;
}

export class ObservabilityConstruct extends Construct {
  public readonly athenaResultsBucket: s3.Bucket;
  public readonly dashboard: cloudwatch.Dashboard;
  public readonly databaseName = "personal_website_analytics";
  public readonly tableName = "cloudfront_access_logs";
  public readonly workGroupName = "personal-website-observability";
  public readonly rumAppMonitor: rum.CfnAppMonitor;
  public readonly rumIdentityPool: cognito.CfnIdentityPool;
  public readonly alarmTopic: sns.Topic;

  constructor(
    scope: Construct,
    id: string,
    props: ObservabilityConstructProps,
  ) {
    super(scope, id);

    this.athenaResultsBucket = new s3.Bucket(this, "AthenaResultsBucket", {
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(30),
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // CloudWatch RUM measures browser sessions and page views. Its Cognito
    // identity is unauthenticated but the role can only submit events to this
    // one app monitor; it cannot read analytics or access other AWS resources.
    this.rumIdentityPool = new cognito.CfnIdentityPool(
      this,
      "RumIdentityPool",
      {
        allowUnauthenticatedIdentities: true,
      },
    );

    const rumGuestRole = new iam.Role(this, "RumGuestRole", {
      assumedBy: new iam.FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": this.rumIdentityPool.ref,
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "unauthenticated",
          },
        },
        "sts:AssumeRoleWithWebIdentity",
      ),
    });

    this.rumAppMonitor = new rum.CfnAppMonitor(this, "RumAppMonitor", {
      name: "personal-website",
      domainList: ["adamsulemanji.com", "www.adamsulemanji.com"],
      cwLogEnabled: false,
      // Required for the frontend's click events (see lib/analytics.ts) —
      // without it RUM rejects every recordEvent call.
      customEvents: { status: "ENABLED" },
      appMonitorConfiguration: {
        allowCookies: true,
        enableXRay: false,
        guestRoleArn: rumGuestRole.roleArn,
        identityPoolId: this.rumIdentityPool.ref,
        sessionSampleRate: 1,
        telemetries: ["errors", "performance", "http"],
      },
    });

    rumGuestRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["rum:PutRumEvents"],
        resources: [
          cdk.Stack.of(this).formatArn({
            service: "rum",
            resource: "appmonitor",
            resourceName: this.rumAppMonitor.name,
          }),
        ],
      }),
    );

    new cognito.CfnIdentityPoolRoleAttachment(this, "RumIdentityPoolRoles", {
      identityPoolId: this.rumIdentityPool.ref,
      roles: { unauthenticated: rumGuestRole.roleArn },
    });

    const database = new glue.CfnDatabase(this, "AnalyticsDatabase", {
      catalogId: cdk.Stack.of(this).account,
      databaseInput: {
        description: "Athena database for personal website CloudFront logs",
        name: this.databaseName,
      },
    });

    const table = new glue.CfnTable(this, "CloudFrontLogsTable", {
      catalogId: cdk.Stack.of(this).account,
      databaseName: this.databaseName,
      tableInput: {
        description: "CloudFront standard access logs",
        name: this.tableName,
        parameters: {
          EXTERNAL: "TRUE",
          "skip.header.line.count": "2",
        },
        storageDescriptor: {
          columns: [
            { name: "log_date", type: "date" },
            { name: "log_time", type: "string" },
            { name: "x_edge_location", type: "string" },
            { name: "sc_bytes", type: "bigint" },
            { name: "c_ip", type: "string" },
            { name: "cs_method", type: "string" },
            { name: "cs_host", type: "string" },
            { name: "cs_uri_stem", type: "string" },
            { name: "sc_status", type: "int" },
            { name: "cs_referer", type: "string" },
            { name: "cs_user_agent", type: "string" },
            { name: "cs_uri_query", type: "string" },
            { name: "cs_cookie", type: "string" },
            { name: "x_edge_result_type", type: "string" },
            { name: "x_edge_request_id", type: "string" },
            { name: "x_host_header", type: "string" },
            { name: "cs_protocol", type: "string" },
            { name: "cs_bytes", type: "bigint" },
            { name: "time_taken", type: "double" },
            { name: "x_forwarded_for", type: "string" },
            { name: "ssl_protocol", type: "string" },
            { name: "ssl_cipher", type: "string" },
            { name: "x_edge_response_result_type", type: "string" },
            { name: "cs_protocol_version", type: "string" },
            { name: "fle_status", type: "string" },
            { name: "fle_encrypted_fields", type: "int" },
            { name: "c_port", type: "int" },
            { name: "time_to_first_byte", type: "double" },
            { name: "x_edge_detailed_result_type", type: "string" },
            { name: "sc_content_type", type: "string" },
            { name: "sc_content_len", type: "bigint" },
            { name: "sc_range_start", type: "bigint" },
            { name: "sc_range_end", type: "bigint" },
          ],
          inputFormat: "org.apache.hadoop.mapred.TextInputFormat",
          location: `s3://${props.frontendConstruct.accessLogsBucket.bucketName}/cloudfront/`,
          outputFormat:
            "org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat",
          serdeInfo: {
            parameters: {
              "field.delim": "\t",
              "serialization.format": "\t",
            },
            serializationLibrary:
              "org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe",
          },
        },
        tableType: "EXTERNAL_TABLE",
      },
    });
    table.addDependency(database);

    const workGroup = new athena.CfnWorkGroup(this, "AnalyticsWorkGroup", {
      name: this.workGroupName,
      recursiveDeleteOption: true,
      state: "ENABLED",
      workGroupConfiguration: {
        enforceWorkGroupConfiguration: true,
        publishCloudWatchMetricsEnabled: true,
        requesterPaysEnabled: false,
        // Hard cap at 1 GB per query to prevent runaway scans on large log history
        bytesScannedCutoffPerQuery: 1 * 1024 * 1024 * 1024,
        resultConfiguration: {
          outputLocation: `s3://${this.athenaResultsBucket.bucketName}/query-results/`,
        },
      },
    });

    const savedQueries = [
      {
        description: "Requests per day for the last 30 days",
        name: "daily_requests_last_30_days",
        queryString: `SELECT log_date, COUNT(*) AS requests
FROM ${this.tableName}
WHERE log_date >= current_date - interval '30' day
GROUP BY log_date
ORDER BY log_date DESC;`,
      },
      {
        description: "Requests per month across all retained logs",
        name: "monthly_request_history",
        queryString: `SELECT date_trunc('month', CAST(log_date AS timestamp)) AS month,
       COUNT(*) AS requests
FROM ${this.tableName}
GROUP BY 1
ORDER BY 1 DESC;`,
      },
      {
        description:
          "Approximate unique clients per day for the last 30 days; includes bots and shared IPs",
        name: "approximate_daily_unique_clients",
        queryString: `SELECT log_date, COUNT(DISTINCT c_ip) AS approximate_unique_clients
FROM ${this.tableName}
WHERE log_date >= current_date - interval '30' day
GROUP BY log_date
ORDER BY log_date DESC;`,
      },
      {
        description: "Top requested paths for the last 30 days",
        name: "top_paths_last_30_days",
        queryString: `SELECT cs_uri_stem AS path, COUNT(*) AS requests
FROM ${this.tableName}
WHERE log_date >= current_date - interval '30' day
GROUP BY cs_uri_stem
ORDER BY requests DESC
LIMIT 25;`,
      },
      {
        description: "Top referrers for the last 30 days",
        name: "top_referrers_last_30_days",
        queryString: `SELECT cs_referer AS referer, COUNT(*) AS requests
FROM ${this.tableName}
WHERE log_date >= current_date - interval '30' day
  AND cs_referer <> '-'
GROUP BY cs_referer
ORDER BY requests DESC
LIMIT 25;`,
      },
      {
        description: "Top user agents for the last 30 days",
        name: "top_user_agents_last_30_days",
        queryString: `SELECT cs_user_agent AS user_agent, COUNT(*) AS requests
FROM ${this.tableName}
WHERE log_date >= current_date - interval '30' day
GROUP BY cs_user_agent
ORDER BY requests DESC
LIMIT 25;`,
      },
      {
        description: "Status code counts for the last 30 days",
        name: "status_codes_last_30_days",
        queryString: `SELECT sc_status, COUNT(*) AS requests
FROM ${this.tableName}
WHERE log_date >= current_date - interval '30' day
GROUP BY sc_status
ORDER BY requests DESC;`,
      },
    ];

    savedQueries.forEach((query) => {
      const namedQuery = new athena.CfnNamedQuery(
        this,
        `NamedQuery${this.toPascalCase(query.name)}`,
        {
          database: this.databaseName,
          description: query.description,
          name: query.name,
          queryString: query.queryString,
          workGroup: this.workGroupName,
        },
      );
      namedQuery.addDependency(workGroup);
      namedQuery.addDependency(table);
    });

    // ***********************
    // CLOUDWATCH ALARMS
    // ***********************
    const distribution = props.frontendConstruct.apexDistribution;

    // CloudFront publishes every metric with Region=Global alongside the
    // DistributionId. The CDK helpers (distribution.metricRequests() etc.) leave
    // Region off, which names a series that doesn't exist, so the dashboard was
    // blank and the alarms could never fire. Always build them through this.
    const cfMetric = (
      metricName: string,
      statistic: string,
      period: cdk.Duration,
      label?: string,
    ) =>
      new cloudwatch.Metric({
        namespace: "AWS/CloudFront",
        metricName,
        dimensionsMap: {
          DistributionId: distribution.distributionId,
          Region: "Global",
        },
        statistic,
        period,
        region: "us-east-1",
        label,
      });

    const rumMetric = (
      metricName: string,
      statistic: string,
      period: cdk.Duration,
      label?: string,
    ) =>
      new cloudwatch.Metric({
        namespace: "AWS/RUM",
        metricName,
        dimensionsMap: { application_name: this.rumAppMonitor.name },
        statistic,
        period,
        label,
      });

    const fiveMinutes = cdk.Duration.minutes(5);

    // Alarms are useless without a destination — notify by email.
    // The subscription must be confirmed once from the inbox.
    const alarmTopic = new sns.Topic(this, "AlarmTopic", {
      displayName: "personal-website-alarms",
    });
    alarmTopic.addSubscription(
      new subscriptions.EmailSubscription("adam.k.sulemanji@gmail.com"),
    );
    this.alarmTopic = alarmTopic;

    const alarm5xx = new cloudwatch.Alarm(this, "Alarm5xx", {
      metric: cfMetric("5xxErrorRate", "Average", fiveMinutes),
      threshold: 1,
      evaluationPeriods: 2,
      comparisonOperator:
        cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      alarmDescription: "5xx error rate >= 1% for 10 consecutive minutes",
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    alarm5xx.addAlarmAction(new cloudwatch_actions.SnsAction(alarmTopic));
    alarm5xx.addOkAction(new cloudwatch_actions.SnsAction(alarmTopic));

    const alarm4xx = new cloudwatch.Alarm(this, "Alarm4xx", {
      metric: cfMetric("4xxErrorRate", "Average", fiveMinutes),
      threshold: 10,
      evaluationPeriods: 2,
      comparisonOperator:
        cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      alarmDescription: "4xx error rate >= 10% for 10 consecutive minutes",
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    alarm4xx.addAlarmAction(new cloudwatch_actions.SnsAction(alarmTopic));
    alarm4xx.addOkAction(new cloudwatch_actions.SnsAction(alarmTopic));

    // ***********************
    // CLOUDWATCH DASHBOARD
    // ***********************
    this.dashboard = new cloudwatch.Dashboard(this, "TrafficDashboard", {
      dashboardName: "personal-website-traffic",
      defaultInterval: cdk.Duration.days(30),
    });

    const day = cdk.Duration.days(1);
    const hour = cdk.Duration.hours(1);

    this.dashboard.addWidgets(
      new cloudwatch.TextWidget({
        markdown: [
          "# Personal Website",
          "",
          "**Visitors** are real browsers (CloudWatch RUM). **Requests** are everything CloudFront served, bots and crawlers included, so they run far higher.",
          "",
          `Distribution \`${distribution.distributionId}\` · RUM monitor \`${this.rumAppMonitor.name}\` · Athena workgroup \`${this.workGroupName}\` (saved queries for top paths, referrers and user agents) · logs in \`${props.frontendConstruct.accessLogsBucket.bucketName}\``,
        ].join("\n"),
        width: 24,
        height: 3,
      }),
      new cloudwatch.AlarmStatusWidget({
        title: "Alarms",
        alarms: [alarm5xx, alarm4xx],
        width: 24,
        height: 2,
      }),
    );

    // Real visitors (RUM)
    const sessions = rumMetric("SessionCount", "Sum", day, "Sessions");
    const pageViews = rumMetric("PageViewCount", "Sum", day, "Page views");
    this.dashboard.addWidgets(
      new cloudwatch.SingleValueWidget({
        title: "Visitors in range",
        metrics: [sessions, pageViews],
        setPeriodToTimeRange: true,
        width: 8,
        height: 5,
      }),
      new cloudwatch.GraphWidget({
        title: "Visitors per day",
        left: [sessions, pageViews],
        leftYAxis: { min: 0 },
        width: 16,
        height: 5,
      }),
    );

    this.dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: "Page speed (p75, ms)",
        left: [
          rumMetric(
            "WebVitalsLargestContentfulPaint",
            "p75",
            day,
            "Largest contentful paint",
          ),
          rumMetric("PerformanceNavigationDuration", "p75", day, "Page load"),
          rumMetric(
            "WebVitalsInteractionToNextPaint",
            "p75",
            day,
            "Interaction to next paint",
          ),
        ],
        leftYAxis: { min: 0 },
        width: 12,
        height: 6,
      }),
      new cloudwatch.GraphWidget({
        title: "Browser errors per page view",
        left: [
          rumMetric("JsErrorCountPerPageView", "Average", day, "JS errors"),
          rumMetric("Http4xxCountPerPageView", "Average", day, "HTTP 4xx"),
          rumMetric("Http5xxCountPerPageView", "Average", day, "HTTP 5xx"),
        ],
        leftYAxis: { min: 0 },
        width: 12,
        height: 6,
      }),
    );

    // All traffic (CloudFront)
    const requests = cfMetric("Requests", "Sum", day, "Requests");
    this.dashboard.addWidgets(
      new cloudwatch.SingleValueWidget({
        title: "Requests in range",
        metrics: [requests],
        setPeriodToTimeRange: true,
        width: 8,
        height: 5,
      }),
      new cloudwatch.GraphWidget({
        title: "Requests per day",
        left: [requests],
        leftYAxis: { min: 0 },
        width: 16,
        height: 5,
      }),
    );

    this.dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: "Error rates (%)",
        left: [
          cfMetric("4xxErrorRate", "Average", hour, "4xx"),
          cfMetric("5xxErrorRate", "Average", hour, "5xx"),
        ],
        leftYAxis: { min: 0 },
        leftAnnotations: [
          { value: 10, label: "4xx alarm", color: cloudwatch.Color.ORANGE },
          { value: 1, label: "5xx alarm", color: cloudwatch.Color.RED },
        ],
        width: 8,
        height: 6,
      }),
      new cloudwatch.GraphWidget({
        title: "Cache hit rate (%)",
        left: [cfMetric("CacheHitRate", "Average", hour, "Cache hit rate")],
        leftYAxis: { min: 0, max: 100 },
        width: 8,
        height: 6,
      }),
      new cloudwatch.GraphWidget({
        title: "Data transferred (bytes)",
        left: [
          cfMetric("BytesDownloaded", "Sum", hour, "Downloaded"),
          cfMetric("BytesUploaded", "Sum", hour, "Uploaded"),
        ],
        leftYAxis: { min: 0 },
        width: 8,
        height: 6,
      }),
    );

    new cdk.CfnOutput(this, "AthenaResultsBucketName", {
      value: this.athenaResultsBucket.bucketName,
      description:
        "Bucket storing Athena query results for CloudFront analytics",
      exportName: "AthenaResultsBucketName",
    });

    new cdk.CfnOutput(this, "AnalyticsAthenaDatabaseName", {
      value: this.databaseName,
      description: "Athena database containing CloudFront log metadata",
      exportName: "AnalyticsAthenaDatabaseName",
    });

    new cdk.CfnOutput(this, "AnalyticsAthenaWorkGroupName", {
      value: this.workGroupName,
      description: "Athena workgroup containing saved CloudFront log queries",
      exportName: "AnalyticsAthenaWorkGroupName",
    });

    new cdk.CfnOutput(this, "CloudWatchDashboardName", {
      value: this.dashboard.dashboardName,
      description: "CloudWatch dashboard showing CloudFront traffic metrics",
      exportName: "CloudWatchDashboardName",
    });
  }

  private toPascalCase(value: string) {
    return value
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }
}
