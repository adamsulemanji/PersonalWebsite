'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { analyticsAttributes } from '@/lib/analytics';
import './movie-item.css';

interface MovieItemProps {
  title: string;
  letterboxd_url: string;
  poster_url: string;
  rating?: string;
  director?: string[];
  review?: string;
}

const API_URL =
  'https://api.fast.adamsulemanji.com/movies/search?username=adamsulemanji&limit=8';
const SKELETON_COUNT = 8;
const DISK_STYLES = ['disk-cd', 'disk-bluray'];
const DISC_COLOR_COUNT = 7;

// Deterministic hash so the disc styling stays stable across re-renders
// instead of reshuffling on every render (which Math.random() in render does).
function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function MovieItem({
  title,
  letterboxd_url,
  poster_url,
  rating,
  director,
  review,
}: MovieItemProps) {
  const { discColorClass, diskStyle } = useMemo(() => {
    const seed = hashString(letterboxd_url || title);
    return {
      discColorClass: `disc-color-${seed % DISC_COLOR_COUNT}`,
      diskStyle: DISK_STYLES[seed % DISK_STYLES.length],
    };
  }, [letterboxd_url, title]);

  return (
    <a
      href={letterboxd_url}
      target='_blank'
      rel='noopener noreferrer'
      className='relative z-0 mb-6 block h-full w-full cursor-pointer rounded-xl hover:z-10'
      {...analyticsAttributes('movie_clicked', { label: title })}
    >
      <div className='flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800 sm:hidden'>
        <Image
          src={poster_url}
          alt={`${title} poster`}
          width={96}
          height={128}
          className='h-32 w-24 shrink-0 rounded-md object-cover shadow-sm'
        />
        <div className='min-w-0 text-sm'>
          <p className='font-bold text-gray-900 dark:text-gray-100'>{title}</p>
          {rating && (
            <p className='mt-2 text-gray-700 dark:text-gray-200'>
              Rating: {rating}
            </p>
          )}
          {director && director.length > 0 && (
            <p className='mt-1 text-gray-700 dark:text-gray-200'>
              Directors: {director.join(', ')}
            </p>
          )}
          {review && (
            <p className='mt-2 line-clamp-4 text-xs italic text-gray-600 dark:text-gray-300'>
              &ldquo;{review}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className='music-item group relative hidden w-full items-center overflow-visible rounded-lg border border-gray-200 bg-gray-100 px-10 py-16 dark:border-gray-700 dark:bg-gray-800 sm:flex lg:px-16 lg:py-24'>
        <div className='album-container'>
          <div className='album-wrap'>
            <div
              className='album'
              style={{ backgroundImage: `url(${poster_url})` }}
            >
              {review && (
                <div className='review-overlay flex h-full w-full items-center justify-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100'>
                  <p className='max-h-full overflow-y-auto p-2 text-center text-xs italic text-white'>
                    &ldquo;{review}&rdquo;
                  </p>
                </div>
              )}
            </div>
            <div className={`disk ${discColorClass} ${diskStyle}`}>
              <div className='disk__inside'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 hidden text-xs sm:block'>
        <p className='font-bold text-gray-900 dark:text-gray-100'>{title}</p>
        {rating && (
          <p className='text-gray-700 dark:text-gray-200'>Rating: {rating}</p>
        )}
        {director && director.length > 0 && (
          <p className='text-gray-700 dark:text-gray-200'>
            Directors: {director.join(', ')}
          </p>
        )}
      </div>
    </a>
  );
}

const movieGridClass =
  'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

function MovieListSkeleton() {
  return (
    <div className={movieGridClass} aria-hidden>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className='animate-pulse'>
          {/* Mobile placeholder */}
          <div className='flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800 sm:hidden'>
            <div className='h-32 w-24 shrink-0 rounded-md bg-gray-200 dark:bg-gray-700' />
            <div className='flex-1 space-y-2 pt-1'>
              <div className='h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700' />
              <div className='h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700' />
            </div>
          </div>
          {/* Desktop placeholder */}
          <div className='hidden rounded-lg border border-gray-200 bg-gray-100 px-10 py-16 dark:border-gray-700 dark:bg-gray-800 sm:block lg:px-16 lg:py-24'>
            <div className='mx-auto aspect-[2/3] w-2/3 rounded-md bg-gray-200 dark:bg-gray-700' />
          </div>
          <div className='mt-4 hidden space-y-2 sm:block'>
            <div className='h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700' />
            <div className='h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MovieList() {
  const [movies, setMovies] = useState<MovieItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMovies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Error fetching movies:', err);
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <MovieListSkeleton />;
  }

  if (error) {
    return (
      <p className='text-sm text-gray-500 dark:text-gray-400'>
        Unable to load movies right now. Check back later.
      </p>
    );
  }

  if (movies.length === 0) {
    return (
      <p className='text-sm text-gray-500 dark:text-gray-400'>
        No recent watches to show.
      </p>
    );
  }

  return (
    <div className={movieGridClass}>
      {movies.map((movie) => (
        <MovieItem
          key={movie.letterboxd_url}
          title={movie.title}
          letterboxd_url={movie.letterboxd_url}
          poster_url={movie.poster_url}
          rating={movie.rating}
          director={movie.director}
          review={movie.review}
        />
      ))}
    </div>
  );
}
