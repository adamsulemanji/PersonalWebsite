'use client';

import { useEffect, type PropsWithChildren } from 'react';
import type { AwsRum, AwsRumConfig } from 'aws-rum-web';
import { ANALYTICS_EVENT_ATTR, readAnalyticsEvent } from '@/lib/analytics';

// Module-level so Strict Mode's double-effect reuses the one monitor.
let rum: AwsRum | null = null;

/** Imported lazily: ~128 KB that shouldn't ship when RUM isn't configured. */
async function initRum(): Promise<AwsRum | null> {
  if (rum) return rum;

  const applicationId = process.env.NEXT_PUBLIC_AWS_RUM_APP_MONITOR_ID;
  const identityPoolId = process.env.NEXT_PUBLIC_AWS_RUM_IDENTITY_POOL_ID;
  const region = process.env.NEXT_PUBLIC_AWS_RUM_REGION;
  if (!applicationId || !identityPoolId || !region) return null;

  const config: AwsRumConfig = {
    allowCookies: true,
    enableXRay: false,
    endpoint: `https://dataplane.rum.${region}.amazonaws.com`,
    identityPoolId,
    sessionSampleRate: 1,
    telemetries: ['errors', 'performance', 'http'],
  };

  try {
    const { AwsRum: AwsRumClass } = await import('aws-rum-web');
    rum = new AwsRumClass(applicationId, '1.0.0', region, config);
  } catch (error) {
    // Analytics must never interfere with the site itself.
    console.warn('CloudWatch RUM failed to initialize', error);
    rum = null;
  }
  return rum;
}

export default function RumProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void initRum().then((monitor) => {
      if (!monitor || cancelled) return;

      // One delegated listener; components just tag themselves.
      const onClick = (event: MouseEvent) => {
        const target = (event.target as Element | null)?.closest?.(
          `[${ANALYTICS_EVENT_ATTR}]`
        );
        if (!target) return;

        const parsed = readAnalyticsEvent(target);
        if (!parsed) return;

        try {
          monitor.recordEvent(parsed.name, parsed.properties);
        } catch (error) {
          console.warn('CloudWatch RUM failed to record event', error);
        }
      };

      document.addEventListener('click', onClick, { capture: true });
      cleanup = () => document.removeEventListener('click', onClick, true);
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
