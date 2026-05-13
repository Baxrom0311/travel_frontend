'use client';

import { useState, useEffect, useCallback } from 'react';

export type StopType = 'attraction' | 'hotel' | 'restaurant' | 'tour' | 'event';

export interface TripStop {
  uid: string; // unique stop id (can have same place multiple times)
  type: StopType;
  id: number | string;
  name: string;
  image?: string | null;
  latitude: number;
  longitude: number;
  day: number; // 1, 2, 3 ...
  notes?: string;
  order: number;
}

const STORAGE_KEY = 'visitkhorezm_trip';

export function useTripPlanner() {
  const [stops, setStops] = useState<TripStop[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setStops(JSON.parse(stored));
    } catch {}
    setMounted(true);
  }, []);

  const save = useCallback((next: TripStop[]) => {
    setStops(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const add = useCallback(
    (stop: Omit<TripStop, 'uid' | 'order'>) => {
      const uid = `${stop.type}-${stop.id}-${Date.now()}`;
      const dayStops = stops.filter((s) => s.day === stop.day);
      const order = dayStops.length;
      save([...stops, { ...stop, uid, order }]);
    },
    [stops, save]
  );

  const remove = useCallback(
    (uid: string) => {
      save(stops.filter((s) => s.uid !== uid));
    },
    [stops, save]
  );

  const moveToDay = useCallback(
    (uid: string, newDay: number) => {
      save(
        stops.map((s) =>
          s.uid === uid ? { ...s, day: newDay, order: stops.filter((x) => x.day === newDay).length } : s
        )
      );
    },
    [stops, save]
  );

  const reorder = useCallback(
    (day: number, newOrder: string[]) => {
      save(
        stops.map((s) => {
          if (s.day !== day) return s;
          const idx = newOrder.indexOf(s.uid);
          return idx >= 0 ? { ...s, order: idx } : s;
        })
      );
    },
    [stops, save]
  );

  const updateNotes = useCallback(
    (uid: string, notes: string) => {
      save(stops.map((s) => (s.uid === uid ? { ...s, notes } : s)));
    },
    [stops, save]
  );

  const clear = useCallback(() => save([]), [save]);

  const has = useCallback(
    (type: StopType, id: number | string) => stops.some((s) => s.type === type && s.id === id),
    [stops]
  );

  const byDay = useCallback(
    (day: number) => stops.filter((s) => s.day === day).sort((a, b) => a.order - b.order),
    [stops]
  );

  const dayNumbers = Array.from(new Set(stops.map((s) => s.day))).sort((a, b) => a - b);
  const maxDay = dayNumbers.length > 0 ? Math.max(...dayNumbers) : 1;

  return {
    stops,
    count: stops.length,
    mounted,
    add,
    remove,
    moveToDay,
    reorder,
    updateNotes,
    clear,
    has,
    byDay,
    dayNumbers: dayNumbers.length > 0 ? dayNumbers : [1],
    maxDay,
  };
}
