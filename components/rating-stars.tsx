'use client';

import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 16,
  className = '',
}: RatingStarsProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < Math.floor(rating)
              ? 'fill-primary text-primary'
              : index < rating
                ? 'fill-primary/50 text-primary'
                : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );
}
