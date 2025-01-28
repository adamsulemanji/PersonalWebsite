'use strict';

import localFont from 'next/font/local';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';

import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

const geistMono = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='flex justify-center'>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <div className='w-full max-w-[1200px]'>
            <Navbar />
            <main
              className={`${geistMono.variable} ${geistMono.variable} accent-bg accent-text antialiased`}
            >
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
