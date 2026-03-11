'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { analyticsAttributes } from '@/lib/analytics';

const accentPillColors = {
  emerald: '#2dd4bf',
  amber: '#facc15',
  sky: '#38bdf8',
  orange: '#fb923c',
} as const;

type AccentName = keyof typeof accentPillColors;

type ProjectItem = {
  id: number;
  title: string;
  description: string;
  details: string;
  image: string;
  alt: string;
  link?: string;
  onClick?: () => void;
  accent: AccentName;
  tags: string[];
};

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

  const projectItems: ProjectItem[] = [
    {
      id: 1,
      title: 'This website',
      description:
        'From design to implementation, I have built this website from scratch using Next.js and TailwindCSS.',
      details:
        'The website is served through AWS using S3 buckets, CloudFront and Route 53. It includes a custom CI/CD pipeline that rebuilds and deploys on GitHub changes. The site is hosted on a custom domain that my uncle bought for me 5 years ago as a joke.',
      image: '/images/systemdiagram.png',
      alt: 'Website',
      link: 'https://www.adamsulemanji.com',
      accent: 'orange',
      tags: ['next.js', 'tailwindcss', 'aws'],
    },
    {
      id: 2,
      title: 'Course Monitoring',
      description:
        'During my sophomore year, I was unable to register for ANY classes, so I created a web scraping SMS project to monitor class availability.',
      details:
        "Over the years, I have improved it from a simple script to a full web app using a MERN stack, and more recently transformed it into a full CDK application through AWS. It's still a work in progress.",
      image: '/images/coursemonitoring.png',
      alt: 'Course Monitoring',
      link: 'https://courses.adamsulemanji.com',
      accent: 'emerald',
      tags: ['aws', 'monitoring', 'sms'],
    },
    {
      id: 3,
      title: 'Meal Tracker for Nikki',
      description:
        "Nikki used to track her meals on a spreadsheet, which I couldn't allow as a developer.",
      details:
        'This simple website allows her to track her meals. The site was built completely using my CDK template project.',
      image: '/images/mealtracker.png',
      alt: 'Meal Tracker',
      onClick: handlePasswordSubmit,
      accent: 'sky',
      tags: ['crud', 'fastapi', 'docker'],
    },
    {
      id: 4,
      title: 'CDK Template',
      description:
        'During my summer internship, I lacked the fundamental AWS skills to hit the ground running at Amazon.',
      details:
        'I created a CDK tool that allows for easy creation of CDK projects. Unlike the basic `cdk init` command that only provides scaffolding, this project gives users a fully functional CodePipeline for CI/CD, a frontend stack, CloudFront distribution for custom domains, and common AWS services with examples.',
      image: '/images/basketball.jpg',
      alt: 'CDK Template',
      link: 'https://github.com/adamsulemanji/test-aws-cdk-app',
      accent: 'amber',
      tags: ['aws', 'cdk', 'ci/cd'],
    },
  ];

  return (
    <motion.section
      className='mx-auto w-full max-w-[1200px] px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16'
      id='section-projects'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='max-w-3xl'
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className='underline-offset-3 decoration-gray-300 group relative inline-block text-xl font-bold underline'>
          Projects
          <span className='bg-current absolute bottom-0 left-0 mt-1 block h-[2px] w-0 transition-all duration-300 group-hover:w-full'></span>
        </p>
        <h1 className='mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl'>
          A few things I&apos;ve built
          <span className='accent'>.</span>
        </h1>
        <p className='text-gray-600 dark:text-gray-300 mt-4 max-w-2xl text-[15px] leading-7 sm:text-base'>
          Here is a collection of projects I have spent time building. They
          range from personal tools to production deployments, but the through
          line is the same: build something useful, learn from it, and keep
          refining it.
        </p>
        <div className='mt-6 flex flex-wrap gap-3'>
          {['featured work', 'clean systems', 'small accents'].map((label) => (
            <span
              key={label}
              className='border-[color:var(--main)]/30 bg-[color:var(--main)]/10 rounded-full border px-3 py-1 text-xs font-semibold text-[color:var(--main)]'
            >
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className='mt-10 space-y-8 sm:mt-14 sm:space-y-10'
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, margin: '-100px' }}
      >
        {projectItems.map((project, index) => {
          const isPrivate = Boolean(project.onClick);
          const isRepo = project.link?.includes('github.com');
          const metaLabel = isPrivate
            ? 'Private demo'
            : isRepo
              ? 'Open source'
              : 'Live site';
          const ctaLabel = isPrivate
            ? 'Request access'
            : isRepo
              ? 'View repository'
              : 'Visit site';
          const imageOrder = index % 2 === 0 ? 'lg:order-1' : 'lg:order-2';
          const textOrder = index % 2 === 0 ? 'lg:order-2' : 'lg:order-1';
          const pillColor = accentPillColors[project.accent];

          const imageCard = (
            <div className='border-gray-200 bg-white dark:border-white/15 dark:bg-neutral-900 relative overflow-hidden rounded-2xl border p-3 shadow-sm'>
              <div className='relative aspect-[4/3] overflow-hidden rounded-xl'>
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes='(max-width: 1024px) 100vw, 55vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                />
                <div className='bg-gradient-to-t from-black/35 via-black/0 to-transparent pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <div className='border-gray-200 dark:border-white/15 absolute inset-0 rounded-xl border' />
              </div>
              <div className='mt-3 flex items-center justify-between gap-3'>
                <span
                  className='border-white/20 text-white rounded-full border px-3 py-1 text-xs font-semibold'
                  style={{ backgroundColor: pillColor }}
                >
                  {metaLabel}
                </span>
                <span className='text-gray-500 dark:text-white/45 text-[11px]'>
                  {`0${index + 1}`}
                </span>
              </div>
            </div>
          );

          return (
            <motion.article
              key={project.id}
              className='border-gray-200 bg-white dark:border-white/15 dark:bg-neutral-900 rounded-3xl border p-4 shadow-sm sm:p-6 lg:p-8'
              variants={item}
            >
              <div className='grid items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10'>
                <motion.div
                  className={`relative ${imageOrder}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  {isPrivate ? (
                    <button
                      type='button'
                      onClick={project.onClick}
                      aria-label={`Open ${project.title}`}
                      className='group relative block w-full text-left'
                      {...analyticsAttributes('project_clicked', {
                        category: 'featured-projects',
                        label: project.title,
                      })}
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
                      {...analyticsAttributes('project_clicked', {
                        category: 'featured-projects',
                        label: project.title,
                      })}
                    >
                      {imageCard}
                    </a>
                  )}
                </motion.div>

                <div className={`relative ${textOrder}`}>
                  <div className='text-gray-400 dark:text-white/35 flex items-center gap-3 text-xs'>
                    <span className='text-gray-600 dark:text-white/70 text-sm font-semibold'>
                      {`0${index + 1}`}
                    </span>
                    <span className='bg-gray-200 dark:bg-white/10 h-px flex-1' />
                  </div>
                  <h3 className='text-gray-900 dark:text-white mt-4 text-2xl font-bold sm:text-3xl'>
                    {project.title}
                    <span className='accent'>.</span>
                  </h3>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className='border-white/20 text-white rounded-full border px-3 py-1 text-xs font-semibold'
                        style={{ backgroundColor: pillColor }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className='text-gray-700 dark:text-white/78 mt-4 text-[15px] leading-7 sm:text-base'>
                    {project.description}
                  </p>
                  <p className='border-[color:var(--main)]/60 text-gray-600 dark:text-white/62 mt-4 border-l-2 pl-4 text-[15px] leading-7 sm:text-sm'>
                    {project.details}
                  </p>
                  <div className='mt-6 flex flex-wrap items-center gap-4'>
                    <span className='border-gray-200 text-gray-500 dark:border-white/15 dark:text-white/65 rounded-full border px-3 py-1 text-xs font-semibold'>
                      {metaLabel}
                    </span>
                    {isPrivate ? (
                      <button
                        type='button'
                        onClick={project.onClick}
                        className='border-gray-900/10 bg-gray-900 text-white hover:bg-gray-800 dark:border-white/20 dark:bg-white/8 dark:text-white dark:hover:bg-white/14 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5'
                        {...analyticsAttributes('project_clicked', {
                          category: 'featured-projects',
                          label: `${project.title}-cta`,
                        })}
                      >
                        {ctaLabel}
                      </button>
                    ) : (
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='border-gray-900/10 bg-gray-900 text-white hover:bg-gray-800 dark:border-white/20 dark:bg-white/8 dark:text-white dark:hover:bg-white/14 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5'
                        {...analyticsAttributes('project_clicked', {
                          category: 'featured-projects',
                          label: `${project.title}-cta`,
                        })}
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
