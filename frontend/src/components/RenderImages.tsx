import { useInView } from 'react-intersection-observer';

const RenderImage = (src: string, alt: string) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="relative w-full h-full">
      <div className="absolute inset-0 bg-[length:10px_10px] rounded-lg staggered-dots" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
        className={`rounded-sm transition-transform duration-1000 ease-in-out
            ${inView ? 'translate-y-0' : 'translate-y-full'}`}
      />
    </div>
  );
};

export default RenderImage;
