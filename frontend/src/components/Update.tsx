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
            <div className='border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex flex-col gap-2 rounded-md p-3 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center space-x-2'>
                <span className='text-2xl'>{update.icon}</span>
                <p className='text-sm font-light sm:text-base'>
                  {update.description}
                </p>
              </div>

              <div className='mx-2 hidden flex-grow overflow-hidden sm:flex'>
                <span className='text-gray-400 whitespace-nowrap text-sm font-light'>
                  {Array(100).fill('•').join('')}
                </span>
              </div>

              <div className='flex-shrink-0'>
                <p className='text-gray-500 text-xs sm:text-sm'>
                  {update.date}
                </p>
              </div>
            </div>
          </a>
        ))}
    </div>
  );
}
