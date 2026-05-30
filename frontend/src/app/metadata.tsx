import type { Metadata, Viewport } from 'next';

const siteUrl = 'https://adamsulemanji.com';
const description =
  'Adam Sulemanji — Software Engineer at Amazon in Seattle. Writing, projects, and the occasional over-engineered side project.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Adam Sulemanji',
    template: '%s — Adam Sulemanji',
  },
  description,
  authors: [{ name: 'Adam Sulemanji', url: siteUrl }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Adam Sulemanji',
    title: 'Adam Sulemanji',
    description,
    images: [{ url: '/images/me.JPG', alt: 'Adam Sulemanji' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adam Sulemanji',
    description,
    images: ['/images/me.JPG'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f8' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1c1c' },
  ],
};
