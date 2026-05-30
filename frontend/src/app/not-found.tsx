import Link from 'next/link';
import { sectionLabel, underlineLink } from '@/lib/styles';

export default function NotFound() {
  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 pb-32 pt-24 sm:px-12 md:px-20'>
      <p className={`mb-6 ${sectionLabel}`}>404</p>
      <h1 className='font-serif text-4xl font-light leading-tight sm:text-5xl'>
        Page not found
      </h1>
      <p className='mt-4 max-w-md text-center text-[15px] leading-7 text-gray-600 dark:text-gray-300'>
        The page you are looking for does not exist.
      </p>
      <Link
        href='/'
        className={`mt-8 text-sm text-gray-500 dark:text-gray-400 ${underlineLink}`}
      >
        Go home
      </Link>
    </div>
  );
}
