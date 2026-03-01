# Analytics Setup

This repo now supports two observability layers:

- `PostHog` for page views, clicks, and a shareable dashboard.
- `CloudFront` access logs for raw request traffic in S3.

## 1. Create a PostHog project

1. Log in to PostHog and create or open your project.
2. Copy the project API key.
3. If you use PostHog Cloud in the US, the host is `https://us.i.posthog.com`.
   If your project is in the EU, use the matching PostHog host for that region.

## 2. Create a dashboard to embed on `/admin`

1. In PostHog, create a dashboard with the charts you want.
2. Suggested panels:
   - page views by route
   - top clicked projects
   - social link clicks
   - resume downloads
   - outbound link clicks
3. Share the dashboard publicly and copy the shared dashboard URL.

## 3. Configure local development

Copy the example file and add your values:

```bash
cp frontend/.env.example frontend/.env.local
```

Set:

- `NEXT_PUBLIC_POSTHOG_TOKEN`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_POSTHOG_DASHBOARD_URL`

## 4. Configure the production pipeline

The CDK pipeline expects a Secrets Manager secret named
`personal-website-posthog` with JSON keys:

```json
{
  "host": "https://us.i.posthog.com",
  "token": "phc_your_project_api_key",
  "dashboardUrl": "https://us.posthog.com/shared_dashboard/your-dashboard-id"
}
```

Create it with the AWS CLI:

```bash
aws secretsmanager create-secret \
  --name personal-website-posthog \
  --secret-string '{"host":"https://us.i.posthog.com","token":"phc_your_project_api_key","dashboardUrl":"https://us.posthog.com/shared_dashboard/your-dashboard-id"}'
```

If the secret already exists, update it:

```bash
aws secretsmanager put-secret-value \
  --secret-id personal-website-posthog \
  --secret-string '{"host":"https://us.i.posthog.com","token":"phc_your_project_api_key","dashboardUrl":"https://us.posthog.com/shared_dashboard/your-dashboard-id"}'
```

## 5. Deploy

1. Deploy the CDK stack once so the pipeline picks up the new build env vars
   and CloudFront logging bucket.
2. Push to `main`.
3. Open `/admin/` after the deploy to confirm the dashboard embed.

## 6. Query raw traffic logs

CloudFront access logs are written to the S3 bucket output by the stack.
Use Athena or QuickSight on top of that bucket if you want a second dashboard
for request-level traffic, referrers, and geo analysis.
