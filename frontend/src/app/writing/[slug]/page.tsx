import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import type { Metadata } from 'next';
import { writing } from '@/assets/writing';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return writing.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = writing.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Adam Sulemanji`,
    description: post.description,
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
          className='inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors'
        >
          <FiArrowLeft /> Back
        </Link>

        <header className='space-y-3'>
          <h1 className='font-serif text-3xl font-light leading-tight sm:text-4xl'>
            {post.title}
          </h1>
          <div className='flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500'>
            <span>{formatDate(post.date)}</span>
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
