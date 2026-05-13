'use client';

import { Heart } from 'lucide-react';
import { useFavorites, FavoriteType } from '@/hooks/use-favorites';

interface Props {
  type: FavoriteType;
  id: number | string;
  name: string;
  image?: string;
  href: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'glass';
  className?: string;
}

export function FavoriteButton({
  type, id, name, image, href,
  size = 'md',
  variant = 'default',
  className = '',
}: Props) {
  const { isFavorite, toggle, mounted } = useFavorites();

  if (!mounted) return null;

  const active = isFavorite(type, id);
  const sizes = { sm: 14, md: 18, lg: 22 };
  const paddings = { sm: 'p-1.5', md: 'p-2', lg: 'p-2.5' };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle({ type, id, name, image, href });
      }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      className={`${paddings[size]} rounded-full transition-all ${
        variant === 'glass'
          ? 'glass-button hover:scale-110'
          : active
            ? 'bg-red-500 text-white'
            : 'bg-white/90 backdrop-blur-sm text-muted-foreground hover:text-red-500 shadow-md'
      } ${className}`}
    >
      <Heart
        size={sizes[size]}
        className={active ? 'fill-current' : ''}
      />
    </button>
  );
}
