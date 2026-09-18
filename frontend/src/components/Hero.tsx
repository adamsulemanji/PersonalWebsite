'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/** The homepage intro's animated wrappers, islanded so the page stays server-side. */
export function HeroTitle() {
  return (
    <motion.section
      className='group relative'
      id='section-intro'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className='text-left font-serif text-4xl font-light leading-[1.05] sm:text-6xl md:mt-8 md:text-7xl'>
        <motion.span
          className='block'
          initial={{ x: -16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Hi, my
        </motion.span>
        <motion.span
          className='block'
          initial={{ x: -16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          name is <b className='text-5xl sm:text-7xl md:text-8xl'>Adam</b>
          <span className='accent'>.</span>
        </motion.span>
      </h1>
      <span className='accent-bar absolute -bottom-5 left-0 mt-5 h-2 w-0 transition-all group-hover:w-2/3' />
    </motion.section>
  );
}

/** Fades its children up once, on mount. */
export function FadeIn({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
