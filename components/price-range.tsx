'use client';

import { DollarSign } from 'lucide-react';

interface Props {
  range: '$' | '$$' | '$$$' | '$$$$' | string;
  size?: number;
  className?: string;
}

/**
 * Show price range as 1-4 dollar icons instead of $$$ text.
 */
export function PriceRange({ range, size = 14, className = '' }: Props) {
  const count = Math.min(range.length, 4);
  const total = 4;

  return (
    <div className={`inline-flex items-center gap-0 ${className}`} aria-label={`Price: ${range}`}>
      {Array.from({ length: total }).map((_, i) => (
        <DollarSign
          key={i}
          size={size}
          strokeWidth={2.5}
          className={i < count ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground/20'}
        />
      ))}
    </div>
  );
}
