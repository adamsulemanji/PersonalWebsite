import { Heart } from 'lucide-react';
import { underlineLink } from '@/lib/styles';

export default function Footer() {
  return (
    <footer className='mt-20 px-4 transition-opacity duration-500 sm:px-8'>
      <hr className='my-10 w-full border-t border-gray-200 dark:border-gray-700' />
      <p className='mb-5 mt-10 text-center text-sm text-gray-600 dark:text-gray-300'>
        Thanks for reading this far. Feel free to reach out to grab something to
        eat and chat!
      </p>
      <p className='flex items-center justify-center gap-1.5 text-center text-sm text-gray-500 dark:text-gray-400'>
        Made with <Heart size={14} className='fill-current' aria-hidden /> by
        Adam Sulemanji
      </p>
      <p className='mb-10 mt-3 text-center text-sm text-gray-500 dark:text-gray-400'>
        <a href='/feed.xml' className={underlineLink}>
          RSS
        </a>
      </p>
    </footer>
  );
}
