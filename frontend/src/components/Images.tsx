import React, { useRef, FC } from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';

interface CustomButtonGroupProps {
  next?: () => void;
  previous?: () => void;
  goToSlide?: (slide: number) => void;
  carouselState?: any;
}

const CustomButtonGroup: FC<CustomButtonGroupProps> = ({
  next,
  previous,
  carouselState,
}) => {
  const { currentSlide } = carouselState || {};

  return (
    <div className='justify-right mt-8 flex justify-end text-center'>
      <button
        onClick={previous}
        className='mr-2 rounded-full bg-gray-200 p-2 text-white transition-colors duration-300 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-500'
      >
        <FaArrowLeftLong className='text-gray-700 dark:text-white hover:text-white' />
      </button>
      <button
        onClick={next}
        className='rounded-full bg-gray-200 p-2 text-white transition-colors duration-300 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-500'
      >
        <FaArrowRightLong className='text-gray-700 dark:text-white hover:text-white' />
      </button>
    </div>
  );
};

const images = [
  '/images/basketball.jpg',
  '/images/ringday.jpg',
  '/images/skiing.jpg',
  '/images/street.jpeg',
  '/images/basketball.jpg',
  '/images/ringday.jpg',
  '/images/skiing.jpg',
  '/images/street.jpeg',
  '/images/basketball.jpg',
  '/images/ringday.jpg',
  '/images/skiing.jpg',
  '/images/street.jpeg',
  '/images/basketball.jpg',
  '/images/ringday.jpg',
  '/images/skiing.jpg',
  '/images/street.jpeg',
  '/images/basketball.jpg',
  '/images/ringday.jpg',
  '/images/skiing.jpg',
  '/images/street.jpeg',
  '/images/basketball.jpg',
  '/images/ringday.jpg',
  '/images/skiing.jpg',
  '/images/street.jpeg',
  '/images/basketball.jpg',
  '/images/ringday.jpg',
  '/images/skiing.jpg',
  '/images/street.jpeg',
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ImagesCarousel: FC = () => {
  return (
    <div className='mx-auto max-w-5xl'>
      <Carousel
        responsive={responsive}
        ssr
        infinite={false}
        swipeable={false}
        draggable={false}
        keyBoardControl
        transitionDuration={500}
        arrows={false}
        renderButtonGroupOutside
        customButtonGroup={<CustomButtonGroup />}
        containerClass='relative'
        itemClass='px-4'
      >
        {images.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`Image-${index}`}
              width={1000}
              height={500}
              className='h-auto w-full object-cover'
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagesCarousel;
