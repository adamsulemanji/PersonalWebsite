import type { MetadataRoute } from 'next';
import { writing } from '@/assets/writing';

const siteUrl = 'https://adamsulemanji.com';

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = writing.map((post) => ({
    url: `${siteUrl}/writing/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...posts,
  ];
}
