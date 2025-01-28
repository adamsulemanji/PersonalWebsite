interface Update {
  icon: string;
  description: string;
  url?: string;
  date: string;
  category?: string;
}

export const updates: Update[] = [
  {
    icon: '🚀',
    description: 'First test element',
    url: 'https://www.adamsulemanji.com',
    date: 'Jan 2025',
    category: 'all',
  },
  {
    icon: '⛷️',
    description: 'Went skiing at Steamboat, CO and Parkcity, UT',
    url: 'https://www.adamsulemanji.com',
    date: 'Dec 2024 - Jan 2025',
    category: 'all',
  },
  {
    icon: '📚',
    description: 'Graduated from TAMU with my Masters in Computer Science',
    url: 'https://www.adamsulemanji.com',
    date: 'Dec 2024',
    category: 'all',
  },
  {
    icon: '👨🏽‍💻',
    description: 'Finished my internship at Amazon',
    url: 'https://www.amazon.com',
    date: 'Aug 2024',
    category: 'all',
  },
];
