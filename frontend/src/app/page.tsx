'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Books from '@/components/Books';
import Updates from '@/components/Updates';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Writing from '@/components/Writing';
import MovieList from '@/components/Movie/MovieList';
import Section from '@/components/Section';
import SocialLinks from '@/components/SocialLinks';
import PictureCarousel from '@/components/PictureCarousel';
import ScrollThread from '@/components/ScrollThread';
import { metaLabel, underlineLink } from '@/lib/styles';

const highlights = [
  { label: 'Based in', value: 'Seattle, WA' },
  { label: 'Current role', value: 'Software Engineer at Amazon' },
  { label: 'Outside of work', value: 'Skiing, sports, and being outdoors' },
];

const companyLink = `text-gray-900 dark:text-white ${underlineLink}`;

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative w-full px-6 pb-32 pt-16 sm:px-12 sm:pt-24 md:px-20'>
      <ScrollThread contentRef={contentRef} />
      <div
        ref={contentRef}
        className='relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-24'
      >
        {/* Hero */}
        <motion.section
          className='group relative'
          id='section-intro'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className='text-left font-serif text-4xl font-light leading-[1.05] sm:text-6xl md:mt-8 md:text-7xl'>
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
          </div>
          <span className='accent-bar absolute -bottom-5 left-0 mt-5 h-2 w-0 transition-all group-hover:w-2/3' />
        </motion.section>

        {/* Intro text + links */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className='max-w-2xl space-y-4 text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:text-base'>
            <p>
              I&apos;m a Software Engineer at{' '}
              <a
                href='https://www.amazon.com'
                target='_blank'
                rel='noopener noreferrer'
                className={companyLink}
              >
                Amazon
              </a>{' '}
              in Seattle, WA building systems to aid the payments processing
              flow. Before this, I was working in Amazon Web Services on Model
              Customization with AI Agents, Human in the Loop and Mechanical
              Turk. My philosophy is to build in order to learn and make the
              lives of people around me easier.
            </p>
            <p>
              I&apos;ve previously worked at{' '}
              <a
                href='https://www.amazon.com'
                target='_blank'
                rel='noopener noreferrer'
                className={companyLink}
              >
                Amazon.com
              </a>{' '}
              building crossborder software,{' '}
              <a
                href='https://www.goldmansachs.com'
                target='_blank'
                rel='noopener noreferrer'
                className={companyLink}
              >
                Goldman Sachs
              </a>{' '}
              determining market risk, and{' '}
              <a
                href='https://www.pwc.com'
                target='_blank'
                rel='noopener noreferrer'
                className={companyLink}
              >
                PricewaterhouseCoopers
              </a>{' '}
              helping non-profits.
            </p>
          </div>

          <SocialLinks />
        </motion.div>

        {/* Now */}
        <Section title='Now' id='section-now'>
          <div className='max-w-2xl space-y-4 text-[15px] leading-7 text-gray-600 dark:text-gray-300'>
            <p>
              Ramping up on a new team in Global Payments at Amazon — learning
              about the payments ecosystem and enjoying the fresh context.
              Outside of work, I&apos;m stretching the tail end of ski season
              and training for a marathon.
            </p>
            <p>
              Side-project-wise, I&apos;m iterating on this site, cleaning up
              the CDK pipeline behind it, and slowly chipping away at a writing
              habit (see below).
            </p>
            <p className={metaLabel}>Updated April 2026</p>
          </div>
        </Section>

        {/* About */}
        <Section title='About'>
          <div className='grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12'>
            <div>
              <div className='relative aspect-[4/5] overflow-hidden rounded-2xl'>
                <Image
                  src='/images/kid.webp'
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
          <Updates />
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
