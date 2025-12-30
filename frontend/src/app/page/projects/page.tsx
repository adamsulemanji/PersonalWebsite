'use client';

import { motion } from 'framer-motion';

export default function Page() {
  const handlePasswordSubmit = () => {
    const enteredPassword = prompt('Enter password');
    if (enteredPassword === 'nikki') {
      window.open('https://mealtracker.adamsulemanji.com', '_blank');
    } else {
      alert('Incorrect password');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const projectItems = [
    {
      id: 1,
      title: 'This website',
      description: 'From design to implementation, I have built this website from scratch using Next.js and TailwindCSS.',
      details: 'The website is served through AWS using S3 buckets, CloudFront and Route 53. It includes a custom CI/CD pipeline that rebuilds and deploys on GitHub changes. The site is hosted on a custom domain that my uncle bought for me 5 years ago as a joke.',
      image: '/images/systemdiagram.png',
      alt: 'Website',
      link: 'https://www.adamsulemanji.com',
    },
    {
      id: 2,
      title: 'Course Monitoring',
      description: 'During my sophomore year, I was unable to register for ANY classes, so I created a web scraping SMS project to monitor class availability.',
      details: 'Over the years, I have improved it from a simple script to a full web app using a MERN stack, and more recently transformed it into a full CDK application through AWS. It\'s still a work in progress.',
      image: '/images/coursemonitoring.png',
      alt: 'Course Monitoring',
      link: 'https://courses.adamsulemanji.com',
    },
    {
      id: 3,
      title: 'Meal Tracker for Nikki',
      description: 'Nikki used to track her meals on a spreadsheet, which I couldn\'t allow as a developer.',
      details: 'This simple website allows her to track her meals. The site was built completely using my CDK template project.',
      image: '/images/mealtracker.png',
      alt: 'Meal Tracker',
      onClick: handlePasswordSubmit,
    },
    {
      id: 4,
      title: 'CDK Template',
      description: 'During my summer internship, I lacked the fundamental AWS skills to hit the ground running at Amazon.',
      details: 'I created a CDK tool that allows for easy creation of CDK projects. Unlike the basic `cdk init` command that only provides scaffolding, this project gives users a fully functional CodePipeline for CI/CD, a frontend stack, CloudFront distribution for custom domains, and common AWS services with examples.',
      image: '/images/basketball.jpg',
      alt: 'CDK Template',
      link: 'https://github.com/adamsulemanji/test-aws-cdk-app',
    },
  ];

  return (
    <motion.section
      className='relative mx-auto mt-24 w-full max-w-6xl px-4 pb-24 sm:px-8'
      id='section-projects'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-8 shadow-sm backdrop-blur-sm dark:border-gray-800/80 dark:bg-black/40 sm:p-12'
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='pointer-events-none absolute inset-0'>
          <div className='absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl dark:bg-blue-500/20' />
          <div className='absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-400/10' />
          <div className='absolute inset-0 staggered-dots opacity-10' />
        </div>
        <div className='relative'>
          <p className='text-xs uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400'>
            Selected work
          </p>
          <h1 className='mt-4 text-4xl font-serif font-semibold text-gray-900 dark:text-gray-100 md:text-6xl'>
            Projects<span className='accent'>.</span>
          </h1>
          <p className='mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300'>
            Here is a collection of things I have been building recently. Each project is a mix of
            experimentation, problem-solving, and polishing the details.
          </p>
          <div className='mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400'>
            <span className='rounded-full border border-gray-200/70 bg-white/80 px-3 py-1 dark:border-gray-700 dark:bg-black/30'>
              Live builds
            </span>
            <span className='rounded-full border border-gray-200/70 bg-white/80 px-3 py-1 dark:border-gray-700 dark:bg-black/30'>
              Open source
            </span>
            <span className='rounded-full border border-gray-200/70 bg-white/80 px-3 py-1 dark:border-gray-700 dark:bg-black/30'>
              Private demos
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className='mt-16 space-y-16'
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, margin: '-100px' }}
      >
        {projectItems.map((project, index) => {
          const isPrivate = Boolean(project.onClick);
          const isRepo = project.link?.includes('github.com');
          const metaLabel = isPrivate ? 'Private demo' : isRepo ? 'Open source' : 'Live site';
          const ctaLabel = isPrivate ? 'Request access' : isRepo ? 'View repository' : 'Visit site';
          const imageOrder = index % 2 === 0 ? 'lg:order-1' : 'lg:order-2';
          const textOrder = index % 2 === 0 ? 'lg:order-2' : 'lg:order-1';

          const imageCard = (
            <div className='relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/80 p-2 shadow-xl dark:border-gray-800/80 dark:bg-black/40'>
              <img
                src={project.image}
                alt={project.alt}
                className='h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]'
              />
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <div className='pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <span>{metaLabel}</span>
                <span>{`0${index + 1}`}</span>
              </div>
            </div>
          );

          return (
            <motion.article key={project.id} className='relative' variants={item}>
              <div className='grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
                <motion.div
                  className={`relative ${imageOrder}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <div className='absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-400/10 blur-2xl dark:from-blue-500/15 dark:to-amber-400/10' />
                  {isPrivate ? (
                    <button
                      type='button'
                      onClick={project.onClick}
                      aria-label={`Open ${project.title}`}
                      className='group relative block w-full text-left'
                    >
                      {imageCard}
                    </button>
                  ) : (
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Open ${project.title}`}
                      className='group relative block'
                    >
                      {imageCard}
                    </a>
                  )}
                </motion.div>

                <div className={`relative ${textOrder}`}>
                  <div className='flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500'>
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-300'>
                      {`0${index + 1}`}
                    </span>
                    <span className='h-px flex-1 bg-gray-200 dark:bg-gray-700' />
                  </div>
                  <h3 className='mt-4 text-3xl font-semibold text-gray-900 dark:text-gray-100'>
                    {project.title}
                    <span className='accent'>.</span>
                  </h3>
                  <p className='mt-3 leading-relaxed text-gray-600 dark:text-gray-300'>
                    {project.description}
                  </p>
                  <p className='mt-4 border-l-2 border-[color:var(--main)]/60 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
                    {project.details}
                  </p>
                  <div className='mt-6 flex flex-wrap items-center gap-4'>
                    <span className='rounded-full border border-gray-200/70 bg-gray-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-500 dark:border-gray-700 dark:bg-black/30 dark:text-gray-400'>
                      {metaLabel}
                    </span>
                    {isPrivate ? (
                      <button
                        type='button'
                        onClick={project.onClick}
                        className='inline-flex items-center gap-2 rounded-full border border-gray-900/10 bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-800 dark:border-white/20 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/20'
                      >
                        {ctaLabel}
                      </button>
                    ) : (
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 rounded-full border border-gray-900/10 bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-800 dark:border-white/20 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/20'
                      >
                        {ctaLabel}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
