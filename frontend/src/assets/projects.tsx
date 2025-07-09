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
    red:    ['bg-red-500', 'bg-red-400'],
    blue:   ['bg-blue-500', 'bg-blue-400'],
    green:  ['bg-teal-500', 'bg-teal-400'],
    purple: ['bg-violet-500', 'bg-violet-400'],
    orange: ['bg-orange-500', 'bg-orange-400'],
    banana: ['bg-yellow-500', 'bg-yellow-400'],
    sky:    ['bg-sky-500', 'bg-sky-400'],
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
