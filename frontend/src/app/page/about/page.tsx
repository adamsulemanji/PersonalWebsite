import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <p className='mt-4 text-3xl font-bold'>About</p>
      <p className='mt-4'>
        Software Engineer looking to make cool things to make the internet and
        the world just a little bit more fun.
      </p>
      <div className='mt-10 grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='flex justify-center'>
          <div className='w-fit text-center'>
            <Image
              src='/images/kid.jpg'
              alt='Picture of little me'
              width={500}
              height={500}
              className='rounded-xl'
            />
            <p className='text-xs mt-2'>
              *** This is me a few years ago (age 7), I look a little older now ***
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <p className='mt-2'>
            I'm a software engineer working at Amazon in Seattle, building
            software to connect people to international products.
          </p>
          <p className='mt-2'>
            In my free time, I love to go outdoors and play any sort of sport.
            Right now, my current fixation is skiing. Next ski season, I plan on
            leveraging the surrounding slopes in Seattle. During the rest of the
            year, I sign up for impromptu races in the area.
          </p>
          <p className='mt-2'>
            You can reach me on any of my socials. Follow me on Instagram,
            Strava, Letterboxd, or anything in between.
          </p>
        </div>
      </div>
    </div>
  );
}
