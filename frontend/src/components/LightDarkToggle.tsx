'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

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
        className='m-2 rounded-md bg-transparent px-4 py-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
        onClick={toggleDarkMode}
      >
        {theme === 'dark' ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
}
