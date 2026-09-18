'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

import { pictures } from '@/assets/images';

const AUTOPLAY_MS = 4000;

const controlButton =
  'rounded-full bg-white/70 p-2 text-gray-900 shadow backdrop-blur-sm transition hover:bg-white dark:bg-black/50 dark:text-white dark:hover:bg-black/80';

export default function PictureCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  // `playing` is the visitor's choice; `suspended` is hover/focus.
  const [playing, setPlaying] = useState(true);
  const [suspended, setSuspended] = useState(false);
  const reduceMotion = useReducedMotion();

  // Announce only visitor-driven changes, or autoplay interrupts screen readers.
  const [announce, setAnnounce] = useState(false);
  const step = useCallback((delta: number, manual: boolean) => {
    setDirection(delta);
    setIndex((i) => (i + delta + pictures.length) % pictures.length);
    if (manual) setAnnounce(true);
  }, []);

  const prev = useCallback(() => step(-1, true), [step]);
  const next = useCallback(() => step(1, true), [step]);

  const autoplayActive = playing && !suspended && !reduceMotion;

  // Re-armed on each `index` change, so a manual step gets a full interval.
  useEffect(() => {
    if (!autoplayActive) return;
    const timer = setTimeout(() => step(1, false), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [autoplayActive, step, index]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div
      className='relative mx-auto max-w-2xl'
      role='group'
      aria-roledescription='carousel'
      aria-label='Photos of Adam'
      onMouseEnter={() => setSuspended(true)}
      onMouseLeave={() => setSuspended(false)}
      onFocusCapture={() => setSuspended(true)}
      onBlurCapture={() => setSuspended(false)}
    >
      <div className='relative aspect-[4/3] overflow-hidden rounded-2xl'>
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
            role='group'
            aria-roledescription='slide'
            aria-label={`${index + 1} of ${pictures.length}`}
          >
            <Image
              src={pictures[index].src}
              alt={pictures[index].alt}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 672px'
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        <div className='absolute inset-0 flex items-center justify-between px-3'>
          <button
            type='button'
            onClick={prev}
            className={controlButton}
            aria-label='Previous image'
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type='button'
            onClick={next}
            className={controlButton}
            aria-label='Next image'
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className='absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5'>
          {pictures.map((picture, i) => (
            <button
              type='button'
              key={picture.src}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                setAnnounce(true);
              }}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </div>

      <div className='mt-3 flex items-start justify-between gap-4'>
        <p
          className='text-sm text-gray-400 dark:text-gray-500'
          aria-live={announce ? 'polite' : 'off'}
        >
          {pictures[index].alt}
        </p>
        {/* WCAG 2.2.2: self-starting motion needs a stop that isn't hover. */}
        {!reduceMotion && (
          <button
            type='button'
            onClick={() => setPlaying((p) => !p)}
            className='shrink-0 rounded-full border border-gray-300 p-1.5 text-gray-500 transition-colors hover:border-gray-400 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500'
            aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}
