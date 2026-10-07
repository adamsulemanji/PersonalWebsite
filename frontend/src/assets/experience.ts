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
    role: 'Software Engineer, Security Incident Response',
    company: 'Amazon Web Services',
    location: 'Seattle, WA',
    dates: 'Sep 2026 — Present',
    description:
      'Building on the AWS Security Incident Response team (Kumo), helping customers detect, triage, and recover from security events.',
    url: 'https://aws.amazon.com/security-incident-response/',
  },
  {
    role: 'Software Engineer, Payments Processing Initialization',
    company: 'Amazon',
    location: 'Seattle, WA',
    dates: 'Feb 2026 — Sep 2026',
    description:
      'Built systems that kick off the payments processing flow across Amazon.',
    url: 'https://www.amazon.com',
  },
  {
    role: 'Software Engineer, SageMaker AI',
    company: 'Amazon Web Services',
    location: 'Seattle, WA',
    dates: 'Aug 2025 — Feb 2026',
    description:
      'Worked on model customization through AI agents, SageMaker Ground Truth data labeling, and Mechanical Turk human-in-the-loop workflows.',
    url: 'https://aws.amazon.com/sagemaker/',
  },
  {
    role: 'Software Engineer (Contract)',
    company: 'Mercor',
    location: 'Remote',
    dates: '2025',
    description: 'Mixed projects with leading AI labs.',
    url: 'https://www.mercor.com',
  },
  {
    role: 'Software Engineer Intern, Global Stores Tech',
    company: 'Amazon',
    location: 'Seattle, WA',
    dates: 'Summer 2024',
    description:
      'Built crosslisting software and the Global Store landing page on Amazon.com, connecting international customers to products across borders.',
  },
  {
    role: 'Market Risk Summer Analyst',
    company: 'Goldman Sachs',
    location: 'Dallas, TX',
    dates: 'Summer 2023',
    description:
      'Worked on market-risk tooling for the GS Bank legal entity, used to price and monitor exposure.',
    url: 'https://www.goldmansachs.com',
  },
  {
    role: 'Data and Technology Intern',
    company: 'PricewaterhouseCoopers',
    location: 'Houston, TX',
    dates: 'Summer 2022',
    description:
      'Data analytics and research for technology engagements with non-profit clients.',
    url: 'https://www.pwc.com',
  },
];
