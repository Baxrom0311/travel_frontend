'use client';

import { useState, useCallback } from 'react';

export interface Coords {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export type GeoStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unavailable' | 'timeout';

export function useGeolocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [status, setStatus] = useState<GeoStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const request = useCallback((options?: PositionOptions) => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setStatus('unavailable');
      setError('Geolocation is not supported by your browser');
      return;
    }

    setStatus('loading');
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setStatus('success');
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus('denied');
          setError("Joylashuv ruxsati rad etildi");
        } else if (err.code === err.TIMEOUT) {
          setStatus('timeout');
          setError("Joylashuv olish vaqti tugadi");
        } else {
          setStatus('unavailable');
          setError(err.message);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000, // 1 minute
        ...options,
      }
    );
  }, []);

  const reset = useCallback(() => {
    setCoords(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { coords, status, error, request, reset };
}
