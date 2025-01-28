'use client';

import React from 'react';
import { projects } from '@/assets/projects';

// interface projects {
//     title: string;
//     description: string;
//     url?: string;
//     date: string;
//     pictures?: string[];
//     categories?: string[];
// }

interface ProjectProps {
  category?: string;
}

export default function Project({ category = '' }: ProjectProps) {
  return (
    <div>
      {projects
        .filter(
          (project) =>
            !category ||
            (project.categories && project.categories.includes(category))
        )
        .map((project, index) => (
          <div
            key={index}
            className='flex flex-col space-y-2 rounded-md border border-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'
          >
            {project.title && (
              <h2 className='text-2xl font-bold'>{project.title}</h2>
            )}
          </div>
        ))}
    </div>
  );
}
