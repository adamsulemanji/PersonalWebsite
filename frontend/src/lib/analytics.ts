export type AnalyticsValue = boolean | number | string | null | undefined;

export type AnalyticsProperties = Record<string, AnalyticsValue>;

export function analyticsAttributes(
  event: string,
  properties: AnalyticsProperties = {}
) {
  const attributes: Record<string, string> = {
    'data-analytics-event': event,
  };

  for (const [key, value] of Object.entries(properties)) {
    if (value === undefined || value === null) {
      continue;
    }

    const attributeName = key.replace(
      /[A-Z]/g,
      (match) => `-${match.toLowerCase()}`
    );
    attributes[`data-analytics-${attributeName}`] = String(value);
  }

  return attributes;
}
