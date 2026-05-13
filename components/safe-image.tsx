'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface Props extends Omit<ImageProps, 'onError'> {
  fallback?: string;
}

/**
 * Image with automatic fallback if source fails to load.
 */
export function SafeImage({ src, fallback = '/images/khiva-main.jpg', alt, ...rest }: Props) {
  const [error, setError] = useState(false);
  const finalSrc = error || !src ? fallback : src;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      onError={() => setError(true)}
      {...rest}
    />
  );
}
