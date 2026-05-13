'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageSlideshowProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function ImageSlideshow({
  images,
  autoPlay = true,
  interval = 5000,
  className = '',
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return <div className={`bg-secondary rounded-lg ${className}`} />;
  }

  return (
    <div className={`relative overflow-hidden rounded-lg group ${className}`}>
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={goToPrevious}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/75 text-primary"
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={goToNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/75 text-primary"
          >
            <ChevronRight size={20} />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
