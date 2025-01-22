'use client';

import RenderImage from '@/components/RenderImages';
import { imagesLeft, imagesRight } from '@/assets/images';

export default function Page() {
  return <div><section className='mt-16 w-full max-w-[1500px]'>
  <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2'>
    <div className='mt-10'>
      <p className='mb-5 text-5xl font-bold'>
        Fotographs and Friends
        <span className='accent font-serif text-6xl'>.</span>
      </p>
      <p className='leading-relaxed'>
        Here are a collection of photographs of that define me and
        my life.
      </p>
    </div>
    <div>
      <div className='staggered-dots h-[150px] w-full rounded-lg bg-[length:10px_10px]'></div>
    </div>
    <div className='flex flex-col gap-10'>
      {imagesLeft.map((image, index) => (
        <div key={index}>{RenderImage(image.src, image.alt)}</div>
      ))}
    </div>
    <div className='flex flex-col gap-10'>
      {imagesRight.map((image, index) => (
        <div key={index}>{RenderImage(image.src, image.alt)}</div>
      ))}
    </div>
  </div>
</section></div>;
}
