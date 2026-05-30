import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import '../styles/globals.css';

export { metadata, viewport } from './metadata';
import { ThemeProvider } from '@/components/theme/theme-provider';
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';
import MotionProvider from '@/components/MotionProvider';

import Footer from '@/components/Footer';

const geistMono = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='flex min-h-screen justify-center overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]'>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
        >
          <AnalyticsProvider>
            <MotionProvider>
              <div className='w-full max-w-[1200px] bg-[var(--background)]'>
                <main
                  className={`${geistMono.variable} bg-[var(--background)] antialiased`}
                >
                  {children}
                </main>
                <Footer />
              </div>
            </MotionProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
