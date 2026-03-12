'use client';

import { useEffect, useState } from 'react';
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
  'https://api.fast.adamsulemanji.com/movies/search?username=adamsulemanji&limit=10';
const DISK_STYLES = ['disk-cd', 'disk-bluray'];
const DISC_COLOR_COUNT = 7;

function MovieItem({
  title,
  letterboxd_url,
  poster_url,
  rating,
  director,
  review,
}: MovieItemProps) {
  const discColorClass = `disc-color-${Math.floor(Math.random() * DISC_COLOR_COUNT)}`;
  const diskStyle = DISK_STYLES[Math.floor(Math.random() * DISK_STYLES.length)];

  return (
    <a
      href={letterboxd_url}
      className='mb-6 block h-full w-full cursor-pointer rounded-xl'
    >
      <div className='border-gray-200 bg-neutral-100 dark:border-gray-700 dark:bg-neutral-800 flex items-start gap-4 rounded-lg border p-4 sm:hidden'>
        <img
          src={poster_url}
          alt={title}
          className='h-32 w-24 shrink-0 rounded-md object-cover shadow-sm'
        />
        <div className='min-w-0 text-sm'>
          <p className='text-gray-900 dark:text-gray-100 font-bold'>{title}</p>
          {rating && (
            <p className='text-gray-700 dark:text-gray-200 mt-2'>
              Rating: {rating}
            </p>
          )}
          {director && director.length > 0 && (
            <p className='text-gray-700 dark:text-gray-200 mt-1'>
              Directors: {director.join(', ')}
            </p>
          )}
          {review && (
            <p className='text-gray-600 dark:text-gray-300 mt-2 line-clamp-4 text-xs italic'>
              "{review}"
            </p>
          )}
        </div>
      </div>

      <div className='music-item border-gray-200 bg-neutral-100 dark:border-gray-700 dark:bg-neutral-800 group relative hidden w-full items-center rounded-lg border px-10 py-16 sm:flex lg:px-16 lg:py-24'>
        <div className='album-container'>
          <div className='album-wrap'>
            <div
              className='album'
              style={{ backgroundImage: `url(${poster_url})` }}
            >
              {review && (
                <div className='review-overlay bg-black flex h-full w-full items-center justify-center bg-opacity-75 opacity-0 group-hover:opacity-100'>
                  <p className='text-white max-h-full overflow-y-auto p-2 text-center text-xs italic'>
                    "{review}"
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
        <p className='text-gray-900 dark:text-gray-100 font-bold'>{title}</p>
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

export default function MovieList() {
  const [movies, setMovies] = useState<MovieItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {movies.map((movie, index) => (
        <MovieItem
          key={index}
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
