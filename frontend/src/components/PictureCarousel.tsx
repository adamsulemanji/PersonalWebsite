'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { pictures } from '@/assets/images';

export default function PictureCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + pictures.length) % pictures.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % pictures.length);
  }, []);

  // Autoplay, but pause on hover/focus and never auto-advance for visitors
  // who prefer reduced motion — they can still step through manually.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, paused, reduceMotion]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div
      className='relative mx-auto max-w-2xl overflow-hidden rounded-2xl'
      role='group'
      aria-roledescription='carousel'
      aria-label='Photos of Adam'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className='relative aspect-[4/3]'>
        <AnimatePresence custom={direction} mode='popLayout'>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='absolute inset-0'
          >
            <Image
              src={pictures[index].src}
              alt={pictures[index].alt}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 672px'
            />
          </motion.div>
        </AnimatePresence>

        <div className='absolute inset-0 flex items-center justify-between px-3'>
          <button
            onClick={prev}
            className='rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/40 dark:bg-black/50 dark:hover:bg-black/80 dark:focus-visible:ring-white/50'
            aria-label='Previous image'
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className='rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/40 dark:bg-black/50 dark:hover:bg-black/80 dark:focus-visible:ring-white/50'
            aria-label='Next image'
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-1.5'>
          {pictures.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </div>

      <p
        className='mt-3 text-sm text-gray-400 dark:text-gray-500'
        aria-live='polite'
      >
        {pictures[index].alt}
      </p>
    </div>
  );
}
