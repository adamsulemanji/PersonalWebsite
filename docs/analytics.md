# AWS Traffic Analytics

This stack now uses AWS-native traffic analytics for the website:

- CloudFront standard access logs are written to S3.
- Athena is configured to query those logs.
- Saved Athena queries are created for common traffic questions.
- A CloudWatch dashboard is created for high-level traffic metrics.

## What gets created

The CDK stack provisions:

- a CloudFront access logs bucket
- an Athena results bucket
- an Athena database: `personal_website_analytics`
- an Athena table: `cloudfront_access_logs`
- an Athena workgroup: `personal-website-observability`
- a CloudWatch dashboard: `personal-website-traffic`

## What the dashboard shows

The CloudWatch dashboard shows:

- request volume
- bytes downloaded and uploaded
- 4xx error rate
- 5xx error rate
- cache hit rate

This is the fast overview dashboard inside your AWS account.

## What Athena is for

Use the saved Athena queries for deeper log analysis, including:

- requests per day
- top requested paths
- top referrers
- top user agents
- status code counts

## Deploy

Deploy the CDK stack once:

```bash
npx cdk deploy
```

After the deploy:

1. Open CloudWatch Dashboards and view `personal-website-traffic`.
2. Open Athena.
3. Choose the workgroup `personal-website-observability`.
4. Open the saved queries and run the ones you want.

## Notes

- CloudFront logs are not instant. Expect a delay before data appears.
- The Athena table points at the CloudFront log prefix automatically.
- CloudFront metrics are shown in CloudWatch immediately, but log-based Athena
  analysis only becomes useful after logs land in S3.
- This setup tracks traffic and request behavior, not client-side clicks. For
  click-level product analytics, you still need a frontend event system.
