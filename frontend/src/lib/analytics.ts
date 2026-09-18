/**
 * Vendor-neutral click instrumentation: components spread
 * `analyticsAttributes(...)` onto an element, and `RumProvider`'s delegated
 * listener reads it back. Swapping providers touches one file.
 */

export type AnalyticsValue = boolean | number | string | null | undefined;

export type AnalyticsProperties = Record<string, AnalyticsValue>;

export const ANALYTICS_EVENT_ATTR = 'data-analytics-event';

const PROPERTY_PREFIX = 'data-analytics-';

const toKebab = (key: string) =>
  key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const toCamel = (key: string) =>
  key.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());

export function analyticsAttributes(
  event: string,
  properties: AnalyticsProperties = {}
) {
  const attributes: Record<string, string> = {
    [ANALYTICS_EVENT_ATTR]: event,
  };

  for (const [key, value] of Object.entries(properties)) {
    if (value === undefined || value === null) {
      continue;
    }
    attributes[`${PROPERTY_PREFIX}${toKebab(key)}`] = String(value);
  }

  return attributes;
}

/** Inverse of `analyticsAttributes`; `null` if the element carries no event. */
export function readAnalyticsEvent(element: Element) {
  const name = element.getAttribute(ANALYTICS_EVENT_ATTR);
  if (!name) return null;

  const properties: Record<string, string> = {};
  for (const attribute of Array.from(element.attributes)) {
    if (
      !attribute.name.startsWith(PROPERTY_PREFIX) ||
      attribute.name === ANALYTICS_EVENT_ATTR
    ) {
      continue;
    }
    properties[toCamel(attribute.name.slice(PROPERTY_PREFIX.length))] =
      attribute.value;
  }

  return { name, properties };
}
