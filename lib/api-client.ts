import {
  Hotel,
  Attraction,
  TransportRoute,
  ContactMessage,
  StatsData,
  PaginatedResponse,
  Language,
} from './types';

// Backend URL (.env.local da NEXT_PUBLIC_API_URL belgilang)
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Backend root (rasmlarning relative URL'lari uchun)
const API_ROOT = API_BASE_URL.replace(/\/api\/?$/, '');

/**
 * Backenddan kelgan rasm URL'ini to'liq URL'ga aylantiradi.
 * Agar URL allaqachon http:// yoki https:// bilan boshlangan bo'lsa,
 * uni o'zgarishsiz qaytaradi. Aks holda backend root'ni qo'shadi.
 */
export function getImageUrl(url?: string | null): string {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `${API_ROOT}${url}`;
  return `${API_ROOT}/${url}`;
}

// URL qurish helper'i (lang va boshqa query params bilan)
function buildUrl(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {}
): string {
  const url = new URL(`${API_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

// ============================================================
// HOTELS
// ============================================================

export interface HotelFilters {
  city?: 'urgench' | 'khiva';
  featured?: boolean;
  stars?: 3 | 4 | 5;
  search?: string;
  min_price?: number;
  max_price?: number;
  ordering?:
    | 'rating'
    | '-rating'
    | 'price_per_night'
    | '-price_per_night'
    | 'name'
    | 'stars';
  page?: number;
}

export async function getHotels(
  filters: HotelFilters = {},
  lang: Language = 'uz'
): Promise<Hotel[]> {
  try {
    const url = buildUrl('/hotels/', { ...filters, lang });
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Hotels fetch failed: ${response.status}`);
    const data: PaginatedResponse<Hotel> | Hotel[] = await response.json();
    // API paginated bo'lishi mumkin, yoki array
    if (Array.isArray(data)) return data;
    return data.results || [];
  } catch (error) {
    console.error('[v0] Error fetching hotels:', error);
    return [];
  }
}

export async function getHotelById(
  id: number,
  lang: Language = 'uz'
): Promise<Hotel | null> {
  try {
    const url = buildUrl(`/hotels/${id}/`, { lang });
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Hotel fetch failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('[v0] Error fetching hotel:', error);
    return null;
  }
}

export async function getHotelStats(): Promise<StatsData> {
  try {
    const url = buildUrl('/hotels/stats/');
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Stats fetch failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('[v0] Error fetching stats:', error);
    return {};
  }
}

// ============================================================
// ATTRACTIONS
// ============================================================

export async function getAttractions(
  featured?: boolean,
  lang: Language = 'uz'
): Promise<Attraction[]> {
  try {
    const url = buildUrl('/attractions/', { featured, lang });
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok)
      throw new Error(`Attractions fetch failed: ${response.status}`);
    const data: PaginatedResponse<Attraction> | Attraction[] =
      await response.json();
    if (Array.isArray(data)) return data;
    return data.results || [];
  } catch (error) {
    console.error('[v0] Error fetching attractions:', error);
    return [];
  }
}

// ============================================================
// TRANSPORT
// ============================================================

export async function getTransport(
  type?: 'taxi' | 'bus' | 'train',
  lang: Language = 'uz'
): Promise<TransportRoute[]> {
  try {
    const url = buildUrl('/transport/', { type, lang });
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok)
      throw new Error(`Transport fetch failed: ${response.status}`);
    const data: PaginatedResponse<TransportRoute> | TransportRoute[] =
      await response.json();
    if (Array.isArray(data)) return data;
    return data.results || [];
  } catch (error) {
    console.error('[v0] Error fetching transport:', error);
    return [];
  }
}

// ============================================================
// CONTACT
// ============================================================

export async function submitContact(data: ContactMessage): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error('[v0] Error submitting contact:', error);
    return false;
  }
}
