import Image from 'next/image';

import Books from '@/components/Books';
import Updates from '@/components/Updates';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Writing from '@/components/Writing';
import MovieList from '@/components/MovieList';
import Section from '@/components/Section';
import SocialLinks from '@/components/SocialLinks';
import PictureCarousel from '@/components/PictureCarousel';
import ScrollThread from '@/components/ScrollThread';
import FreshnessLabel from '@/components/FreshnessLabel';
import { FadeIn, HeroTitle } from '@/components/Hero';
import { metaLabel, underlineLink } from '@/lib/styles';

const CONTENT_ID = 'page-content';

const highlights = [
  { label: 'Based in', value: 'Seattle, WA' },
  { label: 'Current role', value: 'Software Engineer at Amazon' },
  { label: 'Outside of work', value: 'Skiing, sports, and being outdoors' },
];

const companyLink = `text-gray-900 dark:text-white ${underlineLink}`;
const bodyCopy =
  'max-w-2xl space-y-4 text-[15px] leading-7 text-gray-600 dark:text-gray-300 sm:text-base';

/** Server component: `HeroTitle`, `FadeIn` and `Section` are the only client islands. */
export default function HomePage() {
  return (
    <div className='relative w-full px-6 pb-32 pt-16 sm:px-12 sm:pt-24 md:px-20'>
      <ScrollThread containerId={CONTENT_ID} />
      <div
        id={CONTENT_ID}
        className='relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-24'
      >
        <HeroTitle />

        {/* Intro text + links */}
        <FadeIn delay={1}>
          <div className={bodyCopy}>
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
        </FadeIn>

        {/* Now */}
        <Section title='Now' id='section-now'>
          <div className={bodyCopy}>
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
            <FreshnessLabel date='2026-04-01'>
              Updated April 2026
            </FreshnessLabel>
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
              <div className={bodyCopy}>
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

              <dl className='space-y-3'>
                {highlights.map((item) => (
                  <div key={item.label} className='flex gap-4'>
                    <dt className={`w-28 shrink-0 pt-0.5 ${metaLabel}`}>
                      {item.label}
                    </dt>
                    <dd className='text-sm text-gray-700 dark:text-gray-300'>
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
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
