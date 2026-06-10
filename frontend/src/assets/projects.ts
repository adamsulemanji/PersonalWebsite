export interface Project {
  title: string;
  description: string;
  url?: string;
  date: string;
  pictures?: string[];
  categories?: string[];
  color?: keyof typeof colorMap;
}

/** Category-pill background colors (see /design.md — pills carry the color). */
export const colorMap = {
  red: '#f87171',
  blue: '#60a5fa',
  green: '#2dd4bf',
  purple: '#a78bfa',
  orange: '#fb923c',
  banana: '#facc15',
  sky: '#38bdf8',
  pink: '#f56565',
} as const;

export const projects: Project[] = [
  {
    title: 'Personal Website',
    description:
      'A personal portfolio overengineered using AWS services and custom CI/CD pipeline.',
    url: 'https://adamsulemanji.com',
    date: 'Dec 2024 - Present',
    pictures: ['/images/me.webp'],
    categories: ['cdk', 'tailwind', 'aws', 'hosting'],
    color: 'orange',
  },
  {
    title: 'Create ACS app',
    description:
      'Command line tool to create full cdk applications with a single command.',
    date: 'September 2024 - Present',
    url: 'https://github.com/adamsulemanji',
    pictures: ['/images/systemdiagram.webp'],
    categories: ['cli', 'ci/cd', 'aws'],
    color: 'green',
  },
  {
    title: 'Course Monitoring',
    description:
      'A course monitoring tool for students about TAMU classes (unfortunately not available anymore)',
    date: 'May 2022 - Present',
    url: 'https://courses.adamsulemanji.com/',
    pictures: ['/images/coursemonitoring.webp'],
    categories: ['eventbridge', 'lambda', 'dynamodb'],
    color: 'purple',
  },
  {
    title: 'Letterboxd Movie Scraper',
    description:
      'A movie scraper for most recent movies on letterboxd and of course its overengineered',
    date: 'January 2025 - Present',
    url: 'https://api.fast.adamsulemanji.com/',
    pictures: ['/images/letterboxd.webp'],
    categories: ['webscrapping', 'dynamodb'],
    color: 'red',
  },
  {
    title: 'BANANAS',
    description: 'Banagrams for online multiplayer for my friends and I',
    date: 'April 2025 - Present',
    url: 'https://bananas.adamsulemanji.com/',
    pictures: ['/images/river.webp'],
    categories: ['websockets', 'cursor', 'react-dnd'],
    color: 'banana',
  },
  {
    title: 'Model Customization through AI Agents',
    description:
      'Democratizing model customization through AI agents and evaluation ',
    url: 'https://aws.amazon.com/sagemaker/ai/model-customization/',
    date: 'October 2025 - Jan 2026',
    pictures: ['/images/sagemaker.webp'],
    categories: [],
    color: 'pink',
  },
];
