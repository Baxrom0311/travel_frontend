'use client';

import { TileLayer } from 'react-leaflet';
import { useTheme } from 'next-themes';
import { useSettings } from '@/lib/settings-context';
import { useEffect, useState } from 'react';

/**
 * Dynamic tile layer that:
 * - Reads provider from SiteSettings (admin-controlled)
 * - Switches between light/dark based on theme
 * - SSR-safe (only renders on client)
 * - Auto-fallback to OSM if tile fails
 */
export function MapTileLayer() {
  const { settings } = useSettings();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => setMounted(true), []);

  // During SSR / first render, use default (light) map
  const mapConfig = mounted && resolvedTheme === 'dark'
    ? settings.map_dark
    : settings.map;

  // Auto-fallback if too many tile errors (>5)
  const useFallback = errorCount > 5;
  const finalUrl = useFallback
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
    : mapConfig.url;
  const finalAttribution = useFallback
    ? '&copy; OpenStreetMap &copy; CARTO (fallback)'
    : mapConfig.attribution;

  return (
    <TileLayer
      key={`${mapConfig.key}-${useFallback ? 'fb' : 'main'}`}
      url={finalUrl}
      attribution={finalAttribution}
      maxZoom={mapConfig.max_zoom || 19}
      eventHandlers={{
        tileerror: () => setErrorCount((c) => c + 1),
      }}
    />
  );
}
