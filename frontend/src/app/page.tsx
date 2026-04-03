'use client';

import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

import Books from '@/components/Books';
import Updates from '@/components/Update';
import Projects from '@/components/Project';
import MovieList from '@/components/Movie/MovieList';
import SectionHeader from '@/components/SectionHeader';
import { analyticsAttributes } from '@/lib/analytics';

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

          <div className='mt-8 flex flex-wrap justify-start gap-4 pb-10 text-xl sm:gap-8'>
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
