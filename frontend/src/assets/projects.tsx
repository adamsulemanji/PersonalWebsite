interface projects {
  title: string;
  description: string;
  url?: string;
  date: string;
  pictures?: string[];
  categories?: string[];
}

export const projects: projects[] = [
  {
    title: 'Personal Portfolio',
    description:
      'A personal portfolio website to showcase my projects and skills.',
    url: 'https://example.com',
    date: '2023-01-01',
    pictures: ['portfolio1.png', 'portfolio2.png'],
    categories: ['webdev'],
  },
  {
    title: 'E-commerce Store',
    description:
      'An online store for selling products with a shopping cart and payment integration.',
    url: 'https://example-store.com',
    date: '2022-12-15',
    pictures: ['store1.png', 'store2.png'],
    categories: ['webdev', 'ecomm'],
  },
  {
    title: 'Weather App',
    description:
      'A weather forecasting app that provides current and future weather information.',
    date: '2022-11-20',
    pictures: ['weather1.png', 'weather2.png'],
    categories: ['mobiledev'],
  },
];
