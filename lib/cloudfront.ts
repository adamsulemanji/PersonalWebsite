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
      enforceSSL: true,
    });

    this.accessLogsBucket = new s3.Bucket(this, "AccessLogsBucket", {
      accessControl: s3.BucketAccessControl.LOG_DELIVERY_WRITE,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
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
      this.apexBucket
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
      }
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
      }
    );

    // ***********************
    // 4) CLOUDFRONT DISTRIBUTIONS
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
          functionAssociations: [
            {
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: rewriteFunction,
            },
          ],
        },
        domainNames: [domainName],
        certificate: certificate,
        enableLogging: true,
        publishAdditionalMetrics: true,
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 404,
            responsePagePath: "/index.html",
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
      }
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
          functionAssociations: [
            {
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: wwwRedirectFunction,
            },
          ],
        },
        domainNames: [wwwDomain],
        certificate: certificate,
      }
    );

    // ***********************
    // 5) ROUTE53 ALIAS RECORDS
    // ***********************
    new route53.ARecord(this, "AliasRecordApex", {
      zone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.apexDistribution)
      ),
    });

    new route53.ARecord(this, "AliasRecordWww", {
      zone,
      recordName: wwwDomain,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.wwwDistribution)
      ),
    });

    // ***********************
    // 6) OUTPUTS
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
