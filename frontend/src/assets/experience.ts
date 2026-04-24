export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  dates: string;
  description?: string;
  url?: string;
}

export const experience: ExperienceItem[] = [
  {
    role: 'Software Engineer, Global Payments Tech',
    company: 'Amazon',
    location: 'Seattle, WA',
    dates: 'Feb 2026 — Present',
    description:
      'Building systems that power the payments processing flow across Amazon.',
    url: 'https://www.amazon.com',
  },
  {
    role: 'Software Engineer, Model Customization',
    company: 'Amazon Web Services',
    location: 'Seattle, WA',
    dates: 'Aug 2025 — Feb 2026',
    description:
      'Worked on AI agents, human-in-the-loop workflows, and Mechanical Turk integrations for model customization.',
    url: 'https://aws.amazon.com',
  },
  {
    role: 'Software Engineer Intern, Crossborders',
    company: 'Amazon',
    location: 'Seattle, WA',
    dates: 'Summer 2024',
    description:
      'Built software that connects international customers to products across borders.',
  },
  {
    role: 'Market Risk Summer Analyst',
    company: 'Goldman Sachs',
    location: 'Dallas, TX',
    dates: 'Summer 2023',
    description:
      'Worked on market-risk tooling used by trading desks to price and monitor exposure.',
    url: 'https://www.goldmansachs.com',
  },
  {
    role: 'Technology Consulting Intern',
    company: 'PricewaterhouseCoopers',
    location: 'Dallas, TX',
    dates: 'Summer 2022',
    description:
      'Delivered technology engagements for non-profit clients focused on operational efficiency.',
    url: 'https://www.pwc.com',
  },
];
