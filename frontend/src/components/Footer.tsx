import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='mt-20 px-4 transition-opacity duration-500 sm:px-8'>
      <hr className='border-gray-200 dark:border-gray-700 my-10 w-full border-t' />
      <h6 className='mb-5 mt-10 text-center text-sm text-gray-600 dark:text-gray-300'>
        Thanks for reading this far, feel free to reach out to grab something to
        eat and chat !
      </h6>
      <h6 className='mb-10 flex items-center justify-center gap-1.5 text-center text-sm text-gray-500 dark:text-gray-400'>
        Made with <Heart size={14} className='fill-current' /> by Adam Sulemanji
      </h6>
    </footer>
  );
}
