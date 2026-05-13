/**
 * OSRM (Open Source Routing Machine) - free public routing API.
 * No API key required.
 */

import type { LatLng } from './geo';

export interface RouteResult {
  coordinates: [number, number][]; // [lat, lng] pairs for Leaflet
  distance_km: number;
  duration_min: number;
}

const OSRM_BASE = 'https://router.project-osrm.org/route/v1';

export async function getRoute(
  start: LatLng,
  end: LatLng,
  profile: 'driving' | 'walking' | 'cycling' = 'driving'
): Promise<RouteResult | null> {
  const coords = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`;
  const url = `${OSRM_BASE}/${profile}/${coords}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();

    if (!data.routes || data.routes.length === 0) return null;

    const route = data.routes[0];
    const coords2d: [number, number][] = route.geometry.coordinates.map(
      ([lng, lat]: [number, number]) => [lat, lng]
    );

    return {
      coordinates: coords2d,
      distance_km: route.distance / 1000,
      duration_min: route.duration / 60,
    };
  } catch (e) {
    console.error('[OSRM] route error:', e);
    return null;
  }
}
