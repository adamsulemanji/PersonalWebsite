'use client';

import type { ReactNode } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaStrava,
  FaGoodreads,
} from 'react-icons/fa';
import { SiLetterboxd } from 'react-icons/si';

import ThemeToggle from '@/components/ThemeToggle';
import { analyticsAttributes } from '@/lib/analytics';

interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
  event?: string;
  small?: boolean;
}

const socials: SocialLink[] = [
  {
    label: 'github',
    href: 'https://github.com/adamsulemanji',
    icon: <FaGithub />,
  },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/adamsulemanji/',
    icon: <FaLinkedin />,
  },
  {
    label: 'instagram',
    href: 'https://www.instagram.com/adam_sulemanji',
    icon: <FaInstagram />,
  },
  {
    label: 'email',
    href: 'mailto:adam.k.sulemanji@gmail.com',
    icon: <FaEnvelope />,
  },
  {
    label: 'strava',
    href: 'https://www.strava.com/athletes/109469044',
    icon: <FaStrava />,
  },
  {
    label: 'goodreads',
    href: 'https://www.goodreads.com/user/show/146321248-adam-sulemanji',
    icon: <FaGoodreads />,
  },
  {
    label: 'letterboxd',
    href: 'https://letterboxd.com/adamsulemanji',
    icon: <SiLetterboxd />,
  },
  {
    label: 'beli',
    href: 'https://beliapp.co/user/adamsulemanji',
    icon: 'Beli',
    small: true,
  },
  {
    label: 'resume',
    href: '/resume.pdf',
    icon: 'Resume',
    event: 'resume_downloaded',
    small: true,
  },
];

export default function SocialLinks() {
  return (
    <div className='mt-8 flex flex-wrap items-center gap-5 text-xl text-gray-500 dark:text-gray-400'>
      {socials.map((social) => {
        const isExternal = social.href.startsWith('http');
        return (
          <a
            key={social.label}
            href={social.href}
            {...(isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className={`rounded transition-colors hover:text-gray-900 focus-visible:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:hover:text-white dark:focus-visible:text-white dark:focus-visible:ring-gray-500 ${
              social.small ? 'text-sm' : ''
            }`}
            {...analyticsAttributes(social.event ?? 'social_link_clicked', {
              label: social.label,
              section: 'hero',
            })}
          >
            {social.icon}
          </a>
        );
      })}
      <ThemeToggle />
    </div>
  );
}
