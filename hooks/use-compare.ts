'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'visitkhorezm_compare';
const MAX_ITEMS = 3;

export function useCompare() {
  const [items, setItems] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setMounted(true);
  }, []);

  const save = useCallback((next: number[]) => {
    setItems(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const add = useCallback(
    (id: number) => {
      if (items.includes(id)) return false;
      if (items.length >= MAX_ITEMS) return false;
      save([...items, id]);
      return true;
    },
    [items, save]
  );

  const remove = useCallback(
    (id: number) => {
      save(items.filter((i) => i !== id));
    },
    [items, save]
  );

  const toggle = useCallback(
    (id: number) => {
      if (items.includes(id)) {
        remove(id);
        return 'removed';
      }
      if (items.length >= MAX_ITEMS) return 'limit';
      add(id);
      return 'added';
    },
    [items, add, remove]
  );

  const has = useCallback(
    (id: number) => items.includes(id),
    [items]
  );

  const clear = useCallback(() => save([]), [save]);

  return {
    items,
    count: items.length,
    max: MAX_ITEMS,
    mounted,
    add,
    remove,
    toggle,
    has,
    clear,
  };
}
