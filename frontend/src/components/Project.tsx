'use client';

import { Fragment } from 'react';
import { projects, colorMap, projectsInterface } from '@/assets/projects';
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
        .map((project: projectsInterface, index) => {
          const badgeColor = colorMap[project.color ?? 'blue'][1] || '#6b7280';

          return (
            <Fragment key={index}>
              <div className='overflow-hidden rounded-xl border border-gray-200 shadow-md dark:border-gray-700 lg:hidden'>
                <div className='relative aspect-[16/10] w-full'>
                  <Image
                    src={project.pictures?.[0] || ''}
                    alt={project.title}
                    className='object-cover'
                    fill
                    sizes='100vw'
                  />
                </div>
                <div className='space-y-4 bg-gray-100 p-4 text-gray-900 dark:bg-gray-800 dark:text-white'>
                  <div>
                    <h3 className='text-lg font-bold'>{project.title}</h3>
                    <div className='mt-3 flex flex-wrap gap-1.5'>
                      {project.categories?.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className='inline-block rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-white dark:border-white/20'
                          style={{ backgroundColor: badgeColor }}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className='text-sm leading-relaxed text-gray-700 dark:text-white/90'>
                    {project.description}
                  </p>
                  <p className='flex items-center text-xs text-gray-500 dark:text-white/70'>
                    <span className='mr-2 h-2 w-2 rounded-full bg-gray-400 dark:bg-white/50'></span>
                    {project.date}
                  </p>
                  {project.url && (
                    <a
                      href={project.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex w-fit items-center rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 text-sm text-gray-900 transition-colors hover:bg-gray-300 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
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

              <div className='group relative hidden h-80 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:text-white lg:block'>
                <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <div className='absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent dark:from-white/5' />
                </div>
                <div className='absolute inset-0 flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-2/3'>
                  <div className='relative h-2/3 w-full p-4'>
                    <Image
                      src={project.pictures?.[0] || ''}
                      alt={project.title}
                      className='h-full w-full rounded-2xl object-cover object-center shadow-md transition-shadow duration-300 group-hover:shadow-xl'
                      width={500}
                      height={500}
                      sizes='33vw'
                    />
                    <div className='absolute inset-4 rounded-2xl border border-black/10 dark:border-white/15' />
                  </div>
                  <div className='flex-1 p-4'>
                    <h3 className='text-lg font-bold text-gray-900 drop-shadow-sm transition-colors duration-300 group-hover:text-gray-700 dark:text-white dark:group-hover:text-white/90'>
                      {project.title}
                    </h3>
                    <div className='mt-3 flex flex-wrap gap-1.5'>
                      {project.categories?.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className='inline-block rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-black/20 dark:border-white/30 dark:hover:border-white/60'
                          style={{ backgroundColor: badgeColor }}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='absolute inset-0 mt-4 flex translate-y-2/3 transform flex-col justify-center bg-gray-100 p-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:bg-gray-800'>
                  <div className='space-y-3'>
                    <p className='text-sm leading-relaxed text-gray-700 dark:text-white/90'>
                      {project.description}
                    </p>
                    <p className='flex items-center text-xs text-gray-500 dark:text-white/70'>
                      <span className='mr-2 h-2 w-2 rounded-full bg-gray-400 dark:bg-white/50'></span>
                      {project.date}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex w-fit items-center rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 text-sm text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-gray-300 dark:border-white/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30'
                        {...analyticsAttributes('project_clicked', {
                          category: 'home-grid',
                          label: project.title,
                        })}
                      >
                        Visit {project.title}{' '}
                        <FiArrowUpRight className='ml-1' />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
    </div>
  );
}
