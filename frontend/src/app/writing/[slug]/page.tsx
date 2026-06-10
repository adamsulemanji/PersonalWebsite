import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import type { Metadata } from 'next';
import { writing } from '@/assets/writing';
import { formatDate } from '@/lib/format';
import { metaLabel, sectionLabel } from '@/lib/styles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return writing.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = writing.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Adam Sulemanji`,
    description: post.description,
    // Override the site-wide canonical ('/') inherited from the root layout —
    // without this every post canonicalizes to the homepage.
    alternates: {
      canonical: `/writing/${slug}/`,
    },
  };
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className='font-semibold text-gray-900 dark:text-white'>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderBody(body: string) {
  const blocks = body.trim().split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').map((l) => l.replace(/^-\s+/, ''));
      return (
        <ul key={i} className='my-4 list-disc space-y-2 pl-6'>
          {items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className='my-4'>
        {renderInline(trimmed)}
      </p>
    );
  });
}

export default async function WritingPost({ params }: PageProps) {
  const { slug } = await params;
  const post = writing.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className='w-full px-6 pb-32 pt-16 sm:px-12 sm:pt-24 md:px-20'>
      <div className='mx-auto flex w-full max-w-2xl flex-col gap-10'>
        <Link
          href='/#section-writing'
          className={`inline-flex items-center gap-1.5 ${sectionLabel} transition-colors hover:text-gray-700 dark:hover:text-gray-300`}
        >
          <FiArrowLeft /> Back
        </Link>

        <header className='space-y-3'>
          <h1 className='font-serif text-3xl font-light leading-tight sm:text-4xl'>
            {post.title}
          </h1>
          <div className={`flex flex-wrap items-center gap-3 ${metaLabel}`}>
            <span>{formatDate(post.date, 'long')}</span>
            {post.readingTime && <span>· {post.readingTime}</span>}
          </div>
        </header>

        <article className='text-[15px] leading-7 text-gray-700 dark:text-gray-300'>
          {renderBody(post.body)}
        </article>
      </div>
    </div>
  );
}
