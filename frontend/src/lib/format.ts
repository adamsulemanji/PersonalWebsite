/** Format an ISO date string for display, e.g. "Mar 4, 2026" / "March 4, 2026". */
export function formatDate(iso: string, month: 'short' | 'long' = 'short') {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
  });
}
