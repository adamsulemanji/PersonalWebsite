'use client';

import { useEffect, useState } from 'react';
import './movie-item.css';
import axios from 'axios';

interface AlbumItemProps {
  title: string;
  letterboxd_url: string;
  poster_url: string;
  rating?: string,
  director?: string[],
  review?: string,
}

const API_URL = 'https://api.fast.adamsulemanji.com/movies/search?username=adamsulemanji&limit=10';
const discColorClass = `disc-color-${Math.floor(Math.random() * 7)}`;
const diskStyles = ['disk-cd', 'disk-bluray'];

function MovieItem({ title, letterboxd_url, poster_url, rating, director, review }: AlbumItemProps) {
  const randomDiskStyle =
    diskStyles[Math.floor(Math.random() * diskStyles.length)];

  return (
    <a
      href={letterboxd_url}
      className='mb-6 h-full w-full cursor-pointer rounded-xl'
    >
      <div className='music-item group relative flex w-full items-center rounded-lg border border-gray-200 bg-neutral-100 px-16 py-24 dark:border-gray-700 dark:bg-gray-800'>
        <div className='album-container'>
          <div className='album-wrap'>
            <div
              className='album'
              style={{ backgroundImage: `url(${poster_url})` }}
            >
              {review && (
                <div className='review-overlay opacity-0 group-hover:opacity-100 bg-black bg-opacity-75 flex items-center justify-center w-full h-full'>
                  <p className='italic text-center text-white text-xs p-2 overflow-y-auto max-h-full'>"{review}"</p>
                </div>
              )}
            </div>
            <div className={`disk ${discColorClass} ${randomDiskStyle}`}>
              <div className='disk__inside'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 text-xs'>
        <p className='text-black-700 font-bold'>{title}</p>
        {rating && <p className='text-gray-700 dark:text-gray-200'>Rating: {rating}</p>}
        {director && director.length > 0 && (
          <p className='text-gray-700 dark:text-gray-200'>Directors: {director.join(', ')}</p>
        )}
      </div>
    </a>
  );
}

export default function MovieList() {
  const [album_list, setAlbumList] = useState<AlbumItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://api.fast.adamsulemanji.com/movies/search?username=adamsulemanji&limit=10')
      .then((response) => {
        setAlbumList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching album list:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {album_list.map((album, index) => (
        <MovieItem
          key={index}
          title={album.title}
          letterboxd_url={album.letterboxd_url}
          poster_url={album.poster_url}
          rating={album.rating}
          director={album.director}
          review={album.review}
        />
      ))}
    </div>
  );
}
