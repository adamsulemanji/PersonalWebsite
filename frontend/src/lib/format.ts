/**
 * Format a date-only ISO string, e.g. "Mar 4, 2026" / "March 4, 2026".
 *
 * Formatted in UTC: `new Date('2026-04-10')` is UTC midnight, so rendering it
 * in a negative-offset timezone would print the 9th.
 */
export function formatDate(iso: string, month: 'short' | 'long' = 'short') {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  });
}
