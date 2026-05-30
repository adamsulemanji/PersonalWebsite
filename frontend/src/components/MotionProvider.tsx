'use client';

import { MotionConfig } from 'framer-motion';
import type { PropsWithChildren } from 'react';

/**
 * Makes every Framer Motion animation honor the user's
 * `prefers-reduced-motion` setting — transforms are dropped while opacity
 * fades are kept, so the site stays calm for motion-sensitive visitors.
 */
export default function MotionProvider({ children }: PropsWithChildren) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}
