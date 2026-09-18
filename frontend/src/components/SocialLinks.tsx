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
import { socials } from '@/assets/socials';
import { analyticsAttributes } from '@/lib/analytics';

const icons: Record<string, ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  instagram: <FaInstagram />,
  email: <FaEnvelope />,
  strava: <FaStrava />,
  goodreads: <FaGoodreads />,
  letterboxd: <SiLetterboxd />,
};

export default function SocialLinks() {
  return (
    <ul className='mt-8 flex list-none flex-wrap items-center gap-5 p-0 text-xl text-gray-500 dark:text-gray-400'>
      {socials.map((social) => {
        const isExternal = social.href.startsWith('http');
        return (
          <li key={social.id}>
            <a
              href={social.href}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`block rounded transition-colors hover:text-gray-900 dark:hover:text-white ${
                social.text ? 'text-sm' : ''
              }`}
              aria-label={social.label}
              {...analyticsAttributes(social.event ?? 'social_link_clicked', {
                label: social.id,
                section: 'hero',
              })}
            >
              {social.text ?? icons[social.id]}
            </a>
          </li>
        );
      })}
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
}
