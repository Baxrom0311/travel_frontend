'use client';

import { useState, useEffect, useCallback } from 'react';

export type FavoriteType = 'hotel' | 'attraction' | 'restaurant' | 'tour' | 'event';

export interface FavoriteItem {
  type: FavoriteType;
  id: number | string;
  name: string;
  image?: string;
  href: string;
  added_at: number;
}

const STORAGE_KEY = 'visitkhorezm_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const save = useCallback((items: FavoriteItem[]) => {
    setFavorites(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, []);

  const isFavorite = useCallback(
    (type: FavoriteType, id: number | string): boolean => {
      return favorites.some((f) => f.type === type && f.id === id);
    },
    [favorites]
  );

  const add = useCallback(
    (item: Omit<FavoriteItem, 'added_at'>) => {
      if (isFavorite(item.type, item.id)) return;
      save([...favorites, { ...item, added_at: Date.now() }]);
    },
    [favorites, isFavorite, save]
  );

  const remove = useCallback(
    (type: FavoriteType, id: number | string) => {
      save(favorites.filter((f) => !(f.type === type && f.id === id)));
    },
    [favorites, save]
  );

  const toggle = useCallback(
    (item: Omit<FavoriteItem, 'added_at'>) => {
      if (isFavorite(item.type, item.id)) {
        remove(item.type, item.id);
      } else {
        add(item);
      }
    },
    [isFavorite, add, remove]
  );

  const clear = useCallback(() => {
    save([]);
  }, [save]);

  return {
    favorites,
    count: favorites.length,
    isFavorite,
    add,
    remove,
    toggle,
    clear,
    mounted,
  };
}
