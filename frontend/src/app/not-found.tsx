export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-white">
        The page you are looking for does not exist.
      </p>
      <p className="mt-4 text-lg text-gray-700 dark:text-white">
        Please go home !
      </p>
      <button className="mt-8 px-4 py-2 text-lg dark:text-black text-white bg-black rounded-md hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200">
        <a href="/">Go Home</a>
      </button>
    </div>
  );
}
