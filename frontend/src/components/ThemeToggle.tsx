'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Same-size placeholder until mounted so the social row doesn't shift
  // when the real toggle appears after hydration.
  if (!mounted) {
    return (
      <span
        aria-hidden
        className='flex items-center justify-center rounded-full border border-gray-300 p-1.5 dark:border-gray-600'
      >
        <Moon size={14} className='invisible' />
      </span>
    );
  }

  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='flex items-center justify-center rounded-full border border-gray-300 p-1.5 text-gray-500 transition-colors hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:focus-visible:ring-gray-500'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
