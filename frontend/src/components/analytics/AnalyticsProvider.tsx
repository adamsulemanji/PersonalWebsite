'use client';

import { useEffect, useState, type PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com';

let hasInitializedPostHog = false;
let lastTrackedUrl = '';

function getClickableElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return null;
  return target.closest<HTMLElement>(
    '[data-analytics-event], a[href], button, [role="button"]'
  );
}

function normalizeDatasetKey(key: string) {
  const withoutPrefix = key.replace(/^analytics/, '');
  return withoutPrefix.charAt(0).toLowerCase() + withoutPrefix.slice(1);
}

export default function AnalyticsProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [ready, setReady] = useState(hasInitializedPostHog);

  // Defer init to idle time so analytics doesn't compete with hydration and
  // first paint. The capture effects below are gated on `ready` so the
  // initial pageview still fires once init completes.
  useEffect(() => {
    if (!posthogToken) return;
    if (hasInitializedPostHog) {
      setReady(true);
      return;
    }

    const init = () => {
      posthog.init(posthogToken, {
        api_host: posthogHost,
        autocapture: false,
        capture_pageleave: true,
        capture_pageview: false,
        persistence: 'localStorage+cookie',
      });
      hasInitializedPostHog = true;
      setReady(true);
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(init, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(init, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!posthogToken || !pathname || !ready) return;

    const url = window.location.href;
    if (lastTrackedUrl === url) return;

    lastTrackedUrl = url;
    posthog.capture('page_viewed', {
      path: pathname,
      search: window.location.search,
      title: document.title,
      url,
    });
  }, [pathname, ready]);

  useEffect(() => {
    if (!posthogToken || !ready) return;

    const handleClick = (event: MouseEvent) => {
      const el = getClickableElement(event.target);
      if (!el) return;

      const trackedLink =
        el instanceof HTMLAnchorElement
          ? el
          : el.closest<HTMLAnchorElement>('a[href]');

      const properties = Object.entries(el.dataset).reduce<
        Record<string, string | boolean>
      >((acc, [key, value]) => {
        if (!value || key === 'analyticsEvent') return acc;
        acc[normalizeDatasetKey(key)] = value;
        return acc;
      }, {});

      const eventName = el.dataset.analyticsEvent || 'ui_clicked';
      const label =
        el.dataset.analyticsLabel ||
        el.getAttribute('aria-label') ||
        el.textContent?.trim() ||
        el.tagName.toLowerCase();

      if (trackedLink) {
        properties.href = trackedLink.href;
        properties.isExternal = trackedLink.origin !== window.location.origin;
      }

      posthog.capture(eventName, {
        ...properties,
        currentPath: window.location.pathname,
        label,
        tagName: el.tagName.toLowerCase(),
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [ready]);

  return <>{children}</>;
}
