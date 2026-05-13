/**
 * Deep linking to external booking platforms.
 * No API key required - uses their search URLs.
 * Can add affiliate IDs later.
 */

export interface LocationQuery {
  name: string;
  latitude?: number;
  longitude?: number;
  city?: string;
}

const AFFILIATE = {
  booking: '', // 'aid=YOUR_ID' when registered at partners.booking.com
  airbnb: '',
  tripadvisor: '',
  expedia: '',
  hotels: '',
  skyscanner: '',
  kiwi: '',
};

export function bookingSearchUrl(q: LocationQuery): string {
  const params = new URLSearchParams({
    ss: q.name,
    ...(q.latitude && q.longitude ? { latitude: String(q.latitude), longitude: String(q.longitude) } : {}),
    lang: 'en-us',
    selected_currency: 'USD',
  });
  if (AFFILIATE.booking) params.set('aid', AFFILIATE.booking);
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

export function bookingHotelUrl(name: string): string {
  return bookingSearchUrl({ name });
}

export function airbnbSearchUrl(q: LocationQuery): string {
  // Airbnb uses location name in URL path
  const place = encodeURIComponent(q.name.replace(/\s+/g, '-'));
  return `https://www.airbnb.com/s/${place}/homes`;
}

export function tripAdvisorSearchUrl(q: LocationQuery): string {
  // TripAdvisor location search
  return `https://www.tripadvisor.com/Search?q=${encodeURIComponent(q.name)}`;
}

export function expediaSearchUrl(q: LocationQuery): string {
  return `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(q.name)}`;
}

export function hotelsComSearchUrl(q: LocationQuery): string {
  return `https://www.hotels.com/search.do?q-destination=${encodeURIComponent(q.name)}`;
}

// Flight search platforms
export function skyscannerFlightUrl(from: string, to = 'UGC'): string {
  // UGC = Urgench airport IATA code
  return `https://www.skyscanner.com/transport/flights/${from}/${to}/`;
}

export function kiwiFlightUrl(from: string, to = 'urgench-uzbekistan'): string {
  return `https://www.kiwi.com/en/search/tiles/${from}/${to}`;
}

// Wikipedia for destinations
export function wikipediaUrl(name: string): string {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(name.replace(/\s+/g, '_'))}`;
}

// Google Maps embed URL (with key-less mode)
export function googleMapsEmbedUrl(q: LocationQuery): string {
  const query = q.latitude && q.longitude
    ? `${q.latitude},${q.longitude}`
    : encodeURIComponent(q.name);
  return `https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
}

export function googleMapsDirectionsUrl(q: LocationQuery): string {
  const dest = q.latitude && q.longitude ? `${q.latitude},${q.longitude}` : q.name;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
}

export function googleMapsPlaceUrl(q: LocationQuery): string {
  if (q.latitude && q.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${q.latitude},${q.longitude}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q.name)}`;
}
