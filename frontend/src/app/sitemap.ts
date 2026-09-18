import type { MetadataRoute } from 'next';
import { localPosts, postsByDate } from '@/assets/writing';
import { abs } from '@/lib/site';

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: abs('/'),
      lastModified: postsByDate[0]?.date,
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Only posts with a page here — linked-out ones aren't ours to list.
    ...localPosts.map((post) => ({
      url: abs(`/writing/${post.slug}/`),
      lastModified: post.date,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
