'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { analyticsAttributes } from '@/lib/analytics';

export default function LightDarkToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='bottom-0 right-0 p-4'>
      <Button
        className='bg-transparent text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 m-2 rounded-md px-4 py-2'
        onClick={toggleDarkMode}
        {...analyticsAttributes('theme_toggled', {
          label: 'theme-toggle',
          nextTheme: theme === 'light' ? 'dark' : 'light',
        })}
      >
        {theme === 'dark' ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
}
