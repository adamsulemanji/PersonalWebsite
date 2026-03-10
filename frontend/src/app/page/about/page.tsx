import Image from 'next/image';

const highlights = [
  { label: 'Based in', value: 'Seattle, WA' },
  { label: 'Current role', value: 'Software Engineer at Amazon' },
  { label: 'Outside of work', value: 'Skiing, sports, and being outdoors' },
];

export default function Page() {
  return (
    <section className='mx-auto w-full max-w-[1200px] px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16'>
      <div className='max-w-3xl'>
        <p className='underline-offset-3 decoration-gray-300 group relative inline-block text-xl font-bold underline'>
          About
          <span className='bg-current absolute bottom-0 left-0 mt-1 block h-[2px] w-0 transition-all duration-300 group-hover:w-full'></span>
        </p>
        <h1 className='mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl'>
          A little more about me
          <span className='accent'>.</span>
        </h1>
        <p className='text-gray-600 dark:text-gray-300 mt-4 max-w-2xl text-base leading-relaxed'>
          I like building useful things, keeping the work practical, and making
          the internet a little more fun than I found it.
        </p>
      </div>

      <div className='mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10'>
        <div className='border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-950 overflow-hidden rounded-3xl border p-4 shadow-sm sm:p-6'>
          <div className='relative aspect-[4/5] overflow-hidden rounded-2xl'>
            <Image
              src='/images/kid.jpg'
              alt='Picture of little me'
              fill
              sizes='(max-width: 1024px) 100vw, 40vw'
              className='object-cover'
            />
          </div>
          <p className='text-gray-500 dark:text-gray-400 mt-4 text-sm leading-relaxed'>
            This is me a few years ago, around age 7. I look a little older now.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-950 rounded-3xl border p-5 shadow-sm sm:p-6 lg:p-8'>
            <div className='text-gray-700 dark:text-gray-300 space-y-5 text-base leading-relaxed'>
              <p>
                I&apos;m a software engineer at Amazon in Seattle, building
                software that helps connect people to international products.
              </p>
              <p>
                Outside of work, I spend a lot of time outdoors and I&apos;ll
                play almost any sport. Right now skiing is the main obsession,
                and I&apos;ve been trying to make the most of being close to the
                mountains.
              </p>
              <p>
                During the rest of the year, I sign up for impromptu races, keep
                building side projects, and stay in touch with friends through
                whatever app, group chat, or hobby is current.
              </p>
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-3'>
            {highlights.map((item) => (
              <div
                key={item.label}
                className='border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-950 rounded-2xl border p-4 shadow-sm'
              >
                <p className='text-gray-500 dark:text-gray-400 text-xs uppercase tracking-[0.25em]'>
                  {item.label}
                </p>
                <p className='text-gray-900 dark:text-gray-100 mt-3 text-sm font-semibold leading-relaxed'>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className='border-[color:var(--main)]/60 rounded-3xl border border-dashed p-5 sm:p-6'>
            <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
              You can reach me through any of the links in the nav or footer.
              Instagram, Strava, Letterboxd, or anything in between all work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
