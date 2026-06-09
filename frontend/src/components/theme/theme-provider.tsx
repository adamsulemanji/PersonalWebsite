'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// On a visitor's first load (no stored preference), an inline script in
// layout.tsx seeds localStorage with a light/dark theme based on local time
// of day before next-themes reads it — so there is no flash and no extra
// client logic needed here.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
