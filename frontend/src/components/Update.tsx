'use client';

import { updates } from '@/assets/updates';

const getDots = (description: string) => {
  const baseLength = 110;
  const dots = Math.max(1, baseLength - description.length);
  return '•'.repeat(dots);
};

export default function Updates() {
  return (
    <div className='space-y-[-2px]'>
      {updates.map((update, index) => (
        <a href={update.url} target='_blank' rel='noopener noreferrer'>
          <div
            key={index}
            className='flex items-center justify-between rounded-md border-gray-200 p-2 hover:bg-slate-500 dark:border-gray-700'
          >
            <div className='flex items-center space-x-2'>
              <span className='text-2xl'>{update.icon}</span>
              <p className='text-md font-light'>{update.description}</p>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='text-md font-light'>
                {getDots(update.description)}
              </span>
              <p className='text-sm'>{update.date}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
