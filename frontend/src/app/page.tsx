'use client';

import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

import Books from '@/components/Books';
import Updates from '@/components/Update';
import Projects from '@/components/Project';
import Images from '@/components/Images';
import MovieList from '@/components/Movie/MovieList';

export default function Home() {
  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-[1200px]'>
        <div className='m-4 grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 pb-20 sm:p-20'>
          <main className='row-start-2 flex w-full max-w-[1500px] flex-col gap-8 px-4 sm:px-8'>
            <motion.section 
              className='one group relative text-center text-4xl sm:text-5xl md:text-6xl'
              id='section-intro'
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div>
                <div>
                  <div className='text-left font-serif text-4xl font-light leading-tight sm:text-5xl md:mt-12 md:text-7xl'>
                    <motion.span
                      className='block'
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                    >
                      Hi, my
                    </motion.span>
                    <motion.span
                      className='block'
                      initial={{ x: 10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                    >
                      name is <b className='text-5xl sm:text-6xl md:text-8xl'>Adam</b>
                      <span className='accent'>.</span>
                    </motion.span>
                  </div>

                  <span className='absolute -bottom-5 left-0 mt-5 h-2 w-0 bg-green-700 transition-all group-hover:w-2/3 dark:bg-blue-500'></span>
                </div>
              </div>
            </motion.section>

            <motion.section
              className='text-center text-lg'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            ></motion.section>

            <motion.div
              className='line-wrapped mt-3 leading-tight'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className='[&>p]:mt-4'>
                <p>
                  I'm a Software Engineer at{' '}
                  <span className='underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400'>
                    Amazon Web Services
                  </span>{' '}
                  in Seattle, WA building systems to help people label their human data in the SageMaker Ground Truth org. My philosophy
                  in creating and design is to build in order to learn and make
                  the peoples lives around me easier and more fun.
                </p>
                <p>
                  I've previously worked at{' '}
                  <span className='underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400'>
                    Amazon.com
                  </span>
                   {' '}building crossborder software, {' '}
                  <span className='underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400'>
                    Goldman Sachs
                  </span>
                   {' '} determining market risk and{' '}
                  <span className='underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400'>
                    PricewaterhouseCoopers
                  </span>
                    {' '}helping non-profits.
                </p>
              </div>
              <div className='mt-8'>
                <div className='flex flex-wrap justify-start gap-4 pb-10 text-xl sm:gap-8'>
                  <a
                    className='hover:underline hover:underline-offset-4'
                    href='https://github.com/adamsulemanji'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaGithub />
                  </a>
                  <a
                    className='hover:underline hover:underline-offset-4'
                    href='https://www.linkedin.com/in/adamsulemanji/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    className='hover:underline hover:underline-offset-4'
                    href='https://www.instagram.com/adam_sulemanji'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaInstagram />
                  </a>
                  <a
                    className='hover:underline hover:underline-offset-4'
                    href='mailto:adam.k.sulemanji@gmail.com'
                  >
                    <FaEnvelope />
                  </a>
                  <a href='/resume.pdf' className='group'>
                    <p className='relative text-sm hover:underline hover:underline-offset-4'>
                      Resume
                      <span className='absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
                    </p>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.section
              className='mt-32 grid w-full grid-cols-1 md:grid-cols-2'
              initial={{ y: 10, opacity: 0 }}
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
                    transition={{ duration: 3, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </motion.section>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Projects{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mb-4 mt-2'>
                Here is a collection of some projects that I have worked on
              </p>
              <Projects />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Updates and Things{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mt-2'>
                Here is a collection of some life updates and things
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Updates category='all' />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Books{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mb-4 mt-2'>
                Here are a few books I have read recently, in progress or will
                read
              </p>
              <Books />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Images{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mb-4 mt-2'>
                Here are a few images that I want to highlight that define me
              </p>
              <Images />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Movies{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mb-4 mt-2'>
                Here are some of the most recent movies I have watched.
              </p>
              <MovieList />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
