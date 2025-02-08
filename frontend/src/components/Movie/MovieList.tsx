'use client';

import { useEffect, useState } from 'react';
import './movie-item.css';
import axios from 'axios';

interface AlbumItemProps {
  title: string;
  letterboxd_url: string;
  poster_url: string;
}

function AlbumItem({ title, letterboxd_url, poster_url }: AlbumItemProps) {
  const discColorClass = `disc-color-${Math.floor(Math.random() * 7)}`;

  const diskStyles = ['disk-cd', 'disk-bluray'];
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
            ></div>
            <div className={`disk ${discColorClass} ${randomDiskStyle}`}>
              <div className='disk__inside'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 text-xs'>
        <p className='text-black-700 font-bold'>{title}</p>
      </div>
    </a>
  );
}

export default function AlbumList() {
  const [album_list, setAlbumList] = useState<AlbumItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post('https://api.fast.adamsulemanji.com/movies/search', {
        username: 'adamsulemanji',
      })
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
        <AlbumItem
          key={index}
          title={album.title}
          letterboxd_url={album.letterboxd_url}
          poster_url={album.poster_url}
        />
      ))}
    </div>
  );
}
