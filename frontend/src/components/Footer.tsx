import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='mt-20 px-4 transition-opacity duration-500 sm:px-8'>
      <hr className='border-gray-300 my-10 w-full border-t' />
      <h6 className='mb-5 mt-10 text-center'>
        Thanks for reading this far, feel free to reach out to grab something to
        eat and chat !
      </h6>
      <h6 className='text-md mb-10 flex items-center justify-center gap-1.5 text-center'>
        Made with <Heart size={14} className='fill-current' /> by Adam Sulemanji
      </h6>
    </footer>
  );
}
