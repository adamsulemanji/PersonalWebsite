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
    categories: ['webdev'],
    color: 'red',
  },
  {
    title: 'Meal Tracker',
    description: 'Custom and personalized mealtracker for nikki.',
    url: 'https://mealtracker.adamsulemanji.com',
    date: 'Nov 2024 - Present',
    pictures: ['images/mealtracker.png'],
    categories: ['webdev', 'ecomm'],
    color: 'blue',
  },
  {
    title: 'Create ACS app',
    description:
      'Command line tool to create full cdk applications with a single command.',
    date: 'September 2024 - Present',
    url: 'https://github.com/adamsulemanji',
    pictures: ['/images/systemdiagram.png'],
    categories: ['mobiledev'],
    color: 'green',
  },
  {
    title: 'Course Monitoring',
    description: 'A  course monitoring tool for students about TAMU classes',
    date: 'May 2022 - Present',
    url: 'https://courses.adamsulemanji.com/',
    pictures: ['/images/coursemonitoring.png'],
    color: 'purple',
  },
];
