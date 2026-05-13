/**
 * Geo utilities - distance calculations, sorting, formatting.
 */

export interface LatLng {
  latitude: number;
  longitude: number;
}

const EARTH_RADIUS_KM = 6371;

/**
 * Haversine formula - distance between two points in km.
 */
export function haversineDistance(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLng = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/**
 * Sort items by distance from origin (ascending).
 */
export function sortByDistance<T extends LatLng>(items: T[], origin: LatLng): (T & { distance_km: number })[] {
  return items
    .map((item) => ({
      ...item,
      distance_km: haversineDistance(origin, item),
    }))
    .sort((a, b) => a.distance_km - b.distance_km);
}

/**
 * Format distance for display.
 */
export function formatDistance(km: number): string {
  if (km < 0.1) return '< 100 m';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

/**
 * Travel time estimate (walking speed ~5 km/h, driving ~40 km/h).
 */
export function estimateTravelTime(km: number, mode: 'walk' | 'drive' = 'drive'): string {
  const speed = mode === 'walk' ? 5 : 40;
  const hours = km / speed;
  const mins = Math.round(hours * 60);
  if (mins < 1) return '< 1 daq';
  if (mins < 60) return `${mins} daq`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}s ${m}daq`;
}
