export default function NotFound() {
  return (
    <div className='mt-16 flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='text-gray-700 dark:text-white mt-4 text-lg'>
        The page you are looking for does not exist. Does this work
      </p>
      <p className='text-gray-700 dark:text-white mt-4 text-lg'>
        Please go home !
      </p>
      <button className='bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 mt-8 rounded-md px-4 py-2 text-lg'>
        <a href='/'>Go Home</a>
      </button>
    </div>
  );
}
