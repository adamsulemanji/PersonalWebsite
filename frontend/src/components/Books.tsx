'use client';

import '../styles/book.css';
import Image from 'next/image';

interface Book {
  title: string;
  author: string;
  img_url: string;
  book_thickness: number;
  goodreads_url: string;
}

const books: Book[] = [
  {
    title: 'AI Rebooting',
    author: 'Gary Marcus and Ernest Davis',
    img_url:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555590930i/43999120.jpg',
    book_thickness: 12,
    goodreads_url: 'https://www.goodreads.com/book/show/43999120-ai-rebooting',
  },
  {
    title: 'A Tree Grows in Brooklyn',
    author: 'Betty Smith',
    img_url:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327883484i/14891.jpg',
    book_thickness: 20,
    goodreads_url:
      'https://www.goodreads.com/book/show/14891.A_Tree_Grows_in_Brooklyn',
  },
  {
    title: '1984',
    author: 'George Orwell',
    img_url:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg',
    book_thickness: 24,
    goodreads_url: 'https://www.goodreads.com/book/show/40961427-1984',
  },
];

export default function Books() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {books.map((book, index) => (
        <a
          href={book.goodreads_url}
          target='_blank'
          rel='noopener noreferrer'
          className='transition-background duration-[0.7s] bookPerspectiveContainer border-gray-200 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 block w-full cursor-pointer rounded-xl border p-8 sm:p-12 lg:p-14'
          key={index}
        >
          <div className='bookPerspective !my-0 flex h-full items-center justify-center gap-[0]'>
            <div className='bookMetaText absolute left-[-24px] right-[-24px] top-[-24px] !my-0 -translate-y-4 text-left opacity-0 transition-all duration-700 ease-in-out'>
              <h3 className='dark:text-gray-200 !my-0 !text-lg font-bold leading-[1.2]'>
                {book.title}
              </h3>
              <p className='dark:text-gray-200 !mb-0 !mt-1 !text-base'>
                {book.author}
              </p>
            </div>
            <div
              className='duration-[0.7s] before-top-0 bookThreeD before:border-x-gray-800 before:border-t-gray-200 before:bg-white after:border-gray-800 after:bg-gray-100 relative order-1 !my-0 w-full max-w-[120px] shrink-0 transition-transform ease-in-out before:absolute before:-right-[0] before:block before:h-[calc(100%+0.5px)] before:border-x-[3px] before:border-t-[3px] before:content-[""] after:absolute after:left-0 after:block after:w-[calc(100%+0.5px)] after:rounded-l-md after:border-y-[3px] after:border-l-[4px] after:content-[""] lg:w-1/2'
              style={{ '--book-height': `${book.book_thickness}px` } as any}
            >
              <Image
                src={book.img_url}
                alt={book.title}
                className='transition-radius rounded-[3px] duration-500 ease-in-out group-hover:rounded-l-lg group-hover:rounded-r-none'
                width={120}
                height={180}
              />
            </div>
            <div className='bookMetaText !text-blue-600 absolute bottom-[-24px] left-[-24px] right-[-24px] !my-0 block translate-y-4 text-sm font-bold opacity-0 transition-[opacity,transform] duration-700 ease-in-out'>
              <span className='decoration-blue-600 relative mr-1 inline-flex cursor-pointer items-center underline decoration-dotted decoration-2 underline-offset-[6px]'>
                View on Goodreads
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1em'
                  height='1em'
                  fill='currentColor'
                  viewBox='0 0 13 13'
                  className='fill-blue-600 ml-[6px] h-2 w-2'
                >
                  <path d='M13 1.05a1 1 0 0 0-1-1L4 0a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219L11 3.42V9a1 1 0 0 0 2 0V1.05Z'></path>
                </svg>
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
