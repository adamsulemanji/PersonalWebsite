export interface Book {
  title: string;
  author: string;
  img_url: string;
  book_thickness: number;
  goodreads_url: string;
}

export const books: Book[] = [
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
