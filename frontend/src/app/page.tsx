'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Home() {
  const [introShown, setIntroShown] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [hiVisible, setHiVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [constructionVisible, setConstructionVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [scrollPromptVisible, setScrollPromptVisible] = useState(false);

  const handlePasswordSubmit = () => {
    const enteredPassword = prompt('Enter password');
    if (enteredPassword === 'nikki') {
      window.open('https://mealtracker.adamsulemanji.com', '_blank');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    if (!introShown) {
      const animations = [
        { setter: setIntroVisible, delay: 100 },
        { setter: setHiVisible, delay: 600 },
        { setter: setNameVisible, delay: 1200 },
        { setter: setConstructionVisible, delay: 1500 },
        { setter: setDescriptionVisible, delay: 1800 },
        { setter: setScrollPromptVisible, delay: 2200 },
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
                      className={`block transform transition-all duration-1000 ease-out ${
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
                  Im a Software Engineer at{' '}
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
                    className={`duration-[3s] transition-transform ease-out dark:stroke-white ${
                      scrollPromptVisible ? 'grow-line' : ''
                    }`}
                  />
                </svg>
              </div>
              <div className='mt-8 md:mt-0'></div>
            </section>

            <section
              className='mt-24 w-full max-w-[1500px]'
              id='section-projects'
            >
              <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
                <div className='mt-10'>
                  <p className='mb-5 text-5xl font-bold'>
                    Projects
                    <span className='accent font-serif text-6xl'>.</span>
                  </p>
                  <p className='leading-relaxed'>
                    Here are a collection of things I have been working on
                    and/or built recently.
                  </p>
                </div>
                <div>
                  <div className='staggered-dots h-[150px] w-full rounded-lg bg-[length:10px_10px]'></div>
                </div>

                <div className='flex items-center justify-center'>
                  <a
                    href='https://www.adamsulemanji.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      src='/images/systemdiagram.png'
                      alt='Website'
                      className='w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-green-700 hover:shadow-2xl hover:dark:border-blue-400'
                    />
                  </a>
                </div>
                <div className='leading-relaxed'>
                  <h3 className='mb-5 text-3xl font-bold'>
                    This website
                    <span className='accent font-serif text-4xl'>.</span>
                  </h3>
                  <p>
                    Interesting enough this website serves as a project itself.
                    From the design to implementation, I have built this website
                    from scratch. I have used Next.js as the framework and
                    TailwindCSS as the styling library.
                  </p>
                  <p className='mt-4'>
                    The website is completely served through AWS using S3
                    buckets, cloudfront and route 53. The website also contains
                    a custom CI/CD pipeline that allows me to rebuild and deploy
                    and cloud or bucket changes on events of github changes. The
                    website is also served through a custom domain that I own
                    that my uncle bought for me 5 years ago as a joke.
                  </p>
                </div>
              </div>
              <hr className='my-10 border-t border-gray-300' />
              <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
                <div className='flex items-center justify-center'>
                  <a
                    href='https://courses.adamsulemanji.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      src='/images/coursemonitoring.png'
                      alt='Course Monitoring'
                      className='w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-green-700 hover:shadow-2xl hover:dark:border-blue-400'
                    />
                  </a>
                </div>
                <div className='leading-relaxed'>
                  <h3 className='mb-5 text-3xl font-bold'>
                    Course Monitoring
                    <span className='accent font-serif text-4xl'>.</span>
                  </h3>
                  <p>
                    During my sophomore year, I tried to register for classes
                    but was unable to get into ANY classes. I started a simple
                    web scraping SMS project to monitor the classes I wanted to
                    get into.
                  </p>
                  <p className='mt-4'>
                    Over the years, I have slowly improved into first turning it
                    into a web app using a MERN stack then more recently
                    transforming it into a full CDK application through AWS.
                    It's still a WIP.
                  </p>
                </div>
              </div>
              <hr className='my-10 border-t border-gray-300' />
              <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
                <div className='flex items-center justify-center'>
                  <a onClick={handlePasswordSubmit}>
                    <img
                      src='/images/mealtracker.png'
                      alt='Meal Tracker'
                      className='w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-green-700 hover:shadow-2xl hover:dark:border-blue-400'
                    />
                  </a>
                </div>
                <div className='leading-relaxed'>
                  <h3 className='mb-5 text-3xl font-bold'>
                    Meal Tracker for Nikki
                    <span className='accent font-serif text-4xl'>.</span>
                  </h3>
                  <p>
                    Nikki used to track her meals on a spreadsheet, I could not
                    allow that as a developer
                  </p>
                  <p className='mt-4'>
                    This simple website allows her to track her meals. The site
                    was built completely from my CDK template project I created.{' '}
                  </p>
                </div>
              </div>
              <hr className='my-10 border-t border-gray-300' />
              <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
                <div className='items-center justify-center'>
                  <a
                    href='https://github.com/adamsulemanji/test-aws-cdk-app'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      src='/images/basketball.jpg'
                      alt='CDK Template'
                      className='w-full rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:border-4 hover:border-green-700 hover:shadow-2xl hover:dark:border-blue-400'
                    />
                  </a>

                  <p className='mt-4 text-center text-xs italic'>
                    **I don't have a picture of the CDK because it's a CLI, so
                    here is a picture of my IM basketball team**
                  </p>
                </div>
                <div className='leading-relaxed'>
                  <h3 className='mb-5 text-3xl font-bold'>
                    CDK Template
                    <span className='accent font-serif text-4xl'>.</span>
                  </h3>
                  <p>
                    During my summer internship I lacked the fundamental AWS
                    skills and knowledge to hit the ground running at Amazon.
                  </p>
                  <p className='mt-4'>
                    With that I realized that there exists a lack of a CDK tool
                    that allows for easy creation of CDK projects. The regular{' '}
                    <code className='inline bg-slate-100 px-2 font-mono dark:bg-white dark:text-black'>
                      {' '}
                      cdk init
                    </code>{' '}
                    command only provides the scaffolding. The premise of this
                    project allows for users to get a fully functional
                    CodePipeline for CI/CD, a frontend stack, a cloudfront
                    distribution for custom domains, a few of the most common
                    aws services fully integrated with examples and a few other
                    things.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
