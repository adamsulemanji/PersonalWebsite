'use client';

import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { analyticsAttributes } from '@/lib/analytics';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 p-1.5 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors'
      aria-label='Toggle theme'
      {...analyticsAttributes('theme_toggled', {
        label: 'theme-toggle',
        nextTheme: isDark ? 'light' : 'dark',
      })}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}

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
      <div className='flex flex-wrap items-center justify-center gap-6 pb-10 sm:gap-12'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://github.com/adamsulemanji'
          target='_blank'
          rel='noopener noreferrer'
          {...analyticsAttributes('social_link_clicked', {
            label: 'github',
            section: 'footer',
          })}
        >
          <FaGithub />
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.linkedin.com/in/adamsulemanji/'
          target='_blank'
          rel='noopener noreferrer'
          {...analyticsAttributes('social_link_clicked', {
            label: 'linkedin',
            section: 'footer',
          })}
        >
          <FaLinkedin />
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://www.instagram.com/adam_sulemanji'
          target='_blank'
          rel='noopener noreferrer'
          {...analyticsAttributes('social_link_clicked', {
            label: 'instagram',
            section: 'footer',
          })}
        >
          <FaInstagram />
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='mailto:adam.k.sulemanji@gmail.com'
          {...analyticsAttributes('social_link_clicked', {
            label: 'email',
            section: 'footer',
          })}
        >
          <FaEnvelope />
        </a>
        <a
          href='/resume.pdf'
          className='group'
          {...analyticsAttributes('resume_downloaded', {
            label: 'resume',
            section: 'footer',
          })}
        >
          <p className='relative text-sm hover:underline hover:underline-offset-4'>
            Resume
            <span className='bg-current absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full' />
          </p>
        </a>
        <ThemeToggle />
      </div>
    </footer>
  );
}
