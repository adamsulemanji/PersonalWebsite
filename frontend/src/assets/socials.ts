/** Icons are mapped by `id` in `SocialLinks`, keeping this plain data —
 *  the layout also reads it for `sameAs` in the Person structured data. */
export interface Social {
  id: string;
  label: string;
  href: string;
  /** Overrides the default `social_link_clicked` analytics event. */
  event?: string;
  /** Rendered as a small text label rather than an icon. */
  text?: string;
}

export const socials: Social[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/adamsulemanji',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adamsulemanji/',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/adam_sulemanji',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:adam.k.sulemanji@gmail.com',
  },
  {
    id: 'strava',
    label: 'Strava',
    href: 'https://www.strava.com/athletes/109469044',
  },
  {
    id: 'goodreads',
    label: 'Goodreads',
    href: 'https://www.goodreads.com/user/show/146321248-adam-sulemanji',
  },
  {
    id: 'letterboxd',
    label: 'Letterboxd',
    href: 'https://letterboxd.com/adamsulemanji',
  },
  {
    id: 'beli',
    label: 'Beli',
    href: 'https://beliapp.co/user/adamsulemanji',
    text: 'Beli',
  },
  {
    id: 'resume',
    label: 'Resume (PDF)',
    href: '/resume.pdf',
    event: 'resume_downloaded',
    text: 'Resume',
  },
];
