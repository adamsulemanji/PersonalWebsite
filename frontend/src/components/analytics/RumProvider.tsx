'use client';

import { useEffect, type PropsWithChildren } from 'react';
import { AwsRum, type AwsRumConfig } from 'aws-rum-web';

let hasInitializedRum = false;

export default function RumProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    if (hasInitializedRum) return;

    const applicationId = process.env.NEXT_PUBLIC_AWS_RUM_APP_MONITOR_ID;
    const identityPoolId = process.env.NEXT_PUBLIC_AWS_RUM_IDENTITY_POOL_ID;
    const region = process.env.NEXT_PUBLIC_AWS_RUM_REGION;
    if (!applicationId || !identityPoolId || !region) return;

    const config: AwsRumConfig = {
      allowCookies: true,
      enableXRay: false,
      endpoint: `https://dataplane.rum.${region}.amazonaws.com`,
      identityPoolId,
      sessionSampleRate: 1,
      telemetries: ['errors', 'performance', 'http'],
    };

    try {
      new AwsRum(applicationId, '1.0.0', region, config);
      hasInitializedRum = true;
    } catch (error) {
      // Analytics must never interfere with the site itself.
      console.warn('CloudWatch RUM failed to initialize', error);
    }
  }, []);

  return <>{children}</>;
}
