'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Page() {
  const [hovered, setHovered] = useState<number | null>(null);

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
    hidden: { opacity: 0, y: 20 },
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
      className='mt-24 w-full max-w-[1500px] px-4 sm:px-8' 
      id='section-projects'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className='mt-10' variants={item}>
          <div className='relative'>
            <motion.div 
              className='absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl'
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <p className='mb-5 text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Projects
              <span className='accent font-serif text-6xl text-blue-600'>.</span>
            </p>
          </div>
          <p className='leading-relaxed text-gray-600 dark:text-gray-300'>
            Here is a collection of things I have been working on and/or built
            recently. Each project showcases different technologies and problem-solving approaches.
          </p>
          <motion.div 
            className='mt-6 flex space-x-4'
            variants={item}
          >
            <div className='flex items-center space-x-2 text-sm text-gray-500'>
              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              <span>Recently updated</span>
            </div>
            <div className='flex items-center space-x-2 text-sm text-gray-500'>
              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
              <span>Open source</span>
            </div>
          </motion.div>
        </motion.div>
        <motion.div variants={item}>
          <div className='relative h-[150px] w-full rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_50%)]'></div>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.1),transparent_50%)]'></div>
            <div className='staggered-dots h-full w-full bg-[length:10px_10px] opacity-30'></div>
          </div>
        </motion.div>
      </motion.div>

      {projectItems.map((project, index) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className={`${index > 0 ? 'mt-16' : 'mt-10'}`}
        >
          <motion.hr 
            className={`${index > 0 ? 'mb-10 border-t border-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600' : 'hidden'}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2 items-center'>
            <div className='flex items-center justify-center relative'>
              <motion.div 
                className='absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm'
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              {project.onClick ? (
                <div 
                  onClick={project.onClick}
                  className='relative overflow-hidden rounded-lg cursor-pointer group'
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.img
                    src={project.image}
                    alt={project.alt}
                    className='w-full rounded-lg shadow-xl transition-all duration-500'
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      borderWidth: hovered === project.id ? 4 : 0,
                      borderColor: hovered === project.id ? 'var(--main)' : 'transparent',
                      boxShadow: hovered === project.id ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <motion.div 
                    className='absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition-all duration-300'
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                  >
                    <motion.span 
                      className='text-white opacity-0 transform translate-y-4 font-medium text-lg'
                      whileHover={{ opacity: 1, translateY: 0 }}
                    >
                      Password required
                    </motion.span>
                  </motion.div>
                </div>
              ) : (
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='relative overflow-hidden rounded-lg cursor-pointer group'
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.img
                    src={project.image}
                    alt={project.alt}
                    className='w-full rounded-lg shadow-xl transition-all duration-500'
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      borderWidth: hovered === project.id ? 4 : 0,
                      borderColor: hovered === project.id ? 'var(--main)' : 'transparent',
                      boxShadow: hovered === project.id ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <motion.div 
                    className='absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition-all duration-300'
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                  >
                    <motion.span 
                      className='text-white opacity-0 transform translate-y-4 font-medium text-lg'
                      whileHover={{ opacity: 1, translateY: 0 }}
                    >
                      Visit project
                    </motion.span>
                  </motion.div>
                </a>
              )}
            </div>
            <motion.div 
              className='leading-relaxed relative'
              whileInView={{ 
                opacity: [0, 1],
                x: [10, 0] 
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className='relative'>
                <motion.div 
                  className='absolute -top-1 -left-1 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 blur-md'
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <h3 className='mb-5 text-3xl font-bold group flex items-center'>
                  <span className='bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent'>
                    {project.title}
                  </span>
                  <span className='accent font-serif text-4xl text-blue-600'>.</span>
                  <motion.span 
                    className='ml-2 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-600 block mt-1 rounded-full'
                    whileInView={{ width: '3rem' }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </h3>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-700 dark:text-gray-200 leading-relaxed'>{project.description}</p>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed border-l-2 border-blue-500 pl-4'>{project.details}</p>
                <motion.div 
                  className='flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 mt-4'
                  whileInView={{ opacity: [0, 1], y: [10, 0] }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
                  <span>Click to explore</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
