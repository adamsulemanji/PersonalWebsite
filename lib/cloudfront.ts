import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export class FrontendConstruct extends Construct {
  public readonly apexBucket: s3.Bucket;
  public readonly apexDistribution: cloudfront.Distribution;
  public readonly wwwDistribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Primary domain is apex: adamsulemanji.com
    const domainName = "adamsulemanji.com";
    // We'll define 'www' subdomain
    const subDomain = "www";
    const wwwDomain = `${subDomain}.${domainName}`;

    // ***********************
    // 1) APEX BUCKET (Real Site)
    // ***********************
    this.apexBucket = new s3.Bucket(this, "ApexBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const apexOAI = new cloudfront.OriginAccessIdentity(this, "ApexOAI");
    this.apexBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [this.apexBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            apexOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    // ***********************
    // 2) WWW BUCKET (Redirect)
    // ***********************
    const wwwBucket = new s3.Bucket(this, "WwwRedirectBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteRedirect: {
        hostName: domainName,
        protocol: s3.RedirectProtocol.HTTPS,
      },
    });

    // ***********************
    // 3) HOSTED ZONE + CERTS
    // ***********************
    const zone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: domainName,
    });

    const apexCertificate = new acm.Certificate(this, "ApexCertificate", {
      domainName: domainName,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    const wwwCertificate = new acm.Certificate(this, "WwwCertificate", {
      domainName: wwwDomain,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    const rewriteFunction = new cloudfront.Function(
      this,
      "DirectoryIndexRewrite",
      {
        code: cloudfront.FunctionCode.fromInline(`
    function handler(event) {
      var request = event.request;
      // If path doesn't include a file extension and doesn't end with a slash, rewrite
      if (!request.uri.includes('.') && !request.uri.endsWith('/')) {
        request.uri = request.uri + "/index.html";
      }
      // If path ends with '/', rewrite to '/index.html'
      else if (request.uri.endsWith('/')) {
        request.uri = request.uri + "index.html";
      }
      return request;
    }
      `),
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
          origin: new origins.S3Origin(this.apexBucket, {
            originAccessIdentity: apexOAI,
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          functionAssociations: [
            {
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: rewriteFunction,
            },
          ],
        },
        domainNames: [domainName],
        certificate: apexCertificate,
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
      }
    );

    // WWW DISTRIBUTION: serves the redirect bucket
    // which returns a 301 redirect to apex domain
    this.wwwDistribution = new cloudfront.Distribution(
      this,
      "WwwDistribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(wwwBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        domainNames: [wwwDomain],
        certificate: wwwCertificate,
      }
    );

    // ***********************
    // 5) ROUTE53 ALIAS RECORDS
    // ***********************

    new route53.ARecord(this, "AliasRecordApex", {
      zone,
      recordName: domainName, // e.g., "adamsulemanji.com"
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.apexDistribution)
      ),
    });

    new route53.ARecord(this, "AliasRecordWww", {
      zone,
      recordName: wwwDomain, // e.g., "www.adamsulemanji.com"
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.wwwDistribution)
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
  }
}
