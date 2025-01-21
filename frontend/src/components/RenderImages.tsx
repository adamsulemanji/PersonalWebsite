import { useInView } from 'react-intersection-observer';

const RenderImage = (src: string, alt: string) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className='relative h-full w-full'>
      <div className='staggered-dots absolute inset-0 rounded-lg bg-[length:10px_10px]' />
      <img
        src={src}
        alt={alt}
        loading='lazy'
        onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
        className={`rounded-sm transition-transform duration-1000 ease-in-out ${inView ? 'translate-y-0' : 'translate-y-full'}`}
      />
    </div>
  );
};

export default RenderImage;
