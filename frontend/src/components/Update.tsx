'use client';

import { updates } from '@/assets/updates';

const getDots = (description: string, date: string) => {
  const baseLength = 112;
  const dots = Math.max(1, baseLength - description.length - date.length);
  return '•'.repeat(dots);
};

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
            <div className='flex items-center justify-between rounded-md border-gray-200 p-2 hover:bg-slate-500 dark:border-gray-700'>
              <div className='flex items-center space-x-2'>
                <span className='text-2xl'>{update.icon}</span>
                <p className='text-md font-light'>{update.description}</p>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-md mx-1 font-light'>
                  {getDots(update.description, update.date)}
                </span>
                <p className='text-sm'>{update.date}</p>
              </div>
            </div>
          </a>
        ))}
    </div>
  );
}
