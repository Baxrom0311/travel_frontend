'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt?: string;
}

interface Props {
  images: LightboxImage[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, open, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, index]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-button text-white hover:scale-110 transition-transform flex items-center justify-center z-10"
            aria-label="Close"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 glass-button px-3 py-1.5 rounded-full text-white text-sm font-medium">
            {index + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-button text-white hover:scale-110 transition-transform flex items-center justify-center z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
          )}

          {/* Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full max-w-6xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt || ''}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </motion.div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-button text-white hover:scale-110 transition-transform flex items-center justify-center z-10"
              aria-label="Next"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 glass-button rounded-full max-w-[90vw] overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                  className={`relative w-12 h-12 rounded-full overflow-hidden shrink-0 transition-all ${
                    i === index ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt="" fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
