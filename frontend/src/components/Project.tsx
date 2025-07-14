'use client';

import React from 'react';
import { projects, colorMap } from '@/assets/projects';
import { projectsInterface } from '@/assets/projects';
import { FiArrowUpRight } from 'react-icons/fi';
import Image from 'next/image';

interface ProjectProps {
  category?: string;
}

export default function Project({ category = '' }: ProjectProps) {
  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {projects
        .filter(
          (project: projectsInterface) =>
            !category ||
            (project.categories && project.categories.includes(category))
        )
        .map((project: projectsInterface, index) => (
          <div
            key={index}
            className="group relative h-80 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ backgroundColor: colorMap[project.color ?? 'blue'][0] || '#6b7280' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className='absolute inset-0 flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-2/3'>
              <div className='relative h-2/3 w-full p-4'>
                <Image
                  src={project.pictures?.[0] || ''}
                  alt={project.title}
                  className='h-full w-full rounded-2xl object-cover object-center shadow-md group-hover:shadow-xl transition-shadow duration-300'
                  width={500}
                  height={500}
                />
                <div className='absolute inset-4 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
              <div className='flex-1 p-4'>
                <h3 className='text-lg font-bold text-white drop-shadow-sm group-hover:text-white/90 transition-colors duration-300'>
                  {project.title}
                </h3>
                <div className='mt-3 flex flex-wrap gap-1.5'>
                  {project.categories?.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/60"
                      style={{ backgroundColor: colorMap[project.color ?? 'blue'][1] || '#6b7280' }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-t absolute inset-0 mt-4 flex translate-y-2/3 transform flex-col justify-center from-black/90 via-black/50 to-transparent p-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100'>
              <div className='space-y-3'>
                <p className='text-sm text-white/90 leading-relaxed'>{project.description}</p>
                <p className='text-xs text-white/70 flex items-center'>
                  <span className='w-2 h-2 bg-white/50 rounded-full mr-2'></span>
                  {project.date}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex w-fit items-center rounded-lg bg-white/20 backdrop-blur-sm px-3 py-2 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30'
                  >
                    Visit {project.title} <FiArrowUpRight className='ml-1' />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
