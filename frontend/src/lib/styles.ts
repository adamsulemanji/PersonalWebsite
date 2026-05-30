/**
 * Shared design-system class fragments. Centralized so the recurring patterns
 * in /design.md have a single source of truth. Compose with extra utilities via
 * a template literal, e.g. `className={`${metaLabel} shrink-0`}`.
 */

/** Inline text-link underline treatment (gray decoration, no accent color). */
export const underlineLink =
  'underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-600 dark:decoration-gray-600 dark:hover:decoration-gray-300';

/** Section eyebrow label — the `0.2em` uppercase tier. */
export const sectionLabel =
  'text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500';

/** Inline metadata (dates, captions, field labels) — the `0.15em` tier. */
export const metaLabel =
  'text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500';
