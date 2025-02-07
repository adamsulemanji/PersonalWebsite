'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

import Books from '@/components/Books';
import Updates from '@/components/Update';
import Projects from '@/components/Project';
import Images from '@/components/Images';
import AlbumList from '@/components/Movie/MovieList';

export default function Home() {
  const [introShown, setIntroShown] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [hiVisible, setHiVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [constructionVisible, setConstructionVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [scrollPromptVisible, setScrollPromptVisible] = useState(false);

  useEffect(() => {
    if (!introShown) {
      const animations = [
        { setter: setIntroVisible, delay: 100 },
        { setter: setHiVisible, delay: 400 },
        { setter: setNameVisible, delay: 600 },
        { setter: setConstructionVisible, delay: 800 },
        { setter: setDescriptionVisible, delay: 1200 },
        { setter: setScrollPromptVisible, delay: 1500 },
      ];

      animations.forEach(({ setter, delay }) => {
        const timer = setTimeout(() => {
          setter(true);
        }, delay);
        return () => clearTimeout(timer);
      });

      setIntroShown(true);
    }
  }, [introShown]);

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-[1200px]'>
        <div className='m-4 grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 pb-20 sm:p-20'>
          <main className='row-start-2 flex w-full max-w-[1500px] flex-col gap-8 px-4 sm:px-8'>
            <section
              className={`one group relative transform text-center text-6xl transition-all duration-1000 ease-out ${
                introVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-full opacity-0'
              }`}
              id='section-intro'
            >
              <div>
                <div>
                  <div className='text-left font-serif text-7xl font-light leading-tight md:mt-12'>
                    <span
                      className={`block transform transition-all duration-1000 ease-out ${
                        hiVisible ? 'translate-x-0' : '-translate-x-10'
                      }`}
                    >
                      Hi, my
                    </span>
                    <span
                      className={`duration-3000 block transform transition-all ease-out ${
                        nameVisible ? 'translate-x-0' : 'translate-x-10'
                      }`}
                    >
                      name is <b className='text-8xl'>Adam</b>
                      <span className='accent'>.</span>
                    </span>
                  </div>

                  <span className='absolute -bottom-5 left-0 mt-5 h-2 w-0 bg-green-700 transition-all group-hover:w-2/3 dark:bg-blue-500'></span>
                </div>
              </div>
            </section>

            <section
              className={`text-center text-lg transition-all duration-1000 ${
                constructionVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            ></section>

            <div
              className={`line-wrapped mt-3 leading-tight duration-1000 ${
                descriptionVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className='[&>p]:mt-4'>
                <p>
                  I'm a Software Engineer at{' '}
                  <span className='underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400'>
                    Amazon
                  </span>{' '}
                  in Seattle building systems to help connect customers to
                  international products from all over the world. My philosophy
                  in creating and design is to build in order to learn and make
                  the peoples lives around me easier and more fun.
                </p>
                <p>
                  I've previously worked at{' '}
                  <span className='underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400'>
                    Amazon
                  </span>
                  , building crossborder software,{' '}
                  <span className='underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400'>
                    Goldman Sachs
                  </span>
                  , determining market risk and{' '}
                  <span className='underline underline-offset-4 hover:decoration-green-700 hover:dark:decoration-blue-400'>
                    PricewaterhouseCooper
                  </span>
                  , helping non-profits.
                </p>
              </div>
              <div className='mt-8'>
                <div className='flex justify-start space-x-8 pb-10 text-xl'>
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
            </div>

            <section
              className={`mt-32 grid w-full grid-cols-1 transition-all duration-1000 md:grid-cols-2 ${
                scrollPromptVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className='flex flex-col items-center gap-4'>
                <p className='text-m mb-2 animate-bounce tracking-widest'>
                  Scroll !
                </p>
                <svg height='750' width='1' className='hidden md:block'>
                  <line
                    x1='1'
                    y1='0'
                    x2='1'
                    y2='5000'
                    stroke='black'
                    strokeWidth='1'
                    className={`duration-&lsqb;3s&rsqb transition-transform ease-out dark:stroke-white ${
                      scrollPromptVisible ? 'grow-line' : ''
                    }`}
                  />
                </svg>
              </div>
            </section>
            <div>
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Projects{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mb-4 mt-2'>
                Here is a collection of some projects that I have worked on
              </p>
              <Projects />
            </div>
            <div>
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Updates and Things{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mt-2'>
                Here is a collection of some life updates and things
              </p>
            </div>
            <div>
              <Updates category='all' />
            </div>
            <div>
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Books{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mb-4 mt-2'>
                Here are a few books I have read recently, in progress or will
                read
              </p>
              <Books />
            </div>
            <div>
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Images{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mb-4 mt-2'>
                Here are a few images that I want to highlight that define me
              </p>
              <Images />
            </div>
            <div>
              <p className='underline-offset-3 group relative mt-2 inline-block text-xl font-bold underline decoration-gray-300'>
                Movies{' '}
                <span className='absolute bottom-0 left-0 mt-1 block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full'></span>
              </p>
              <p className='mb-4 mt-2'>
                Here are a few movies that I have seen and liked recently
              </p>
              <AlbumList />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
