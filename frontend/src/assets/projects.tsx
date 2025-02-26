export interface projectsInterface {
  title: string;
  description: string;
  url?: string;
  date: string;
  pictures?: string[];
  categories?: string[];
  color?: string;
}

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
    description: 'A  course monitoring tool for students about TAMU classes',
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
    title: 'Place Holder',
    description: 'A Placeholder for now',
    date: 'May 2022 - Present',
    url: 'https://courses.adamsulemanji.com/',
    pictures: ['/images/river.jpg'],
    categories: ['eventbridge', 'lambda', 'dynamodb'],
    color: 'sky',
  },
];
