import * as cdk from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";

import { FrontendConstruct } from "../lib/cloudfront";
import { ObservabilityConstruct } from "../lib/observability";

describe("website infrastructure", () => {
  const app = new cdk.App({
    context: {
      "hosted-zone:account=111111111111:domainName=adamsulemanji.com:region=us-east-1":
        {
          Id: "/hostedzone/Z123456789",
          Name: "adamsulemanji.com.",
        },
    },
  });
  const stack = new cdk.Stack(app, "TestStack", {
    env: { account: "111111111111", region: "us-east-1" },
  });
  const frontend = new FrontendConstruct(stack, "Website");
  new ObservabilityConstruct(stack, "Observability", {
    frontendConstruct: frontend,
  });
  const template = Template.fromStack(stack);

  test("keeps the site private, encrypted, and recoverable", () => {
    template.hasResourceProperties("AWS::S3::Bucket", {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          {
            ServerSideEncryptionByDefault: { SSEAlgorithm: "AES256" },
          },
        ],
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
      VersioningConfiguration: { Status: "Enabled" },
    });
  });

  test("uses modern TLS and HTTP/3 on both distributions", () => {
    template.resourcePropertiesCountIs(
      "AWS::CloudFront::Distribution",
      {
        DistributionConfig: Match.objectLike({
          HttpVersion: "http2and3",
          ViewerCertificate: Match.objectLike({
            MinimumProtocolVersion: "TLSv1.2_2021",
          }),
        }),
      },
      2,
    );
  });

  test("publishes IPv4 and IPv6 aliases for apex and www", () => {
    template.resourceCountIs("AWS::Route53::RecordSet", 4);
    template.resourcePropertiesCountIs(
      "AWS::Route53::RecordSet",
      { Type: "AAAA" },
      2,
    );
  });

  test("only permits read requests at the CDN edge", () => {
    template.resourcePropertiesCountIs(
      "AWS::CloudFront::Distribution",
      {
        DistributionConfig: Match.objectLike({
          DefaultCacheBehavior: Match.objectLike({
            AllowedMethods: ["GET", "HEAD"],
            Compress: true,
            ViewerProtocolPolicy: "redirect-to-https",
          }),
        }),
      },
      2,
    );
  });

  test("samples every browser session with CloudWatch RUM", () => {
    template.hasResourceProperties("AWS::Cognito::IdentityPool", {
      AllowUnauthenticatedIdentities: true,
    });
    template.hasResourceProperties("AWS::RUM::AppMonitor", {
      Name: "personal-website",
      DomainList: ["adamsulemanji.com", "www.adamsulemanji.com"],
      AppMonitorConfiguration: Match.objectLike({
        AllowCookies: true,
        EnableXRay: false,
        SessionSampleRate: 1,
        Telemetries: ["errors", "performance", "http"],
      }),
    });
  });

  // The frontend reports clicks via recordEvent; RUM drops them unless custom
  // events are explicitly enabled on the app monitor.
  test("accepts the frontend's custom click events", () => {
    template.hasResourceProperties("AWS::RUM::AppMonitor", {
      CustomEvents: { Status: "ENABLED" },
    });
  });

  test("sends a content security policy with every response", () => {
    template.hasResourceProperties("AWS::CloudFront::ResponseHeadersPolicy", {
      ResponseHeadersPolicyConfig: Match.objectLike({
        SecurityHeadersConfig: Match.objectLike({
          ContentSecurityPolicy: Match.objectLike({
            ContentSecurityPolicy: Match.stringLikeRegexp(
              "object-src 'none'.*frame-ancestors 'none'",
            ),
            Override: true,
          }),
          StrictTransportSecurity: Match.objectLike({
            AccessControlMaxAgeSec: 31536000,
            IncludeSubdomains: true,
            Preload: true,
          }),
        }),
        CustomHeadersConfig: Match.objectLike({
          Items: Match.arrayWith([
            Match.objectLike({ Header: "Permissions-Policy" }),
          ]),
        }),
      }),
    });
  });

  test("logs requests from both distributions", () => {
    template.resourcePropertiesCountIs(
      "AWS::CloudFront::Distribution",
      {
        DistributionConfig: Match.objectLike({
          Logging: Match.anyValue(),
        }),
      },
      2,
    );
  });
});
