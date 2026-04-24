import { experience } from '@/assets/experience';
import { FiArrowUpRight } from 'react-icons/fi';
import { analyticsAttributes } from '@/lib/analytics';

export default function Experience() {
  return (
    <ol className='relative space-y-8 border-l border-gray-200 dark:border-gray-700 pl-6'>
      {experience.map((item, index) => {
        const companyEl = item.url ? (
          <a
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-0.5 underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600 hover:decoration-gray-600 dark:hover:decoration-gray-300 transition-colors'
            {...analyticsAttributes('experience_clicked', { label: item.company })}
          >
            {item.company}
            <FiArrowUpRight className='text-xs' />
          </a>
        ) : (
          <span>{item.company}</span>
        );

        return (
          <li key={index} className='relative'>
            <span className='absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600' />
            <div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between'>
              <div className='text-[15px] leading-6 text-gray-900 dark:text-white'>
                <span className='font-medium'>{item.role}</span>
                <span className='text-gray-500 dark:text-gray-400'> · </span>
                <span className='text-gray-700 dark:text-gray-200'>{companyEl}</span>
              </div>
              <span className='shrink-0 text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500'>
                {item.dates}
              </span>
            </div>
            {item.location && (
              <p className='mt-0.5 text-xs text-gray-400 dark:text-gray-500'>
                {item.location}
              </p>
            )}
            {item.description && (
              <p className='mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300'>
                {item.description}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
