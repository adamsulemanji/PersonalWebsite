import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export class FrontendConstruct extends Construct {
  public readonly apexBucket: s3.Bucket;
  public readonly accessLogsBucket: s3.Bucket;
  public readonly apexDistribution: cloudfront.Distribution;
  public readonly wwwDistribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const domainName = "adamsulemanji.com";
    const subDomain = "www";
    const wwwDomain = `${subDomain}.${domainName}`;

    // ***********************
    // 1) APEX BUCKET (Real Site)
    // RETAIN so content survives an accidental stack deletion
    // ***********************
    this.apexBucket = new s3.Bucket(this, "ApexBucket", {
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      lifecycleRules: [
        {
          noncurrentVersionExpiration: cdk.Duration.days(30),
        },
      ],
    });

    this.accessLogsBucket = new s3.Bucket(this, "AccessLogsBucket", {
      accessControl: s3.BucketAccessControl.LOG_DELIVERY_WRITE,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(90),
        },
      ],
      objectOwnership: s3.ObjectOwnership.OBJECT_WRITER,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // OAC replaces the deprecated OAI — CDK automatically grants the bucket policy
    const apexOrigin = origins.S3BucketOrigin.withOriginAccessControl(
      this.apexBucket,
    );

    // ***********************
    // 2) HOSTED ZONE + CERT
    // Single SAN cert covers both apex and www — one cert, one renewal
    // ***********************
    const zone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: domainName,
    });

    const certificate = new acm.Certificate(this, "Certificate", {
      domainName: domainName,
      subjectAlternativeNames: [wwwDomain],
      validation: acm.CertificateValidation.fromDns(zone),
    });

    // ***********************
    // 3) CLOUDFRONT FUNCTIONS
    // ***********************
    const rewriteFunction = new cloudfront.Function(
      this,
      "DirectoryIndexRewrite",
      {
        code: cloudfront.FunctionCode.fromInline(`
          function handler(event) {
            var request = event.request;
            if (!request.uri.includes('.') && !request.uri.endsWith('/')) {
              request.uri = request.uri + "/index.html";
            } else if (request.uri.endsWith('/')) {
              request.uri = request.uri + "index.html";
            }
            return request;
          }`),
      },
    );

    // Returns a 301 before CloudFront ever contacts the origin — no redirect bucket needed
    const wwwRedirectFunction = new cloudfront.Function(
      this,
      "WwwRedirectFunction",
      {
        code: cloudfront.FunctionCode.fromInline(`
          function handler(event) {
            return {
              statusCode: 301,
              statusDescription: 'Moved Permanently',
              headers: {
                location: { value: 'https://${domainName}' + event.request.uri }
              }
            };
          }`),
      },
    );

    // ***********************
    // 4) RESPONSE HEADERS
    // The managed SECURITY_HEADERS policy covers HSTS, nosniff, frame-options,
    // referrer-policy and XSS-protection but has no CSP, so restate those and
    // add one. 'unsafe-inline' is unavoidable: Next inlines its hydration
    // scripts, as does the theme-seeding script in layout.tsx.
    // ***********************
    const securityHeaders = new cloudfront.ResponseHeadersPolicy(
      this,
      "SecurityHeadersPolicy",
      {
        securityHeadersBehavior: {
          strictTransportSecurity: {
            accessControlMaxAge: cdk.Duration.days(365),
            includeSubdomains: true,
            preload: true,
            override: true,
          },
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: cloudfront.HeadersFrameOption.DENY,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy:
              cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
            override: true,
          },
          contentSecurityPolicy: {
            contentSecurityPolicy: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              // Book covers and film posters come from third-party CDNs whose
              // hostnames the upstream APIs are free to change.
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              // The movies API, plus RUM's dataplane and Cognito.
              "connect-src 'self' https://api.fast.adamsulemanji.com https://*.amazonaws.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
            override: true,
          },
        },
        customHeadersBehavior: {
          customHeaders: [
            {
              header: "Permissions-Policy",
              value:
                "camera=(), microphone=(), geolocation=(), interest-cohort=()",
              override: true,
            },
          ],
        },
      },
    );

    // ***********************
    // 5) CLOUDFRONT DISTRIBUTIONS
    // ***********************
    this.apexDistribution = new cloudfront.Distribution(
      this,
      "ApexDistribution",
      {
        defaultBehavior: {
          origin: apexOrigin,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          // Static site only needs GET/HEAD — ALLOW_ALL was unnecessary
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
          responseHeadersPolicy: securityHeaders,
          functionAssociations: [
            {
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: rewriteFunction,
            },
          ],
        },
        domainNames: [domainName],
        certificate: certificate,
        minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
        enableLogging: true,
        publishAdditionalMetrics: true,
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 404,
            responsePagePath: "/404/index.html",
            ttl: cdk.Duration.minutes(0),
          },
          {
            httpStatus: 403,
            responseHttpStatus: 404,
            responsePagePath: "/404/index.html",
            ttl: cdk.Duration.minutes(0),
          },
        ],
        logBucket: this.accessLogsBucket,
        logFilePrefix: "cloudfront/",
      },
    );

    // WWW distribution: the CF Function returns a 301 before reaching the origin,
    // so the apex bucket is a dummy origin that is never actually contacted
    this.wwwDistribution = new cloudfront.Distribution(
      this,
      "WwwDistribution",
      {
        defaultBehavior: {
          origin: apexOrigin,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
          responseHeadersPolicy: securityHeaders,
          functionAssociations: [
            {
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: wwwRedirectFunction,
            },
          ],
        },
        domainNames: [wwwDomain],
        certificate: certificate,
        minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
        enableLogging: true,
        logBucket: this.accessLogsBucket,
        logFilePrefix: "cloudfront-www/",
      },
    );

    // ***********************
    // 6) ROUTE53 ALIAS RECORDS
    // ***********************
    new route53.ARecord(this, "AliasRecordApex", {
      zone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.apexDistribution),
      ),
    });

    new route53.ARecord(this, "AliasRecordWww", {
      zone,
      recordName: wwwDomain,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.wwwDistribution),
      ),
    });

    new route53.AaaaRecord(this, "AliasRecordApexIpv6", {
      zone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.apexDistribution),
      ),
    });

    new route53.AaaaRecord(this, "AliasRecordWwwIpv6", {
      zone,
      recordName: wwwDomain,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.wwwDistribution),
      ),
    });

    // ***********************
    // 7) OUTPUTS
    // ***********************
    new cdk.CfnOutput(this, "ApexDistributionDomainName", {
      value: this.apexDistribution.distributionDomainName,
      description: "Distribution Domain Name (apex)",
      exportName: "ApexDistributionDomainName",
    });
    new cdk.CfnOutput(this, "WwwDistributionDomainName", {
      value: this.wwwDistribution.distributionDomainName,
      description: "Distribution Domain Name (www)",
      exportName: "WwwDistributionDomainName",
    });
    new cdk.CfnOutput(this, "CloudFrontAccessLogsBucketName", {
      value: this.accessLogsBucket.bucketName,
      description: "Bucket receiving CloudFront access logs",
      exportName: "CloudFrontAccessLogsBucketName",
    });
  }
}
