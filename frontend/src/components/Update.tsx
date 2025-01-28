'use client';

import { updates } from '@/assets/updates';

interface UpdatesProps {
  category: string;
}

export default function Updates({ category }: UpdatesProps) {
  return (
    <div className='space-y-[-2px]'>
      {updates
        .filter((update) => update.category === category)
        .map((update, index) => (
          <a
            href={update.url}
            target='_blank'
            rel='noopener noreferrer'
            key={index}
          >
            <div className='flex items-center justify-between rounded-md border-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
              <div className='flex items-center space-x-2'>
                <span className='text-2xl'>{update.icon}</span>
                <p className='text-md font-light'>{update.description}</p>
              </div>

              <div className='flex-grow mx-2 overflow-hidden'>
                <span className='whitespace-nowrap text-md font-light text-gray-400'>
                  {Array(100).fill('•').join('')} 
                </span>
              </div>

              <div className='flex-shrink-0'>
                <p className='text-sm'>{update.date}</p>
              </div>
            </div>
          </a>
        ))}
    </div>
  );
}