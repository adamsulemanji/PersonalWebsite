'use client';

import React from 'react';
import { projects } from '@/assets/projects';
import { projectsInterface } from '@/assets/projects';
import { FiArrowUpRight } from 'react-icons/fi';

interface ProjectProps {
  category?: string;
}

export default function Project({ category = '' }: ProjectProps) {
  const colorMap: Record<string, string[]> = {
    red: ['bg-red-500', 'bg-red-400'],
    blue: ['bg-blue-500', 'bg-blue-400'],
    green: ['bg-teal-500', 'bg-teal-400'],
    purple: ['bg-violet-500', 'bg-violet-400'],
    orange: ['bg-orange-500', 'bg-orange-400'],
  };

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {projects
        .filter(
          (project: projectsInterface) =>
            !category ||
            (project.categories && project.categories.includes(category))
        )
        .map((project: projectsInterface, index) => (
          <div
            key={index}
            className={`group relative h-80 w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 ${colorMap[project.color ?? 'blue'][0] || 'bg-gray-500'}`}
          >
            <div className='absolute inset-0 flex flex-col transition-transform duration-300 group-hover:-translate-y-2/3'>
              <img
                src={project.pictures?.[0] || ''}
                alt={project.title}
                className='h-2/3 w-full object-cover object-center p-4 rounded-3xl'
              />
              <div className='flex-1 p-4'>
                <h3 className='text-lg font-bold text-white'>
                  {project.title}
                </h3>
                <div className='mt-2 flex flex-wrap gap-1'>
                  {project.categories?.map((category, index) => (
                    <span
                      key={index}
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold text-white ${colorMap[project.color ?? 'blue'][1] || 'bg-gray-500'} border-width-1 border border-white`}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-t absolute inset-0 flex translate-y-2/3 transform flex-col mt-4 justify-center from-black via-transparent to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
              <p className='mb-1 text-sm text-white'>{project.description}</p>
              <p className='mb-2 text-xs text-white'>{project.date}</p>
              {project.url && (
                <a
                  href={project.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex w-fit items-center rounded p-2 text-white hover:underline hover:underline-offset-1'
                >
                  Visit {project.title} <FiArrowUpRight className='ml-1' />
                </a>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
