'use client';

import { useEffect, type PropsWithChildren } from 'react';
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

  useEffect(() => {
    if (!posthogToken || hasInitializedPostHog) return;

    posthog.init(posthogToken, {
      api_host: posthogHost,
      autocapture: false,
      capture_pageleave: true,
      capture_pageview: false,
      persistence: 'localStorage+cookie',
    });

    hasInitializedPostHog = true;
  }, []);

  useEffect(() => {
    if (
      !posthogToken ||
      !pathname ||
      !hasInitializedPostHog ||
      typeof window === 'undefined'
    )
      return;

    const url = window.location.href;
    if (lastTrackedUrl === url) return;

    lastTrackedUrl = url;
    posthog.capture('page_viewed', {
      path: pathname,
      search: window.location.search,
      title: document.title,
      url,
    });
  }, [pathname]);

  useEffect(() => {
    if (!posthogToken || !hasInitializedPostHog || typeof document === 'undefined')
      return;

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
  }, []);

  return <>{children}</>;
}
