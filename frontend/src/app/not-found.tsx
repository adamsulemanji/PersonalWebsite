export default function NotFound() {
  return (
    <div className='mt-16 flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='mt-4 text-lg text-gray-700 dark:text-white'>
        The page you are looking for does not exist.
      </p>
      <p className='mt-4 text-lg text-gray-700 dark:text-white'>
        Please go home !
      </p>
      <button className='mt-8 rounded-md bg-black px-4 py-2 text-lg text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'>
        <a href='/'>Go Home</a>
      </button>
    </div>
  );
}
