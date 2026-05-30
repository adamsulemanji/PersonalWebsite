import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { writing } from '@/assets/writing';
import { analyticsAttributes } from '@/lib/analytics';
import { metaLabel } from '@/lib/styles';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Writing() {
  const posts = [...writing].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
      {posts.map((post) => {
        const inner = (
          <div className='group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
            <div className='min-w-0'>
              <h3 className='flex items-center gap-1 text-[15px] font-medium text-gray-900 dark:text-white'>
                {post.title}
                <FiArrowUpRight className='text-gray-400 opacity-0 transition group-hover:opacity-100' />
              </h3>
              <p className='mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400'>
                {post.description}
              </p>
            </div>
            <div className={`shrink-0 ${metaLabel}`}>
              {formatDate(post.date)}
            </div>
          </div>
        );

        const analytics = analyticsAttributes('writing_clicked', {
          label: post.slug,
        });

        if (post.external) {
          return (
            <li key={post.slug}>
              <a
                href={post.external}
                target='_blank'
                rel='noopener noreferrer'
                className='block'
                {...analytics}
              >
                {inner}
              </a>
            </li>
          );
        }

        return (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className='block'
              {...analytics}
            >
              {inner}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
