import type { ReactNode } from 'react';
import '../styles/globals.css';

export { metadata, viewport } from './metadata';
import { ThemeProvider } from '@/components/ThemeProvider';
import RumProvider from '@/components/RumProvider';
import MotionProvider from '@/components/MotionProvider';
import JsonLd from '@/components/JsonLd';
import Footer from '@/components/Footer';
import { abs, siteDescription, siteName, siteUrl } from '@/lib/site';
import { socials } from '@/assets/socials';

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  image: abs('/images/og.jpg'),
  jobTitle: 'Software Engineer',
  worksFor: { '@type': 'Organization', name: 'Amazon' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  sameAs: socials
    .filter((social) => social.href.startsWith('http'))
    .map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* First visit only: seed the stored theme from local time of day
            (light 8am-8pm) before next-themes' own pre-paint script reads it,
            so evening visitors never see a light-mode flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!localStorage.getItem('theme')){var h=new Date().getHours();localStorage.setItem('theme',h>=8&&h<20?'light':'dark');}}catch(e){}})();`,
          }}
        />
        <JsonLd data={person} />
      </head>
      <body className='flex min-h-screen justify-center overflow-x-hidden bg-background text-foreground antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
        >
          <RumProvider>
            <MotionProvider>
              <a
                href='#main'
                className='sr-only rounded-md border border-gray-300 bg-background px-4 py-2 text-sm focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 dark:border-gray-600'
              >
                Skip to content
              </a>
              <div className='w-full max-w-[1200px]'>
                <main id='main'>{children}</main>
                <Footer />
              </div>
            </MotionProvider>
          </RumProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
