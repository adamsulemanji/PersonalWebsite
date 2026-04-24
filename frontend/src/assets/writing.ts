export interface WritingPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  readingTime?: string;
  body: string;
  external?: string;
}

export const writing: WritingPost[] = [
  {
    slug: 'why-i-build',
    title: 'Why I build',
    date: '2026-04-10',
    description:
      'Small projects are how I actually learn — a note on the philosophy behind the side projects on this site.',
    readingTime: '4 min read',
    body: `
There is a version of learning where you read a book, close it, and believe you now know the thing. I have tried that version many times. It doesn't take.

The version that works for me is building. Not the grand, well-scoped project with a roadmap — the scrappy, half-embarrassing one that I ship on a weekend because I wanted to see if it could exist.

Every project on this site started that way. A meal tracker because I was tired of typing into Notes. A CDK-powered personal website because static hosting was too simple and I wanted the excuse. A tool to watch my Strava data because I got competitive with myself.

If there is a thesis, it's this: the act of building forces a level of specificity that reading never will. You cannot hand-wave a schema. You cannot skim a race condition. You either made the thing work or you didn't.

That's why I keep building. Not because every project is important, but because the habit is.
    `,
  },
  {
    slug: 'notes-on-moving-to-seattle',
    title: 'Notes on moving to Seattle',
    date: '2026-02-20',
    description:
      'A few honest observations after a year in the Pacific Northwest — on the mountains, the gray, and finding your people.',
    readingTime: '5 min read',
    body: `
I moved to Seattle a little over a year ago. These are the things nobody told me, ranked roughly by how much they surprised me.

**The mountains change you.** I did not expect to become a skier. I am now, unambiguously, a skier. The proximity of the Cascades rewires your weekends in a way that is difficult to explain until it happens.

**The gray is real, but overblown.** Yes, it rains. No, it is not as oppressive as the memes suggest. The real shift is the short days in December — that one takes adjustment.

**Making friends as an adult is a project.** The tech-industry stereotype of the "Seattle freeze" has some truth to it, but mostly it's a prompt: you have to be the one organizing the dinner, the hike, the ski trip. Once you are, people show up.

**Coffee is a personality.** I came in skeptical. I left with a grinder.

I'll update this list in another year.
    `,
  },
  {
    slug: 'how-this-site-is-built',
    title: 'How this site is built',
    date: '2026-01-15',
    description:
      'A short tour of the stack behind adamsulemanji.com — Next.js, Tailwind, and a probably-overengineered AWS CDK pipeline.',
    readingTime: '6 min read',
    body: `
The short version: Next.js App Router on the frontend, deployed via AWS CDK to S3 + CloudFront, with a custom CI/CD pipeline that is completely unnecessary for a site this size.

That "completely unnecessary" is the point. I wanted to learn CDK properly, and the best way to learn an infrastructure-as-code tool is to use it for something you care about. A personal site is low stakes, visible, and long-lived — a perfect first real project.

**Stack**

- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind, a handful of shadcn primitives, Geist font
- **Motion**: Framer Motion for the entrance animations and the image carousel
- **Hosting**: S3 + CloudFront, fronted by a Route 53 alias
- **Infra**: AWS CDK, with a CodePipeline that builds from this repo on push to \`main\`
- **Analytics**: PostHog, with a light wrapper so components can fire events with typed attributes

**What I'd do differently**

- The CDK stack grew organically and could be consolidated. One day.
- I resisted adding MDX for a long time. Writing posts as TS strings works, but barely — the moment I want code blocks with syntax highlighting, I'll migrate.

If you want to poke around the source, the repo is linked from my GitHub.
    `,
  },
];
