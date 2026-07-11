# AWS Traffic Analytics

This stack now uses AWS-native traffic analytics for the website:

- CloudWatch RUM records browser users, sessions, page views, geography,
  devices, and frontend performance.
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
- a CloudWatch RUM app monitor: `personal-website`
- a Cognito identity pool and submit-only guest role for the RUM web client

## What the dashboard shows

The CloudWatch dashboard shows:

- total requests across the dashboard's selected time range
- daily request volume, with a 30-day default view
- request volume
- bytes downloaded and uploaded
- 4xx error rate
- 5xx error rate
- cache hit rate

This is the fast overview dashboard inside your AWS account.

For human-oriented traffic, open CloudWatch, choose **Application Signals**,
then **RUM**, and open `personal-website`. The user and session counts are based
on browsers that execute the RUM client, unlike CloudFront request counts.

## What Athena is for

Use the saved Athena queries for deeper log analysis, including:

- requests per day
- top requested paths
- top referrers
- top user agents
- status code counts
- monthly request history
- approximate daily unique clients based on distinct IP addresses

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
- CloudWatch `Requests` measures HTTP requests, not people. A single page view
  can request many HTML, JavaScript, image, and font files, and bot traffic is
  included.
- RUM is configured to sample 100% of browser sessions and allow its first-party
  user/session cookies. Visitors who block JavaScript, cookies, or AWS telemetry
  endpoints will not be counted, so no browser analytics system can produce a
  perfectly exact human count.
- Native RUM event history is retained by the service for 30 days.
- The unique-client Athena query is only an estimate: shared IP addresses can
  combine people, changing IP addresses can split one person, and bots remain
  included.
- Raw access logs are retained for 90 days. CloudWatch keeps aggregated metric
  history according to its standard retention policy.
- This setup tracks traffic and request behavior, not client-side clicks. For
  click-level product analytics, you still need a frontend event system.
