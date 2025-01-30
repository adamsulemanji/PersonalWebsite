'use client';

import React from 'react';
import { projects } from '@/assets/projects';
import { projectsInterface } from '@/assets/projects';

interface ProjectProps {
  category?: string;
}


export default function Project({ category = '' }: ProjectProps) {
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
            className='group relative h-80 w-full overflow-hidden rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800'
          >
            <div className='absolute inset-0 flex flex-col transition-transform duration-300 group-hover:-translate-y-2/3'>
              <img
                src={project.pictures?.[0] || ''}
                alt={project.title}
                className='h-2/3 w-full rounded-md object-cover object-center p-4'
              />
              <div className='flex-1 p-4'>
                <h3 className='text-lg font-bold dark:text-white'>
                  {project.title}
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {project.date}
                </p>
              </div>
            </div>

            <div className='bg-gradient-to-t absolute inset-0 flex translate-y-2/3 transform flex-col justify-end from-black via-transparent to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
              <p className='mb-2 text-sm'>{project.description}</p>
              <p className='mb-4 text-xs'>{project.date}</p>
              {project.url && (
                <a
                  href={project.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block w-fit rounded bg-green-700 p-2 text-white dark:bg-blue-500'
                >
                  Visit {project.title}
                </a>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
