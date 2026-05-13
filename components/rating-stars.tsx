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
  const normalizedRating = Math.max(
    0,
    Math.min(maxRating, rating > maxRating ? (rating / 10) * maxRating : rating)
  );

  return (
    <div
      className={`flex gap-1 ${className}`}
      aria-label={`Rating ${rating.toFixed(1)}`}
    >
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < Math.floor(normalizedRating)
              ? 'fill-accent text-accent'
              : index < normalizedRating
                ? 'fill-accent/50 text-accent'
                : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );
}
