'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaStrava,
  FaGoodreads,
} from 'react-icons/fa';
import { SiLetterboxd } from 'react-icons/si';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

import Books from '@/components/Books';
import Updates from '@/components/Update';
import Projects from '@/components/Project';
import Experience from '@/components/Experience';
import Writing from '@/components/Writing';
import MovieList from '@/components/Movie/MovieList';
import SectionHeader from '@/components/SectionHeader';
import { analyticsAttributes } from '@/lib/analytics';
import { metaLabel } from '@/lib/styles';
import { imagesLeft, imagesRight } from '@/assets/images';

const allImages = [...imagesLeft, ...imagesRight];

const highlights = [
  { label: 'Based in', value: 'Seattle, WA' },
  { label: 'Current role', value: 'Software Engineer at Amazon' },
  { label: 'Outside of work', value: 'Skiing, sports, and being outdoors' },
];

interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
  event?: string;
  small?: boolean;
}

const socials: SocialLink[] = [
  {
    label: 'github',
    href: 'https://github.com/adamsulemanji',
    icon: <FaGithub />,
  },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/adamsulemanji/',
    icon: <FaLinkedin />,
  },
  {
    label: 'instagram',
    href: 'https://www.instagram.com/adam_sulemanji',
    icon: <FaInstagram />,
  },
  {
    label: 'email',
    href: 'mailto:adam.k.sulemanji@gmail.com',
    icon: <FaEnvelope />,
  },
  {
    label: 'strava',
    href: 'https://www.strava.com/athletes/109469044',
    icon: <FaStrava />,
  },
  {
    label: 'goodreads',
    href: 'https://www.goodreads.com/user/show/146321248-adam-sulemanji',
    icon: <FaGoodreads />,
  },
  {
    label: 'letterboxd',
    href: 'https://letterboxd.com/adamsulemanji',
    icon: <SiLetterboxd />,
  },
  {
    label: 'beli',
    href: 'https://beliapp.co/user/adamsulemanji',
    icon: 'Beli',
    small: true,
  },
  {
    label: 'resume',
    href: '/resume.pdf',
    icon: 'Resume',
    event: 'resume_downloaded',
    small: true,
  },
];

function SocialLinks() {
  return (
    <div className='mt-8 flex flex-wrap items-center gap-5 text-xl text-gray-500 dark:text-gray-400'>
      {socials.map((social) => {
        const isExternal = social.href.startsWith('http');
        return (
          <a
            key={social.label}
            href={social.href}
            {...(isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className={`rounded transition-colors hover:text-gray-900 focus-visible:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:hover:text-white dark:focus-visible:text-white dark:focus-visible:ring-gray-500 ${
              social.small ? 'text-sm' : ''
            }`}
            {...analyticsAttributes(social.event ?? 'social_link_clicked', {
              label: social.label,
              section: 'hero',
            })}
          >
            {social.icon}
          </a>
        );
      })}
      <ThemeToggle />
    </div>
  );
}

/** Fade-in-on-scroll section wrapper with an optional header and subtitle. */
function Section({
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

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='flex items-center justify-center rounded-full border border-gray-300 p-1.5 text-gray-500 transition-colors hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:focus-visible:ring-gray-500'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

function PictureCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + allImages.length) % allImages.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % allImages.length);
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
          {allImages.map((_, i) => (
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
        {allImages[index].alt}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className='w-full px-6 pb-32 pt-16 sm:px-12 sm:pt-24 md:px-20'>
      <div className='mx-auto flex w-full max-w-4xl flex-col gap-24'>
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
              name is <b className='text-5xl sm:text-7xl md:text-8xl'>Adam</b>
              <span className='accent'>.</span>
            </motion.span>
          </div>
          <span className='accent-bar absolute -bottom-5 left-0 mt-5 h-2 w-0 transition-all group-hover:w-2/3' />
        </motion.section>

        {/* Intro text + links */}
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className='max-w-2xl space-y-4 text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:text-base'>
            <p>
              I&apos;m a Software Engineer at{' '}
              <span className='text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-600 dark:text-white dark:decoration-gray-600 dark:hover:decoration-gray-300'>
                Amazon
              </span>{' '}
              in Seattle, WA building systems to aid the payments processing
              flow. Before this, I was working in Amazon Web Services on Model
              Customization with AI Agents, Human in the Loop and Mechanical
              Turk. My philosophy is to build in order to learn and make the
              lives of people around me easier.
            </p>
            <p>
              I&apos;ve previously worked at{' '}
              <span className='text-gray-900 underline decoration-gray-300 underline-offset-4 dark:text-white dark:decoration-gray-600'>
                Amazon.com
              </span>{' '}
              building crossborder software,{' '}
              <span className='text-gray-900 underline decoration-gray-300 underline-offset-4 dark:text-white dark:decoration-gray-600'>
                Goldman Sachs
              </span>{' '}
              determining market risk, and{' '}
              <span className='text-gray-900 underline decoration-gray-300 underline-offset-4 dark:text-white dark:decoration-gray-600'>
                PricewaterhouseCoopers
              </span>{' '}
              helping non-profits.
            </p>
          </div>

          <SocialLinks />
        </motion.div>

        {/* Now */}
        <Section title='Now' id='section-now'>
          <div className='max-w-2xl space-y-4 text-[15px] leading-7 text-gray-600 dark:text-gray-300'>
            <p>
              Ramping up on a new team in Global Payments at Amazon — relearning
              a large codebase from scratch and enjoying the fresh context.
              Outside of work, I&apos;m stretching the tail end of ski season
              and starting to plan a few spring races.
            </p>
            <p>
              Side-project-wise, I&apos;m iterating on this site, cleaning up
              the CDK pipeline behind it, and slowly chipping away at a writing
              habit (see below).
            </p>
            <p className={metaLabel}>Updated April 2026</p>
          </div>
        </Section>

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
        <Section title='About'>
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
                    <span className={`w-28 shrink-0 pt-0.5 ${metaLabel}`}>
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
        </Section>

        {/* Experience */}
        <Section
          title='Experience'
          subtitle="Where I've worked"
          id='section-experience'
        >
          <Experience />
        </Section>

        {/* Pictures */}
        <Section title='Pictures'>
          <PictureCarousel />
        </Section>

        {/* Projects */}
        <Section title='Projects' subtitle="Things I've built">
          <Projects />
        </Section>

        {/* Writing */}
        <Section
          title='Writing'
          subtitle='Occasional notes and essays'
          id='section-writing'
        >
          <Writing />
        </Section>

        {/* Updates */}
        <Section title='Updates' subtitle='Life updates and things'>
          <Updates category='all' />
        </Section>

        {/* Books */}
        <Section
          title='Books'
          subtitle='Recently read, in progress, or on the list'
        >
          <Books />
        </Section>

        {/* Movies */}
        <Section title='Movies' subtitle='Most recent watches'>
          <MovieList />
        </Section>
      </div>
    </div>
  );
}
