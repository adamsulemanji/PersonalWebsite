'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaStrava, FaGoodreads } from 'react-icons/fa';
import { SiLetterboxd } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

import Books from '@/components/Books';
import Updates from '@/components/Update';
import Projects from '@/components/Project';
import MovieList from '@/components/Movie/MovieList';
import SectionHeader from '@/components/SectionHeader';
import { analyticsAttributes } from '@/lib/analytics';
import { imagesLeft, imagesRight } from '@/assets/images';

const allImages = [...imagesLeft, ...imagesRight];

const highlights = [
  { label: 'Based in', value: 'Seattle, WA' },
  { label: 'Current role', value: 'Software Engineer at Amazon' },
  { label: 'Outside of work', value: 'Skiing, sports, and being outdoors' },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 p-1.5 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors'
      aria-label='Toggle theme'
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

function PictureCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + allImages.length) % allImages.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % allImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className='relative mx-auto max-w-2xl overflow-hidden rounded-2xl'>
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
              src={allImages[index].src}
              alt={allImages[index].alt}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 672px'
            />
          </motion.div>
        </AnimatePresence>

        <div className='absolute inset-0 flex items-center justify-between px-3'>
          <button
            onClick={prev}
            className='rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition hover:bg-white dark:bg-black/50 dark:hover:bg-black/80'
            aria-label='Previous image'
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className='rounded-full bg-white/70 p-2 shadow backdrop-blur-sm transition hover:bg-white dark:bg-black/50 dark:hover:bg-black/80'
            aria-label='Next image'
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-1.5'>
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <p className='mt-3 text-sm text-gray-400 dark:text-gray-500'>
        {allImages[index].alt}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className='w-full px-6 pb-32 pt-16 sm:px-12 sm:pt-24 md:px-20'>
      <div className='mx-auto flex w-full max-w-3xl flex-col gap-24'>

        {/* Hero */}
        <motion.section
          className='one group relative'
          id='section-intro'
          initial={false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className='text-left font-serif text-4xl font-light leading-[1.05] sm:text-6xl md:mt-8 md:text-7xl'>
            <motion.span
              className='block'
              initial={false}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Hi, my
            </motion.span>
            <motion.span
              className='block'
              initial={false}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              name is{' '}
              <b className='text-5xl sm:text-7xl md:text-8xl'>Adam</b>
              <span className='accent'>.</span>
            </motion.span>
          </div>
          <span className='bg-green-700 dark:bg-blue-500 absolute -bottom-5 left-0 mt-5 h-2 w-0 transition-all group-hover:w-2/3' />
        </motion.section>

        {/* Intro text + links */}
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className='max-w-2xl space-y-4 text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:text-base'>
            <p>
              I'm a Software Engineer at{' '}
              <span className='text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-600 dark:hover:decoration-gray-300 transition-colors'>
                Amazon
              </span>{' '}
              in Seattle, WA building systems to aid the payments processing
              flow. Before this, I was working in Amazon Web Services on Model
              Customization with AI Agents, Human in the Loop and Mechanical
              Turk. My philosophy is to build in order to learn and make the
              lives of people around me easier.
            </p>
            <p>
              I've previously worked at{' '}
              <span className='text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600'>
                Amazon.com
              </span>{' '}
              building crossborder software,{' '}
              <span className='text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600'>
                Goldman Sachs
              </span>{' '}
              determining market risk, and{' '}
              <span className='text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600'>
                PricewaterhouseCoopers
              </span>{' '}
              helping non-profits.
            </p>
          </div>

          <div className='mt-8 flex flex-wrap items-center gap-5 text-gray-500 dark:text-gray-400 text-xl'>
            <a
              href='https://github.com/adamsulemanji'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('social_link_clicked', { label: 'github', section: 'hero' })}
            >
              <FaGithub />
            </a>
            <a
              href='https://www.linkedin.com/in/adamsulemanji/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('social_link_clicked', { label: 'linkedin', section: 'hero' })}
            >
              <FaLinkedin />
            </a>
            <a
              href='https://www.instagram.com/adam_sulemanji'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('social_link_clicked', { label: 'instagram', section: 'hero' })}
            >
              <FaInstagram />
            </a>
            <a
              href='mailto:adam.k.sulemanji@gmail.com'
              className='hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('social_link_clicked', { label: 'email', section: 'hero' })}
            >
              <FaEnvelope />
            </a>
            <a
              href='https://www.strava.com/athletes/109469044'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('social_link_clicked', { label: 'strava', section: 'hero' })}
            >
              <FaStrava />
            </a>
            <a
              href='https://www.goodreads.com/user/show/146321248-adam-sulemanji'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('social_link_clicked', { label: 'goodreads', section: 'hero' })}
            >
              <FaGoodreads />
            </a>
            <a
              href='https://letterboxd.com/adamsulemanji'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('social_link_clicked', { label: 'letterboxd', section: 'hero' })}
            >
              <SiLetterboxd />
            </a>
            <a
              href='https://beliapp.co/user/adamsulemanji'
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('social_link_clicked', { label: 'beli', section: 'hero' })}
            >
              Beli
            </a>
            <a
              href='/resume.pdf'
              className='text-sm hover:text-gray-900 dark:hover:text-white transition-colors'
              {...analyticsAttributes('resume_downloaded', { label: 'resume', section: 'hero' })}
            >
              Resume
            </a>
            <ThemeToggle />
          </div>
        </motion.div>

        {/* Scroll line */}
        <motion.section
          className='hidden w-full grid-cols-1 md:grid md:grid-cols-2'
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <div className='flex flex-col items-center gap-4'>
            <motion.p
              className='text-m mb-2 tracking-widest'
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Scroll !
            </motion.p>
            <svg height='750' width='1' className='hidden md:block'>
              <motion.line
                x1='1'
                y1='0'
                x2='1'
                y2='5000'
                stroke='black'
                strokeWidth='1'
                className='dark:stroke-white'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: 'easeOut' }}
              />
            </svg>
          </div>
        </motion.section>

        {/* About */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='About' />
          <div className='grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12'>
            <div>
              <div className='relative aspect-[4/5] overflow-hidden rounded-2xl'>
                <Image
                  src='/images/kid.jpg'
                  alt='Picture of little me'
                  fill
                  sizes='(max-width: 1024px) 100vw, 40vw'
                  className='object-cover'
                />
              </div>
              <p className='mt-3 text-sm text-gray-400 dark:text-gray-500'>
                Me around age 7. I look a little older now.
              </p>
            </div>

            <div className='space-y-8'>
              <div className='space-y-4 text-[15px] leading-7 text-gray-600 dark:text-gray-300'>
                <p>
                  I&apos;m a software engineer at Amazon in Seattle, building
                  software that helps connect people to international products.
                </p>
                <p>
                  Outside of work, I spend a lot of time outdoors and I&apos;ll
                  play almost any sport. Right now skiing is the main obsession,
                  and I&apos;ve been trying to make the most of being close to
                  the mountains.
                </p>
                <p>
                  During the rest of the year, I sign up for impromptu races,
                  keep building side projects, and stay in touch with friends
                  through whatever app, group chat, or hobby is current.
                </p>
              </div>

              <div className='space-y-3'>
                {highlights.map((item) => (
                  <div key={item.label} className='flex gap-4'>
                    <span className='w-28 shrink-0 text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 pt-0.5'>
                      {item.label}
                    </span>
                    <span className='text-sm text-gray-700 dark:text-gray-300'>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pictures */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Pictures' />
          <PictureCarousel />
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Projects' />
          <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
            Things I&apos;ve built
          </p>
          <Projects />
        </motion.div>

        {/* Updates */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Updates' />
          <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
            Life updates and things
          </p>
          <Updates category='all' />
        </motion.div>

        {/* Books */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Books' />
          <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
            Recently read, in progress, or on the list
          </p>
          <Books />
        </motion.div>

        {/* Movies */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Movies' />
          <p className='mb-6 text-sm text-gray-500 dark:text-gray-400'>
            Most recent watches
          </p>
          <MovieList />
        </motion.div>

      </div>
    </div>
  );
}
