'use client';

import React from 'react';
import { projects, colorMap } from '@/assets/projects';
import { projectsInterface } from '@/assets/projects';
import { FiArrowUpRight } from 'react-icons/fi';
import Image from 'next/image';
import { analyticsAttributes } from '@/lib/analytics';

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
            className='border-gray-200 dark:border-gray-700 group relative h-80 w-full transform overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
            style={{
              backgroundColor:
                colorMap[project.color ?? 'blue'][0] || '#6b7280',
            }}
          >
            <div className='bg-gradient-to-t from-black/20 to-transparent absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            <div className='absolute inset-0 flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-2/3'>
              <div className='relative h-2/3 w-full p-4'>
                <Image
                  src={project.pictures?.[0] || ''}
                  alt={project.title}
                  className='h-full w-full rounded-2xl object-cover object-center shadow-md transition-shadow duration-300 group-hover:shadow-xl'
                  width={500}
                  height={500}
                />
                <div className='bg-gradient-to-t from-black/10 to-transparent absolute inset-4 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </div>
              <div className='flex-1 p-4'>
                <h3 className='text-white group-hover:text-white/90 text-lg font-bold drop-shadow-sm transition-colors duration-300'>
                  {project.title}
                </h3>
                <div className='mt-3 flex flex-wrap gap-1.5'>
                  {project.categories?.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className='text-white border-white/30 hover:border-white/60 inline-block rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105'
                      style={{
                        backgroundColor:
                          colorMap[project.color ?? 'blue'][1] || '#6b7280',
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-t from-black/90 via-black/50 to-transparent absolute inset-0 mt-4 flex translate-y-2/3 transform flex-col justify-center p-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100'>
              <div className='space-y-3'>
                <p className='text-white/90 text-sm leading-relaxed'>
                  {project.description}
                </p>
                <p className='text-white/70 flex items-center text-xs'>
                  <span className='bg-white/50 mr-2 h-2 w-2 rounded-full'></span>
                  {project.date}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-white/20 text-white hover:bg-white/30 border-white/30 inline-flex w-fit items-center rounded-lg border px-3 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105'
                    {...analyticsAttributes('project_clicked', {
                      category: 'home-grid',
                      label: project.title,
                    })}
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
