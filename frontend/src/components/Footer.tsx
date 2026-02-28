import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='mt-20 px-4 transition-opacity duration-500 sm:px-8'>
      <hr className='border-gray-300 my-10 w-full border-t' />
      <h6 className='mb-5 mt-10 text-center'>
        Thanks for reading this far, feel free to reach out to grab something to
        eat and chat !
      </h6>
      <h6 className='text-md mb-5 flex items-center justify-center text-center'>
        Made with ❤️ by Adam Sulemanji
      </h6>
      <div className='flex flex-wrap justify-center gap-6 pb-10 sm:gap-12'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://github.com/adamsulemanji'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub />
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.linkedin.com/in/adamsulemanji/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaLinkedin />
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.instagram.com/adam_sulemanji'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaInstagram />
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='mailto:adam.k.sulemanji@gmail.com'
        >
          <FaEnvelope />
        </a>
        <a href='/resume.pdf' className='group'>
          <p className='relative text-sm hover:underline hover:underline-offset-4'>
            Resume
            <span className='bg-current absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full'></span>
          </p>
        </a>
      </div>
    </footer>
  );
}
