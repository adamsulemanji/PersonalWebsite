import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      colors: {
        // Tokens are plain CSS custom properties (hex), so reference them
        // directly — wrapping a hex value in hsl() produces invalid CSS.
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        main: 'var(--main)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
