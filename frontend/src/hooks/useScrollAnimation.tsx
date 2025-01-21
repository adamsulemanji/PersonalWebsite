import { useState, useEffect, useRef, RefObject } from 'react';

export default function useScrollAnimation(): [
  RefObject<HTMLElement>,
  boolean,
] {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  useEffect(() => {
    // If already viewed, keep it visible
    if (hasBeenViewed) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenViewed(true);
          // Once viewed, no need to keep observing
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasBeenViewed]);

  return [elementRef, isVisible];
}
