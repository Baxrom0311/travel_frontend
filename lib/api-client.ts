import {
  Hotel, Attraction, TransportRoute, ContactMessage, ContactResponse,
  HomeSummary, HotelOptions, PaginatedResponse, Language, CityEnum,
  Event, News, SearchResults, Restaurant, RestaurantOptions,
  Tour, Review, ReviewsResponse, ReviewTargetType,
} from './types';

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
).replace(/\/+$/, '');
const API_ROOT = API_BASE_URL.replace(/\/api$/, '');

export function getImageUrl(url?: string | null): string {
  if (!url) return '/images/khiva-main.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `${API_ROOT}${url}`;
  return `${API_ROOT}/${url}`;
}

function buildUrl(path: string, params: Record<string, any> = {}): string {
  const url = new URL(`${API_BASE_URL}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

async function getJson<T>(path: string, params: Record<string, any> = {}): Promise<T> {
  const res = await fetch(buildUrl(path, params), { cache: 'no-store' });
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  return res.json();
}

async function safeGet<T>(path: string, params: Record<string, any> = {}, fallback: T): Promise<T> {
  try {
    return await getJson<T>(path, params);
  } catch (e) {
    console.error(`[API] ${path} error:`, e);
    return fallback;
  }
}

async function postJson<T>(path: string, data: any): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ============ HOME ============
export async function getHomeSummary(lang: Language = 'uz'): Promise<HomeSummary | null> {
  return safeGet<HomeSummary | null>('/home/', { lang }, null);
}

// ============ HOTELS ============
export interface HotelFilters {
  city?: CityEnum;
  featured?: boolean;
  stars?: number;
  search?: string;
  amenity?: number;
  min_price?: number;
  max_price?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export async function getHotels(filters: HotelFilters = {}, lang: Language = 'uz'): Promise<Hotel[]> {
  const data = await safeGet<PaginatedResponse<Hotel> | Hotel[]>('/hotels/', { ...filters, lang }, []);
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<Hotel>).results || [];
}

export async function getHotelById(id: number, lang: Language = 'uz'): Promise<Hotel | null> {
  return safeGet<Hotel | null>(`/hotels/${id}/`, { lang }, null);
}

export async function getRelatedHotels(id: number, lang: Language = 'uz'): Promise<Hotel[]> {
  const res = await safeGet<{ data: Hotel[] }>(`/hotels/${id}/related/`, { lang }, { data: [] });
  return res.data || [];
}

export async function getHotelOptions(lang: Language = 'uz'): Promise<HotelOptions | null> {
  return safeGet<HotelOptions | null>('/hotels/options/', { lang }, null);
}

// ============ ATTRACTIONS ============
export async function getAttractions(featured?: boolean, lang: Language = 'uz'): Promise<Attraction[]> {
  const data = await safeGet<PaginatedResponse<Attraction> | Attraction[]>('/attractions/', { featured, lang }, []);
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<Attraction>).results || [];
}

export async function getAttractionById(id: number, lang: Language = 'uz'): Promise<Attraction | null> {
  return safeGet<Attraction | null>(`/attractions/${id}/`, { lang }, null);
}

export async function getRelatedAttractions(id: number, lang: Language = 'uz'): Promise<Attraction[]> {
  const res = await safeGet<{ data: Attraction[] }>(`/attractions/${id}/related/`, { lang }, { data: [] });
  return res.data || [];
}

// ============ TRANSPORT ============
export async function getTransport(type?: string, lang: Language = 'uz'): Promise<TransportRoute[]> {
  const data = await safeGet<PaginatedResponse<TransportRoute> | TransportRoute[]>('/transport/', { type, lang }, []);
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<TransportRoute>).results || [];
}

// ============ EVENTS ============
export async function getEvents(filters: { featured?: boolean; upcoming?: boolean; search?: string } = {}, lang: Language = 'uz'): Promise<Event[]> {
  const data = await safeGet<PaginatedResponse<Event> | Event[]>('/events/', { ...filters, lang }, []);
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<Event>).results || [];
}

export async function getEventById(id: number, lang: Language = 'uz'): Promise<Event | null> {
  return safeGet<Event | null>(`/events/${id}/`, { lang }, null);
}

// ============ NEWS ============
export async function getNews(filters: { featured?: boolean; search?: string } = {}, lang: Language = 'uz'): Promise<News[]> {
  const data = await safeGet<PaginatedResponse<News> | News[]>('/news/', { ...filters, lang }, []);
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<News>).results || [];
}

export async function getNewsBySlug(slug: string, lang: Language = 'uz'): Promise<News | null> {
  return safeGet<News | null>(`/news/${slug}/`, { lang }, null);
}

// ============ RESTAURANTS ============
export interface RestaurantFilters {
  city?: CityEnum;
  featured?: boolean;
  cuisine?: number;
  price_range?: string;
  search?: string;
  halal?: boolean;
  vegetarian?: boolean;
}

export async function getRestaurants(filters: RestaurantFilters = {}, lang: Language = 'uz'): Promise<Restaurant[]> {
  const data = await safeGet<PaginatedResponse<Restaurant> | Restaurant[]>('/restaurants/', { ...filters, lang }, []);
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<Restaurant>).results || [];
}

export async function getRestaurantById(id: number, lang: Language = 'uz'): Promise<Restaurant | null> {
  return safeGet<Restaurant | null>(`/restaurants/${id}/`, { lang }, null);
}

export async function getRestaurantOptions(lang: Language = 'uz'): Promise<RestaurantOptions | null> {
  return safeGet<RestaurantOptions | null>('/restaurants/options/', { lang }, null);
}

// ============ TOURS ============
export async function getTours(filters: { featured?: boolean; search?: string; difficulty?: string } = {}, lang: Language = 'uz'): Promise<Tour[]> {
  const data = await safeGet<PaginatedResponse<Tour> | Tour[]>('/tours/', { ...filters, lang }, []);
  if (Array.isArray(data)) return data;
  return (data as PaginatedResponse<Tour>).results || [];
}

export async function getTourBySlug(slug: string, lang: Language = 'uz'): Promise<Tour | null> {
  return safeGet<Tour | null>(`/tours/${slug}/`, { lang }, null);
}

// ============ REVIEWS ============
export async function getReviews(targetType: ReviewTargetType, targetId: number): Promise<ReviewsResponse | null> {
  return safeGet<ReviewsResponse | null>(`/reviews/${targetType}/${targetId}/`, {}, null);
}

export async function submitReview(data: {
  name: string;
  email: string;
  country?: string;
  rating: number;
  title?: string;
  comment: string;
  target_type: ReviewTargetType;
  target_id: number;
}): Promise<{ success: boolean; message?: string; errors?: any }> {
  try {
    return await postJson('/reviews/', data);
  } catch (e) {
    return { success: false };
  }
}

// ============ NEWSLETTER ============
export async function subscribeNewsletter(email: string, language: Language = 'uz'): Promise<{ success: boolean; message?: string }> {
  try {
    return await postJson('/newsletter/subscribe/', { email, language });
  } catch (e) {
    return { success: false };
  }
}

// ============ SEARCH ============
export async function globalSearch(q: string, lang: Language = 'uz'): Promise<SearchResults | null> {
  if (q.length < 2) return null;
  return safeGet<SearchResults | null>('/search/', { q, lang }, null);
}

// ============ CONTACT ============
export async function submitContact(data: ContactMessage): Promise<ContactResponse> {
  try {
    const res = await postJson<ContactResponse>('/contact/', data);
    return res;
  } catch (e) {
    return { success: false };
  }
}
