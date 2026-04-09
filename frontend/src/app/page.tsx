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
    <div className='relative mx-auto max-w-2xl overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800'>
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
              sizes='(max-width: 768px) 100vw, 80vw'
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

      <p className='px-4 py-3 text-sm text-gray-500 dark:text-gray-400'>
        {allImages[index].alt}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className='w-full px-3 pb-12 pt-4 sm:p-20'>
      <div className='mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-8 px-1 sm:px-8'>
        <motion.section
          className='one group relative text-3xl sm:text-5xl md:text-6xl'
          id='section-intro'
          initial={false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className='text-left font-serif text-3xl font-light leading-[1.05] sm:text-5xl sm:leading-tight md:mt-12 md:text-7xl'>
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
              <b className='text-4xl sm:text-6xl md:text-8xl'>Adam</b>
              <span className='accent'>.</span>
            </motion.span>
          </div>
          <span className='bg-green-700 dark:bg-blue-500 absolute -bottom-5 left-0 mt-5 h-2 w-0 transition-all group-hover:w-2/3' />
        </motion.section>

        <motion.div
          className='line-wrapped mt-2 max-w-3xl text-[15px] leading-7 sm:mt-3 sm:text-base'
          initial={false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className='[&>p]:mt-4'>
            <p>
              I'm a Software Engineer at{' '}
              <span className='hover:decoration-green-700 hover:dark:decoration-blue-400 underline underline-offset-4'>
                Amazon
              </span>{' '}
              in Seattle, WA building systems to aid the payments processing
              flow. Before this, I was working in Amazon Web Services working on
              Model Customization w/ AI Agents, Human in the Loop and Mechanical
              Turk. My philosophy in creating and design is to build in order to
              learn and make the lives of people around me easier.
            </p>
            <p>
              I've previously worked at{' '}
              <span className='hover:decoration-green-700 hover:dark:decoration-blue-400 underline underline-offset-4'>
                Amazon.com
              </span>{' '}
              building crossborder software,{' '}
              <span className='hover:decoration-green-700 hover:dark:decoration-blue-400 underline underline-offset-4'>
                Goldman Sachs
              </span>{' '}
              determining market risk and{' '}
              <span className='hover:decoration-green-700 hover:dark:decoration-blue-400 underline underline-offset-4'>
                PricewaterhouseCoopers
              </span>{' '}
              helping non-profits.
            </p>
          </div>

          <div className='mt-8 flex flex-wrap items-center justify-start gap-4 pb-10 text-xl sm:gap-8'>
            <a
              className='hover:underline hover:underline-offset-4'
              href='https://github.com/adamsulemanji'
              target='_blank'
              rel='noopener noreferrer'
              {...analyticsAttributes('social_link_clicked', {
                label: 'github',
                section: 'hero',
              })}
            >
              <FaGithub />
            </a>
            <a
              className='hover:underline hover:underline-offset-4'
              href='https://www.linkedin.com/in/adamsulemanji/'
              target='_blank'
              rel='noopener noreferrer'
              {...analyticsAttributes('social_link_clicked', {
                label: 'linkedin',
                section: 'hero',
              })}
            >
              <FaLinkedin />
            </a>
            <a
              className='hover:underline hover:underline-offset-4'
              href='https://www.instagram.com/adam_sulemanji'
              target='_blank'
              rel='noopener noreferrer'
              {...analyticsAttributes('social_link_clicked', {
                label: 'instagram',
                section: 'hero',
              })}
            >
              <FaInstagram />
            </a>
            <a
              className='hover:underline hover:underline-offset-4'
              href='mailto:adam.k.sulemanji@gmail.com'
              {...analyticsAttributes('social_link_clicked', {
                label: 'email',
                section: 'hero',
              })}
            >
              <FaEnvelope />
            </a>
            <a
              className='hover:underline hover:underline-offset-4'
              href='https://www.strava.com/athletes/109469044'
              target='_blank'
              rel='noopener noreferrer'
              {...analyticsAttributes('social_link_clicked', {
                label: 'strava',
                section: 'hero',
              })}
            >
              <FaStrava />
            </a>
            <a
              className='hover:underline hover:underline-offset-4'
              href='https://www.goodreads.com/user/show/146321248-adam-sulemanji'
              target='_blank'
              rel='noopener noreferrer'
              {...analyticsAttributes('social_link_clicked', {
                label: 'goodreads',
                section: 'hero',
              })}
            >
              <FaGoodreads />
            </a>
            <a
              className='hover:underline hover:underline-offset-4'
              href='https://letterboxd.com/adamsulemanji'
              target='_blank'
              rel='noopener noreferrer'
              {...analyticsAttributes('social_link_clicked', {
                label: 'letterboxd',
                section: 'hero',
              })}
            >
              <SiLetterboxd />
            </a>
            <a
              href='https://beliapp.co/user/adamsulemanji'
              className='group'
              target='_blank'
              rel='noopener noreferrer'
              {...analyticsAttributes('social_link_clicked', {
                label: 'beli',
                section: 'hero',
              })}
            >
              <p className='relative text-sm hover:underline hover:underline-offset-4'>
                Beli
                <span className='bg-current absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full' />
              </p>
            </a>
            <a
              href='/resume.pdf'
              className='group'
              {...analyticsAttributes('resume_downloaded', {
                label: 'resume',
                section: 'hero',
              })}
            >
              <p className='relative text-sm hover:underline hover:underline-offset-4'>
                Resume
                <span className='bg-current absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full' />
              </p>
            </a>
            <ThemeToggle />
          </div>
        </motion.div>

        <motion.section
          className='mt-10 hidden w-full grid-cols-1 md:mt-32 md:grid md:grid-cols-2'
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

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='About' />
          <div className='mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10'>
            <div className='border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800 overflow-hidden rounded-3xl border p-4 shadow-sm sm:p-6'>
              <div className='relative aspect-[4/5] overflow-hidden rounded-2xl'>
                <Image
                  src='/images/kid.jpg'
                  alt='Picture of little me'
                  fill
                  sizes='(max-width: 1024px) 100vw, 40vw'
                  className='object-cover'
                />
              </div>
              <p className='text-gray-500 dark:text-gray-400 mt-4 text-sm leading-relaxed'>
                This is me a few years ago, around age 7. I look a little older now.
              </p>
            </div>

            <div className='space-y-6'>
              <div className='border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-3xl border p-5 shadow-sm sm:p-6 lg:p-8'>
                <div className='text-gray-700 dark:text-gray-300 space-y-5 text-base leading-relaxed'>
                  <p>
                    I&apos;m a software engineer at Amazon in Seattle, building
                    software that helps connect people to international products.
                  </p>
                  <p>
                    Outside of work, I spend a lot of time outdoors and I&apos;ll
                    play almost any sport. Right now skiing is the main obsession,
                    and I&apos;ve been trying to make the most of being close to the
                    mountains.
                  </p>
                  <p>
                    During the rest of the year, I sign up for impromptu races, keep
                    building side projects, and stay in touch with friends through
                    whatever app, group chat, or hobby is current.
                  </p>
                </div>
              </div>

              <div className='grid gap-4 sm:grid-cols-3'>
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className='border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800 rounded-2xl border p-4 shadow-sm'
                  >
                    <p className='text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.25em]'>
                      {item.label}
                    </p>
                    <p className='text-gray-900 dark:text-gray-100 mt-3 text-sm font-semibold leading-relaxed'>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Picture Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Pictures' />
          <p className='mb-4 mt-2'>A few moments from along the way</p>
          <PictureCarousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Projects' />
          <p className='mb-4 mt-2'>
            Here is a collection of some projects that I have worked on
          </p>
          <Projects />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Updates and Things' />
          <p className='mb-4 mt-2'>
            Here is a collection of some life updates and things
          </p>
          <Updates category='all' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Books' />
          <p className='mb-4 mt-2'>
            Here are a few books I have read recently, in progress or will read
          </p>
          <Books />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title='Movies' />
          <p className='mb-4 mt-2'>
            Here are some of the most recent movies I have watched.
          </p>
          <MovieList />
        </motion.div>
      </div>
    </div>
  );
}
