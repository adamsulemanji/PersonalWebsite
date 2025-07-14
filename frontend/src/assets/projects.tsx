export interface projectsInterface {
  title: string;
  description: string;
  url?: string;
  date: string;
  pictures?: string[];
  categories?: string[];
  color?: string;
}

export const colorMap: Record<string, string[]> = {
    red:    ['#ef4444', '#f87171'],
    blue:   ['#3b82f6', '#60a5fa'],
    green:  ['#14b8a6', '#2dd4bf'],
    purple: ['#8b5cf6', '#a78bfa'],
    orange: ['#f97316', '#fb923c'],
    banana: ['#eab308', '#facc15'],
    sky:    ['#0ea5e9', '#38bdf8'],
  };

export const projects: projectsInterface[] = [
  {
    title: 'Personal Website',
    description:
      'A personal portfolio overengineered using AWS services and custom CI/CD pipeline.',
    url: 'https://adamsulemanji.com',
    date: 'Dec 2024 - Present',
    pictures: ['/images/me.JPG'],
    categories: ['cdk', 'tailwind', 'aws', 'hosting'],
    color: 'orange',
  },
  {
    title: 'Meal Tracker',
    description: 'Custom and personalized mealtracker for nikki.',
    url: 'https://mealtracker.adamsulemanji.com',
    date: 'Nov 2024 - Present',
    pictures: ['images/mealtracker.png'],
    categories: ['crud', 'fastapi', 'docker'],
    color: 'blue',
  },
  {
    title: 'Create ACS app',
    description:
      'Command line tool to create full cdk applications with a single command.',
    date: 'September 2024 - Present',
    url: 'https://github.com/adamsulemanji',
    pictures: ['/images/systemdiagram.png'],
    categories: ['cli', 'ci/cd', 'aws'],
    color: 'green',
  },
  {
    title: 'Course Monitoring',
    description: 'A course monitoring tool for students about TAMU classes (unfortunately not available anymore)',
    date: 'May 2022 - Present',
    url: 'https://courses.adamsulemanji.com/',
    pictures: ['/images/coursemonitoring.png'],
    categories: ['eventbridge', 'lambda', 'dynamodb'],
    color: 'purple',
  },
  {
    title: 'Letterboxd Movie Scraper',
    description: 'A movie scraper for most recent movies on letterboxd and of course its overengineered',
    date: 'January 2025 - Present',
    url: 'https://api.fast.adamsulemanji.com/',
    pictures: ['/images/letterboxd.png'],
    categories: ['webscrapping', 'dynamodb', 'fastapi'],
    color: 'red',
  },
  {
    title: 'BANANAS',
    description: 'Banagrams for online multiplayer for my friends and I',
    date: 'April 2025 - Present',
    url: 'https://bananas.adamsulemanji.com/',
    pictures: ['/images/river.jpg'],
    categories: ['websockets', 'cursor', 'react-dnd'],
    color: 'banana',
  },
];
