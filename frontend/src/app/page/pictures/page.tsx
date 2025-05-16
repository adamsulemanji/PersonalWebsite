'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { imagesLeft, imagesRight } from '@/assets/images';
import { motion, AnimatePresence } from 'framer-motion';

type ImageType = {
  src: string;
  alt: string;
  aspectRatio?: number;
};

type PositionType = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [imagePosition, setImagePosition] = useState<PositionType | null>(null);
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

  const ImageGrid = ({ images }: { images: ImageType[] }) => (
    <div className="flex flex-col gap-8">
      {images.map((image, index) => {
        // Calculate height based on aspect ratio or use a default value
        const aspectRatio = image.aspectRatio || 1.33; // 4:3 as fallback
        const paddingBottom = `${(1 / aspectRatio) * 100}%`;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-lg shadow-md cursor-pointer group w-full overflow-hidden"
            onClick={(e) => openModal(image, e)}
          >
            <div style={{ paddingBottom }} className="relative w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.alt}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <section className="mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 relative inline-block">
            Photographs & Memories
            <span className="absolute -right-6 text-7xl font-serif text-blue-500">.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            A visual journey through the moments and people that have shaped my life and experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <ImageGrid images={imagesWithRatio.left} />
          <ImageGrid images={imagesWithRatio.right} />
        </div>
      </section>

      {/* Image Modal with fluid animation */}
      <AnimatePresence>
        {selectedImage && imagePosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              className="absolute inset-0 bg-black/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="relative z-10 overflow-hidden"
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
              <div className="w-full h-full relative">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={closeModal}
                  className="bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white text-xl font-medium">{selectedImage.alt}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
