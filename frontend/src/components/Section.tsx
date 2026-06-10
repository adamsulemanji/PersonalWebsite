'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

/** Fade-in-on-scroll section wrapper with an optional header and subtitle. */
export default function Section({
  title,
  subtitle,
  id,
  children,
}: {
  title: string;
  subtitle?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: '-100px' }}
      id={id}
    >
      <SectionHeader title={title} />
      {subtitle && (
        <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}
