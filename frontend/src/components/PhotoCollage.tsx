'use client';

import { useState } from 'react';
import Image from 'next/image';

import { gallery, type PictureAsset } from '@/assets/images';
import { metaLabel, underlineLink } from '@/lib/styles';

const PER_ROW = 4;
const INITIAL_ROWS = 3;

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size)
    rows.push(items.slice(i, i + size));
  return rows;
}

function Tile({ picture }: { picture: PictureAsset }) {
  return (
    <figure className='group relative h-full min-w-0 flex-1 overflow-hidden rounded-xl transition-[flex-grow] duration-500 ease-out focus-within:flex-[2.6] hover:flex-[2.6] motion-reduce:transition-none'>
      <Image
        src={picture.src}
        alt={picture.alt}
        fill
        sizes='(max-width: 768px) 50vw, 420px'
        className='object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none'
      />
      <figcaption className='pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-xs text-white opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100'>
        {picture.alt}
      </figcaption>
      {/* Keyboard users get the same expand-on-focus behaviour as hover. */}
      <button
        type='button'
        className='absolute inset-0 rounded-xl outline-none ring-gray-400 focus-visible:ring-2'
        aria-label={picture.alt}
      />
    </figure>
  );
}

/** Hover-to-expand photo collage: each row is a flex strip whose hovered tile widens. */
export default function PhotoCollage() {
  const [expanded, setExpanded] = useState(false);
  const rows = chunk(gallery, PER_ROW);
  const visible = expanded ? rows : rows.slice(0, INITIAL_ROWS);

  return (
    <div className='mt-10'>
      <p className={`mb-4 ${metaLabel}`}>More moments</p>

      {/* Phones: simple two-column grid (no hover). */}
      <div className='grid grid-cols-2 gap-2 md:hidden'>
        {visible.flat().map((picture) => (
          <div
            key={picture.src}
            className='relative aspect-square overflow-hidden rounded-xl'
          >
            <Image
              src={picture.src}
              alt={picture.alt}
              fill
              sizes='50vw'
              className='object-cover'
            />
          </div>
        ))}
      </div>

      {/* Larger screens: expanding strips. */}
      <div className='hidden space-y-2 md:block'>
        {visible.map((row, i) => (
          <div key={i} className='flex h-52 gap-2 lg:h-60'>
            {row.map((picture) => (
              <Tile key={picture.src} picture={picture} />
            ))}
          </div>
        ))}
      </div>

      {rows.length > INITIAL_ROWS && (
        <button
          type='button'
          onClick={() => setExpanded((e) => !e)}
          className={`mt-4 text-sm text-gray-600 dark:text-gray-300 ${underlineLink}`}
          aria-expanded={expanded}
        >
          {expanded ? 'Show fewer' : `Show all ${gallery.length} photos`}
        </button>
      )}
    </div>
  );
}
