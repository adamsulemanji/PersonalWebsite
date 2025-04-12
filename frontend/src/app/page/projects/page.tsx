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
          <p className='mb-5 text-5xl font-bold'>
            Projects
            <span className='accent font-serif text-6xl'>.</span>
          </p>
          <p className='leading-relaxed'>
            Here is a collection of things I have been working on and/or built
            recently.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <div className='staggered-dots h-[150px] w-full rounded-lg bg-[length:10px_10px]'></div>
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
          <hr className={`${index > 0 ? 'mb-10 border-t border-gray-300' : 'hidden'}`} />
          <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
            <div className='flex items-center justify-center'>
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
              className='leading-relaxed'
              whileInView={{ 
                opacity: [0, 1],
                x: [10, 0] 
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className='mb-5 text-3xl font-bold group flex items-center'>
                {project.title}
                <span className='accent font-serif text-4xl'>.</span>
                <motion.span 
                  className='ml-2 h-1 w-0 bg-current block mt-1'
                  whileInView={{ width: '3rem' }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </h3>
              <p>{project.description}</p>
              <p className='mt-4'>{project.details}</p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
