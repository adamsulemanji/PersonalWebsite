import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origin from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as bucket from 'aws-cdk-lib/aws-s3-deployment';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

export class FrontendConstruct extends Construct {
    constructor(app: Construct, id: string) {
        super(app, id);

        const domainName = 'adamsulemanji.com';
        const subDomain = 'www';
        const fullDomain = `${subDomain}.${domainName}`;

        // ********** WWW Frontend Bucket **********
        const wwwBucket = new s3.Bucket(this, `myBucket-${subDomain}`, {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        // ********** Apex Redirect Bucket **********
        const apexBucket = new s3.Bucket(this, 'myBucket-apex', {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            websiteRedirect: {
                hostName: fullDomain,
                protocol: s3.RedirectProtocol.HTTPS,
            },
        });

        const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
            this,
            `cloudfront-OAI-${subDomain}`
        );

        // ********** WWW Bucket Policy **********
        wwwBucket.addToResourcePolicy(
            new iam.PolicyStatement({
                actions: ['s3:GetObject'],
                resources: [wwwBucket.arnForObjects('*')],
                principals: [
                    new iam.CanonicalUserPrincipal(
                        cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
                    ),
                ],
            })
        );

        // ********** Route 53 **********
        const zone = route53.HostedZone.fromLookup(this, 'HostedZone', {
            domainName: domainName,
        });

        // ********** ACM Certificates **********
        const wwwCertificate = new acm.Certificate(
            this,
            `Certificate-${subDomain}`,
            {
                domainName: fullDomain,
                validation: acm.CertificateValidation.fromDns(zone),
            }
        );

        const apexCertificate = new acm.Certificate(
            this,
            'Certificate-apex',
            {
                domainName: domainName,
                validation: acm.CertificateValidation.fromDns(zone),
            }
        );

        // ********** WWW CloudFront Distribution **********
        const s3Origin = new origin.S3Origin(wwwBucket, {
            originAccessIdentity: cloudfrontOAI,
        });

        const wwwDistribution = new cloudfront.Distribution(
            this,
            `myDist-${subDomain}`,
            {
                defaultBehavior: {
                    origin: s3Origin,
                    viewerProtocolPolicy:
                        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
                },
                defaultRootObject: 'index.html',
                domainNames: [fullDomain],
                certificate: wwwCertificate,
                errorResponses: [
                    {
                        httpStatus: 403,
                        responseHttpStatus: 200,
                        responsePagePath: '/index.html',
                        ttl: cdk.Duration.minutes(1),
                    },
                    {
                        httpStatus: 404,
                        responseHttpStatus: 200,
                        responsePagePath: '/index.html',
                        ttl: cdk.Duration.minutes(1),
                    },
                ],
            }
        );

        // ********** Apex CloudFront Distribution **********
        const apexDistribution = new cloudfront.Distribution(
            this,
            'myDist-apex',
            {
                defaultBehavior: {
                    origin: new origin.S3Origin(apexBucket),
                    viewerProtocolPolicy:
                        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                },
                domainNames: [domainName],
                certificate: apexCertificate,
            }
        );

        // ********** Route 53 Alias Records **********
        new route53.ARecord(this, `AliasRecord-${subDomain}`, {
            zone,
            recordName: subDomain,
            target: route53.RecordTarget.fromAlias(
                new route53targets.CloudFrontTarget(wwwDistribution)
            ),
        });

        new route53.ARecord(this, 'AliasRecord-apex', {
            zone,
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(
                new route53targets.CloudFrontTarget(apexDistribution)
            ),
        });

        // ********** Bucket Deployment **********
        new bucket.BucketDeployment(
            this,
            `DeployWithInvalidation-${subDomain}`,
            {
                sources: [bucket.Source.asset('./frontend/build')],
                destinationBucket: wwwBucket,
                distribution: wwwDistribution,
                memoryLimit: 1024,
                ephemeralStorageSize: cdk.Size.mebibytes(1024),
                distributionPaths: ['/*'],
            }
        );

        // ********** Outputs **********
        new cdk.CfnOutput(this, `DistributionDomainName-${subDomain}`, {
            value: wwwDistribution.domainName,
            description: `Distribution Domain Name for ${subDomain}`,
            exportName: `DistributionDomainName-${subDomain}`,
        });

        new cdk.CfnOutput(this, 'DistributionDomainName-apex', {
            value: apexDistribution.domainName,
            description: 'Distribution Domain Name for apex',
            exportName: 'DistributionDomainName-apex',
        });
    }
}