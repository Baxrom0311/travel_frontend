// API schema-ga mos turlar (OpenAPI spec'dan)

export type Language = 'uz' | 'en' | 'ru';

export type CityEnum = 'urgench' | 'khiva';

export type TransportTypeEnum = 'taxi' | 'bus' | 'train';

// Amenity (qulayliklar)
export interface Amenity {
  id: number;
  icon: string;
  name: string;
  name_uz: string;
  name_en: string;
  name_ru: string;
}

// Hotel rasm
export interface HotelImage {
  id: number;
  image_url: string;
  is_cover?: boolean;
  order?: number;
}

// Hotel (ro'yxat va detail uchun)
export interface Hotel {
  id: number;
  name: string;
  name_uz: string;
  name_en?: string;
  name_ru?: string;
  city: CityEnum;
  city_label: string;
  stars: number;
  stars_label: string;
  rating: number;
  price_per_night: number;
  address: string;
  address_en?: string;
  address_ru?: string;
  address_i18n: string;
  latitude: number;
  longitude: number;
  google_maps_url?: string;
  description: string;
  description_uz: string;
  description_en?: string;
  description_ru?: string;
  cover_image: string;
  images: HotelImage[];
  amenities: Amenity[];
  is_featured?: boolean;
}

// Attraction (diqqatga sazovor joy)
export interface Attraction {
  id: number;
  icon: string;
  name: string;
  name_uz: string;
  name_en?: string;
  name_ru?: string;
  description: string;
  description_uz: string;
  description_en?: string;
  description_ru?: string;
  latitude: number;
  longitude: number;
  is_featured?: boolean;
  order?: number;
  // Optional image from backend if available
  image_url?: string;
  cover_image?: string;
}

// Transport yo'nalishi
export interface TransportRoute {
  id: number;
  transport_type: TransportTypeEnum;
  type_label: string;
  icon: string;
  from_location: string;
  from_location_uz: string;
  from_location_en?: string;
  from_location_ru?: string;
  to_location: string;
  to_location_uz: string;
  to_location_en?: string;
  to_location_ru?: string;
  badge: string;
  badge_uz?: string;
  badge_en?: string;
  badge_ru?: string;
  description: string;
  description_uz: string;
  description_en?: string;
  description_ru?: string;
  duration_min: number;
  duration_max: number;
  duration_label: string;
  price_min: number;
  price_max: number;
  price_label: string;
  badge_style?: string;
  order?: number;
}

// Contact form
export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Statistics (homepage uchun)
export interface StatsData {
  hotels?: number;
  attractions?: number;
  visitors?: number;
  guides?: number;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Translation object type
export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}
