'use client';

import { TileLayer } from 'react-leaflet';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Hardcoded CartoDB tiles:
 * - Light: Voyager (chiroyli neutral)
 * - Dark: Dark Matter
 * Doimo ishonchli ishlaydi.
 */
export function MapTileLayer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  const url = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

  return (
    <TileLayer
      key={isDark ? 'dark' : 'light'}
      url={url}
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      maxZoom={19}
      subdomains={['a', 'b', 'c', 'd']}
    />
  );
}
