'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  imagesLeft,
  imagesRight,
  type PictureAsset,
  type PictureCategory,
} from '@/assets/images';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { analyticsAttributes } from '@/lib/analytics';

type ImageType = PictureAsset & {
  aspectRatio?: number;
};

type PositionType = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const accentPills = ['#38bdf8', '#2dd4bf', '#fb923c', '#facc15'] as const;

const categoryPillClasses: Record<'All photos' | PictureCategory, string> = {
  'All photos':
    'border-white/15 bg-white/8 text-white hover:bg-white/12 dark:border-white/15 dark:bg-white/8 dark:text-white',
  'Personal archive': 'border-white/20 text-white',
  Trips: 'border-white/20 text-white',
  Friends: 'border-white/20 text-white',
};

const categoryAccentColors: Record<PictureCategory, string> = {
  'Personal archive': '#38bdf8',
  Trips: '#2dd4bf',
  Friends: '#fb923c',
};

const filterCategories: Array<'All photos' | PictureCategory> = [
  'All photos',
  'Personal archive',
  'Trips',
  'Friends',
];

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [imagePosition, setImagePosition] = useState<PositionType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    'All photos' | PictureCategory
  >('All photos');
  const [imagesWithRatio, setImagesWithRatio] = useState<{
    left: ImageType[];
    right: ImageType[];
  }>({
    left: imagesLeft,
    right: imagesRight,
  });

  // Function to preload images and calculate aspect ratios
  useEffect(() => {
    const loadImages = async () => {
      const getImageAspectRatio = (src: string): Promise<number> => {
        return new Promise((resolve) => {
          const imgElement = document.createElement('img');
          imgElement.onload = () => {
            resolve(imgElement.width / imgElement.height);
          };
          imgElement.src = src;
        });
      };

      // Process left column images
      const leftWithRatios = await Promise.all(
        imagesLeft.map(async (image) => ({
          ...image,
          aspectRatio: await getImageAspectRatio(image.src),
        }))
      );

      // Process right column images
      const rightWithRatios = await Promise.all(
        imagesRight.map(async (image) => ({
          ...image,
          aspectRatio: await getImageAspectRatio(image.src),
        }))
      );

      setImagesWithRatio({
        left: leftWithRatios,
        right: rightWithRatios,
      });
    };

    loadImages();
  }, []);

  const openModal = (image: ImageType, e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    setImagePosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setSelectedImage(null);
  };

  const filterImages = (images: ImageType[]) =>
    selectedCategory === 'All photos'
      ? images
      : images.filter((image) => image.category === selectedCategory);

  return (
    <section className='mx-auto w-full max-w-[1200px] px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16'>
      <div className='max-w-3xl'>
        <SectionHeader title='Pictures' />
        <h1 className='mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl'>
          Photographs and memories
          <span className='accent'>.</span>
        </h1>
        <p className='text-gray-600 dark:text-gray-300 mt-4 max-w-2xl text-[15px] leading-7 sm:text-base'>
          A small visual archive of places, people, and moments I want to keep
          around.
        </p>
        <div className='mt-6 flex flex-wrap gap-3'>
          {filterCategories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type='button'
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${categoryPillClasses[category]} ${isSelected ? 'ring-offset-transparent ring-2 ring-[color:var(--main)] ring-offset-2' : ''}`}
                style={
                  category === 'All photos'
                    ? undefined
                    : { backgroundColor: categoryAccentColors[category] }
                }
                {...analyticsAttributes('pictures_filter_clicked', {
                  label: category,
                  source: 'filter-bar',
                })}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className='mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10'>
      
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:col-span-2'>
          <ImageGrid
            images={filterImages(imagesWithRatio.left)}
            columnOffset={0}
            onOpen={openModal}
            onFilterByCategory={setSelectedCategory}
          />
          <ImageGrid
            images={filterImages(imagesWithRatio.right)}
            columnOffset={1}
            onOpen={openModal}
            onFilterByCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Image Modal with fluid animation */}
      <AnimatePresence>
        {selectedImage && imagePosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            onClick={closeModal}
          >
            <motion.div
              className='bg-black/90 absolute inset-0'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className='relative z-10 overflow-hidden'
              initial={{
                position: 'absolute',
                top: imagePosition.top,
                left: imagePosition.left,
                width: imagePosition.width,
                height: imagePosition.height,
                borderRadius: '0.5rem',
              }}
              animate={{
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                width: '90vw',
                height: '85vh',
                maxWidth: '1200px',
                borderRadius: '0.5rem',
              }}
              exit={{
                top: imagePosition.top,
                left: imagePosition.left,
                width: imagePosition.width,
                height: imagePosition.height,
                x: 0,
                y: 0,
                opacity: 0,
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 120,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='relative h-full w-full'>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className='object-contain'
                  sizes='100vw'
                  priority
                />
              </div>

              <motion.div
                className='absolute right-4 top-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={closeModal}
                  className='bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors'
                  {...analyticsAttributes('ui_clicked', {
                    label: 'picture-modal-close',
                    section: 'pictures-modal',
                  })}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18'></line>
                    <line x1='6' y1='6' x2='18' y2='18'></line>
                  </svg>
                </button>
              </motion.div>

              <motion.div
                className='bg-gradient-to-t from-black/70 to-transparent absolute bottom-0 left-0 right-0 p-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className='text-white text-xl font-medium'>
                  {selectedImage.alt}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface ImageGridProps {
  images: ImageType[];
  columnOffset: number;
  onOpen: (image: ImageType, e: React.MouseEvent<HTMLDivElement>) => void;
  onFilterByCategory: (category: PictureCategory) => void;
}

function ImageGrid({ images, columnOffset, onOpen, onFilterByCategory }: ImageGridProps) {
  return (
    <div className='flex flex-col gap-8'>
      {images.map((image, index) => {
        const aspectRatio = image.aspectRatio || 1.33;
        const paddingBottom = `${(1 / aspectRatio) * 100}%`;
        const pillClass = categoryPillClasses[image.category];
        const pillColor =
          categoryAccentColors[image.category] ??
          accentPills[(index + columnOffset) % accentPills.length];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className='border-gray-200 bg-white dark:border-white/15 dark:bg-neutral-800 group relative w-full cursor-pointer overflow-hidden rounded-3xl border p-3 shadow-sm sm:p-4'
            onClick={(e) => onOpen(image, e)}
            {...analyticsAttributes('picture_opened', {
              label: image.alt,
              src: image.src,
            })}
          >
            <div
              style={{ paddingBottom }}
              className='relative w-full overflow-hidden rounded-2xl'
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 50vw'
                priority={index < 2}
              />
              <div className='border-gray-200 dark:border-white/15 absolute inset-0 rounded-2xl border' />
              <div className='bg-gradient-to-t from-black/70 to-transparent absolute inset-0 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                <p className='text-white font-medium'>{image.alt}</p>
              </div>
            </div>
            <div className='mt-4 flex items-center justify-between gap-3'>
              <p className='text-gray-900 dark:text-white text-sm font-semibold leading-relaxed'>
                {image.alt}
              </p>
              <button
                type='button'
                onClick={(event) => {
                  event.stopPropagation();
                  onFilterByCategory(image.category);
                }}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${pillClass}`}
                style={{ backgroundColor: pillColor }}
                {...analyticsAttributes('pictures_filter_clicked', {
                  label: image.category,
                  source: 'picture-card',
                })}
              >
                {image.category}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
