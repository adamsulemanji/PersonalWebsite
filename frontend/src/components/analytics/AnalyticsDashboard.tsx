const trackedEvents = [
  'page_viewed',
  'nav_link_clicked',
  'social_link_clicked',
  'resume_downloaded',
  'project_clicked',
  'update_clicked',
  'picture_opened',
  'theme_toggled',
  'ui_clicked',
];

const dashboardUrl = process.env.NEXT_PUBLIC_POSTHOG_DASHBOARD_URL?.trim();
const posthogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_TOKEN?.trim()
);

function StatusCard({
  description,
  title,
  value,
}: {
  description: string;
  title: string;
  value: string;
}) {
  return (
    <div className='border-black/10 bg-white/75 dark:border-white/10 dark:bg-white/5 rounded-3xl border p-5 shadow-sm backdrop-blur-sm'>
      <p className='text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.3em]'>
        {title}
      </p>
      <p className='text-gray-900 dark:text-gray-100 mt-3 text-2xl font-semibold'>
        {value}
      </p>
      <p className='text-gray-600 dark:text-gray-300 mt-2 text-sm leading-relaxed'>
        {description}
      </p>
    </div>
  );
}

export default function AnalyticsDashboard() {
  return (
    <div className='mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-16'>
      <section className='border-black/10 dark:border-white/10 relative overflow-hidden rounded-[2rem] border bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(135deg,_rgba(255,255,255,0.92),_rgba(243,244,246,0.88))] p-8 shadow-xl dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.24),_transparent_35%),linear-gradient(135deg,_rgba(10,10,10,0.96),_rgba(24,24,27,0.96))] sm:p-12'>
        <div className='absolute inset-0 opacity-30'>
          <div className='bg-orange-300/30 dark:bg-sky-500/20 absolute -left-12 top-16 h-40 w-40 rounded-full blur-3xl' />
          <div className='bg-emerald-400/25 dark:bg-emerald-400/15 absolute bottom-0 right-0 h-56 w-56 rounded-full blur-3xl' />
        </div>
        <div className='relative'>
          <p className='text-gray-500 dark:text-gray-400 text-sm uppercase tracking-[0.45em]'>
            Analytics Admin
          </p>
          <h1 className='text-gray-950 dark:text-white mt-4 font-serif text-4xl font-semibold md:text-6xl'>
            Website observability<span className='accent'>.</span>
          </h1>
          <p className='text-gray-700 dark:text-gray-300 mt-5 max-w-3xl text-base leading-relaxed'>
            Frontend events flow into PostHog for page views and clicks, while
            CloudFront writes raw request logs to S3 for traffic verification,
            referrers, and geo analysis in Athena or QuickSight.
          </p>
          <div className='mt-8 grid gap-4 md:grid-cols-3'>
            <StatusCard
              title='PostHog SDK'
              value={posthogConfigured ? 'Configured' : 'Missing token'}
              description='The site sends page and click events from the browser when NEXT_PUBLIC_POSTHOG_TOKEN is set.'
            />
            <StatusCard
              title='Dashboard Embed'
              value={dashboardUrl ? 'Ready' : 'Needs shared URL'}
              description='Add NEXT_PUBLIC_POSTHOG_DASHBOARD_URL to embed a shared PostHog dashboard directly on this page.'
            />
            <StatusCard
              title='Traffic Logs'
              value='CloudFront to S3'
              description='CDK enables CloudFront access logging so raw request traffic is retained outside the frontend SDK.'
            />
          </div>
        </div>
      </section>

      <section className='mt-10 grid gap-8 lg:grid-cols-[0.9fr_minmax(0,1.1fr)]'>
        <div className='space-y-6'>
          <div className='border-black/10 bg-white/85 dark:border-white/10 dark:bg-white/5 rounded-[1.75rem] border p-6 shadow-sm'>
            <p className='text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.35em]'>
              Events
            </p>
            <h2 className='text-gray-900 dark:text-gray-100 mt-3 text-2xl font-semibold'>
              What is tracked
            </h2>
            <div className='mt-5 flex flex-wrap gap-3'>
              {trackedEvents.map((eventName) => (
                <span
                  key={eventName}
                  className='border-black/10 bg-black/[0.03] text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 rounded-full border px-3 py-1 text-sm'
                >
                  {eventName}
                </span>
              ))}
            </div>
          </div>

          <div className='border-black/10 bg-white/85 dark:border-white/10 dark:bg-white/5 rounded-[1.75rem] border p-6 shadow-sm'>
            <p className='text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.35em]'>
              Raw logs
            </p>
            <h2 className='text-gray-900 dark:text-gray-100 mt-3 text-2xl font-semibold'>
              AWS traffic trail
            </h2>
            <p className='text-gray-600 dark:text-gray-300 mt-4 text-sm leading-relaxed'>
              CloudFront request logs are written to a dedicated S3 bucket on
              each deploy. Use Athena for ad hoc queries and QuickSight if you
              want a second dashboard for geography, referrers, or bot traffic.
            </p>
          </div>

          <div className='border-black/10 bg-white/85 dark:border-white/10 dark:bg-white/5 rounded-[1.75rem] border p-6 shadow-sm'>
            <p className='text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.35em]'>
              Setup files
            </p>
            <p className='text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed'>
              Follow `docs/analytics.md` to create the PostHog project API key,
              share a dashboard, and inject the values into your pipeline build.
            </p>
          </div>
        </div>

        <div className='border-black/10 bg-white/90 dark:border-white/10 dark:bg-black/30 rounded-[1.75rem] border p-4 shadow-xl'>
          {dashboardUrl ? (
            <iframe
              src={dashboardUrl}
              title='PostHog dashboard'
              className='bg-white min-h-[900px] w-full rounded-[1.25rem]'
            />
          ) : (
            <div className='border-black/10 dark:border-white/10 flex min-h-[900px] flex-col justify-between rounded-[1.25rem] border border-dashed bg-[linear-gradient(135deg,_rgba(249,250,251,0.95),_rgba(229,231,235,0.75))] p-8 dark:bg-[linear-gradient(135deg,_rgba(24,24,27,0.96),_rgba(9,9,11,0.96))]'>
              <div>
                <p className='text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.35em]'>
                  Embed pending
                </p>
                <h2 className='text-gray-900 dark:text-gray-100 mt-4 text-3xl font-semibold'>
                  Add a shared PostHog dashboard URL
                </h2>
                <p className='text-gray-600 dark:text-gray-300 mt-4 max-w-2xl text-sm leading-relaxed'>
                  Create a dashboard in PostHog, share it publicly, and set
                  `NEXT_PUBLIC_POSTHOG_DASHBOARD_URL` to the shared link. This
                  page will render it automatically on the next deploy.
                </p>
              </div>

              <div className='border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/5 rounded-3xl border p-5'>
                <p className='text-gray-900 dark:text-gray-100 text-sm font-medium'>
                  Suggested dashboard widgets
                </p>
                <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                  <div className='bg-black/[0.03] text-gray-700 dark:bg-white/5 dark:text-gray-200 rounded-2xl p-4 text-sm'>
                    Daily page views by route
                  </div>
                  <div className='bg-black/[0.03] text-gray-700 dark:bg-white/5 dark:text-gray-200 rounded-2xl p-4 text-sm'>
                    Top outbound links and projects
                  </div>
                  <div className='bg-black/[0.03] text-gray-700 dark:bg-white/5 dark:text-gray-200 rounded-2xl p-4 text-sm'>
                    Resume downloads and social clicks
                  </div>
                  <div className='bg-black/[0.03] text-gray-700 dark:bg-white/5 dark:text-gray-200 rounded-2xl p-4 text-sm'>
                    Geography from CloudFront or PostHog
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
