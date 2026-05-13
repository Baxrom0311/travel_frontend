'use client';

import { useState, useRef, ReactNode } from 'react';
import Image from 'next/image';

interface Props {
  image: string;
  videoSrc?: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  /** Delay in ms before video starts */
  delay?: number;
}

/**
 * Card with image that plays video on hover (desktop).
 * Falls back to static image on mobile.
 */
export function VideoHoverCard({
  image,
  videoSrc,
  alt = '',
  children,
  className = '',
  delay = 400,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onEnter = () => {
    if (!videoSrc) return;
    timerRef.current = setTimeout(() => {
      setPlaying(true);
      videoRef.current?.play().catch(() => {
        // Autoplay might fail on some browsers
      });
    }, delay);
  };

  const onLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Image layer */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-cover transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />

      {/* Video layer */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {children}
    </div>
  );
}
