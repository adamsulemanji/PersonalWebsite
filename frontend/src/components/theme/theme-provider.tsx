'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

function getScheduledTheme(date = new Date()) {
  const hour = date.getHours();

  return hour >= 8 && hour < 20 ? 'light' : 'dark';
}

function ThemeScheduler() {
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const syncTheme = () => {
      setTheme(getScheduledTheme());
    };

    syncTheme();

    const intervalId = window.setInterval(syncTheme, 60_000);

    return () => window.clearInterval(intervalId);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeScheduler />
      {children}
    </NextThemesProvider>
  );
}
