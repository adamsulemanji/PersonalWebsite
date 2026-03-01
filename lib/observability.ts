import * as cdk from "aws-cdk-lib";
import * as athena from "aws-cdk-lib/aws-athena";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as glue from "aws-cdk-lib/aws-glue";
import * as s3 from "aws-cdk-lib/aws-s3";
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

  constructor(
    scope: Construct,
    id: string,
    props: ObservabilityConstructProps
  ) {
    super(scope, id);

    this.athenaResultsBucket = new s3.Bucket(this, "AthenaResultsBucket", {
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(30),
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
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
        }
      );
      namedQuery.addDependency(workGroup);
      namedQuery.addDependency(table);
    });

    this.dashboard = new cloudwatch.Dashboard(this, "TrafficDashboard", {
      dashboardName: "personal-website-traffic",
      defaultInterval: cdk.Duration.days(14),
    });

    const metricOptions = {
      region: "us-east-1",
    };

    this.dashboard.addWidgets(
      new cloudwatch.TextWidget({
        markdown: [
          "# Personal Website Traffic",
          "",
          `- Distribution ID: \`${props.frontendConstruct.apexDistribution.distributionId}\``,
          `- Athena database: \`${this.databaseName}\``,
          `- Athena table: \`${this.tableName}\``,
          `- Athena workgroup: \`${this.workGroupName}\``,
          `- Raw log bucket: \`${props.frontendConstruct.accessLogsBucket.bucketName}\``,
          "",
          "Use the saved Athena queries in the `personal-website-observability` workgroup for top paths, referrers, user agents, and daily request trends.",
        ].join("\n"),
        width: 24,
        height: 6,
      }),
      new cloudwatch.GraphWidget({
        title: "Requests and Data Transfer",
        width: 12,
        left: [
          props.frontendConstruct.apexDistribution.metricRequests({
            ...metricOptions,
            period: cdk.Duration.hours(1),
            statistic: "Sum",
          }),
        ],
        right: [
          props.frontendConstruct.apexDistribution.metricBytesDownloaded({
            ...metricOptions,
            period: cdk.Duration.hours(1),
            statistic: "Sum",
          }),
          props.frontendConstruct.apexDistribution.metricBytesUploaded({
            ...metricOptions,
            period: cdk.Duration.hours(1),
            statistic: "Sum",
          }),
        ],
      }),
      new cloudwatch.GraphWidget({
        title: "Error Rates and Cache Efficiency",
        width: 12,
        left: [
          props.frontendConstruct.apexDistribution.metric4xxErrorRate({
            ...metricOptions,
            period: cdk.Duration.hours(1),
            statistic: "Average",
          }),
          props.frontendConstruct.apexDistribution.metric5xxErrorRate({
            ...metricOptions,
            period: cdk.Duration.hours(1),
            statistic: "Average",
          }),
        ],
        right: [
          props.frontendConstruct.apexDistribution.metricCacheHitRate({
            ...metricOptions,
            period: cdk.Duration.hours(1),
            statistic: "Average",
          }),
        ],
      })
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
