import type { ReactNode } from 'react';
import '../styles/globals.css';

export { metadata, viewport } from './metadata';
import { ThemeProvider } from '@/components/theme/theme-provider';
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';
import MotionProvider from '@/components/MotionProvider';

import Footer from '@/components/Footer';

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
      </head>
      <body className='flex min-h-screen justify-center overflow-x-hidden bg-background text-foreground antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
        >
          <AnalyticsProvider>
            <MotionProvider>
              <div className='w-full max-w-[1200px]'>
                <main>{children}</main>
                <Footer />
              </div>
            </MotionProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
