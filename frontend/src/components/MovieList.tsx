'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { analyticsAttributes } from '@/lib/analytics';
import '../styles/movie.css';

export interface Movie {
  title: string;
  letterboxd_url: string;
  poster_url: string;
  rating?: string;
  director?: string[];
  review?: string;
}

const DISK_STYLES = ['disk-cd', 'disk-bluray'];
const DISC_COLOR_COUNT = 7;
const SKELETON_COUNT = 8;
const API_URL =
  'https://api.fast.adamsulemanji.com/movies/search?username=adamsulemanji&limit=8';

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
}: Movie) {
  const seed = hashString(letterboxd_url || title);
  const discColorClass = `disc-color-${seed % DISC_COLOR_COUNT}`;
  const diskStyle = DISK_STYLES[seed % DISK_STYLES.length];

  return (
    <a
      href={letterboxd_url}
      target='_blank'
      rel='noopener noreferrer'
      className='movie-card relative z-0 mb-6 block h-full w-full cursor-pointer rounded-xl hover:z-10'
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
    <div className={movieGridClass} aria-label='Loading recent movies'>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div
          key={index}
          className='h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800 sm:h-72'
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok)
          throw new Error(`Movie API returned ${response.status}`);

        const data: unknown = await response.json();
        setMovies(Array.isArray(data) ? (data as Movie[]) : []);
        setStatus('ready');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setStatus('error');
      }
    }

    void loadMovies();
    return () => controller.abort();
  }, []);

  if (status === 'loading') return <MovieListSkeleton />;

  if (status === 'error') {
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
