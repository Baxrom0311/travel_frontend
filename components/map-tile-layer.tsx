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
 */
export function MapTileLayer() {
  const { settings } = useSettings();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // During SSR / first render, use default (light) map
  const mapConfig = mounted && resolvedTheme === 'dark'
    ? settings.map_dark
    : settings.map;

  return (
    <TileLayer
      key={mapConfig.key}
      url={mapConfig.url}
      attribution={mapConfig.attribution}
      maxZoom={mapConfig.max_zoom || 19}
    />
  );
}
