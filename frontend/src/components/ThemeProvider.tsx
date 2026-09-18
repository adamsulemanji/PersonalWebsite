'use client';

import { useEffect } from 'react';
import type { ComponentProps } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

// Must match --background in globals.css.
const THEME_COLORS: Record<string, string> = {
  light: '#f8f8f8',
  dark: '#1c1c1c',
};

/**
 * Keeps <meta name="theme-color"> on the theme actually shown. The theme is
 * class-based, so static `prefers-color-scheme` variants would disagree with it.
 */
function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = THEME_COLORS[resolvedTheme ?? 'light'];
    if (!color) return;

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = color;
  }, [resolvedTheme]);

  return null;
}

// On a visitor's first load (no stored preference), an inline script in
// layout.tsx seeds localStorage with a light/dark theme based on local time
// of day before next-themes reads it — so there is no flash and no extra
// client logic needed here.
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  );
}
