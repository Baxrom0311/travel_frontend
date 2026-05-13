'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getBackendFavorites, toggleBackendFavorite } from '@/lib/auth-client';

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
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const syncedRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  // Sync with backend when user logs in
  useEffect(() => {
    if (!mounted || !isAuthenticated || syncedRef.current) return;

    (async () => {
      setSyncing(true);
      const backendFavs = await getBackendFavorites();
      
      // Merge: keep local favorites with metadata, add backend ones that exist locally
      const existingMap = new Map(favorites.map(f => [`${f.type}-${f.id}`, f]));
      const backendKeys = new Set(backendFavs.map(f => `${f.favorite_type}-${f.object_id}`));

      // Add local ones to backend if missing
      for (const fav of favorites) {
        const key = `${fav.type}-${fav.id}`;
        if (!backendKeys.has(key)) {
          await toggleBackendFavorite(fav.type, Number(fav.id));
        }
      }

      // Update local with what's on backend
      // Only include backend IDs that match our local metadata
      const merged: FavoriteItem[] = [];
      for (const fav of backendFavs) {
        const key = `${fav.favorite_type}-${fav.object_id}`;
        const existing = existingMap.get(key);
        if (existing) {
          merged.push(existing);
        }
      }
      // Keep local items not yet in backend response (race)
      for (const fav of favorites) {
        const key = `${fav.type}-${fav.id}`;
        if (!merged.find(m => `${m.type}-${m.id}` === key)) {
          merged.push(fav);
        }
      }

      setFavorites(merged);
      syncedRef.current = true;
      setSyncing(false);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch {}
    })();
  }, [mounted, isAuthenticated, user, favorites]);

  // Reset sync state when logged out
  useEffect(() => {
    if (!isAuthenticated) syncedRef.current = false;
  }, [isAuthenticated]);

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
    async (item: Omit<FavoriteItem, 'added_at'>) => {
      if (isFavorite(item.type, item.id)) return;
      save([...favorites, { ...item, added_at: Date.now() }]);
      // Sync to backend
      if (isAuthenticated) {
        await toggleBackendFavorite(item.type, Number(item.id));
      }
    },
    [favorites, isFavorite, save, isAuthenticated]
  );

  const remove = useCallback(
    async (type: FavoriteType, id: number | string) => {
      save(favorites.filter((f) => !(f.type === type && f.id === id)));
      if (isAuthenticated) {
        await toggleBackendFavorite(type, Number(id));
      }
    },
    [favorites, save, isAuthenticated]
  );

  const toggle = useCallback(
    async (item: Omit<FavoriteItem, 'added_at'>) => {
      if (isFavorite(item.type, item.id)) {
        await remove(item.type, item.id);
      } else {
        await add(item);
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
    syncing,
  };
}
