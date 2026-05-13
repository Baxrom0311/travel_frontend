// Backend API schema bilan sinxron

export type Language = 'uz' | 'en' | 'ru';
export type CityEnum = 'urgench' | 'khiva';
export type TransportTypeEnum = 'taxi' | 'bus' | 'train';
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type DurationType = 'hours' | 'days';

export interface OptionItem<T extends string | number = string> {
  value: T;
  label: string;
}

// ============ AMENITY ============
export interface Amenity {
  id: number;
  icon: string;
  name: string;
  name_uz: string;
  name_en: string;
  name_ru: string;
}

// ============ HOTEL ============
export interface HotelImage {
  id: number;
  image_url: string;
  is_cover: boolean;
  order: number;
}

export interface Hotel {
  id: number;
  name: string;
  name_en: string;
  name_ru: string;
  city: CityEnum;
  city_label: string;
  stars: number;
  stars_label: string;
  rating: number;
  price_per_night: number;
  address_i18n: string;
  address: string;
  address_en: string;
  address_ru: string;
  latitude: number;
  longitude: number;
  description: string;
  description_uz: string;
  description_en?: string;
  description_ru?: string;
  cover_image: string | null;
  amenities: Amenity[];
  images?: HotelImage[];
  is_featured: boolean;
  google_maps_url?: string;
}

// ============ ATTRACTION ============
export interface AttractionImage {
  id: number;
  image_url: string;
  caption: string;
  is_cover: boolean;
  order: number;
}

export interface Attraction {
  id: number;
  icon: string;
  name: string;
  description: string;
  cover_image: string | null;
  latitude: number;
  longitude: number;
  is_featured: boolean;
  order: number;
  history?: string;
  video_url?: string;
  working_hours?: string;
  entrance_fee?: number;
  images?: AttractionImage[];
  name_uz?: string;
  name_en?: string;
  name_ru?: string;
  description_uz?: string;
  description_en?: string;
  description_ru?: string;
}

// ============ TRANSPORT ============
export interface TransportRoute {
  id: number;
  transport_type: TransportTypeEnum;
  type_label: string;
  icon: string;
  from_location: string;
  to_location: string;
  badge: string;
  description: string;
  duration_min: number;
  duration_max: number;
  duration_label: string;
  price_min: number;
  price_max: number;
  price_label: string;
  badge_style?: string;
  order: number;
}

// ============ EVENT ============
export interface EventImage {
  id: number;
  image_url: string;
  order: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  cover_image_url: string | null;
  start_date: string;
  end_date: string | null;
  start_time: string | null;
  location: string;
  is_free: boolean;
  price: number;
  is_featured: boolean;
  latitude?: number;
  longitude?: number;
  images?: EventImage[];
}

// ============ NEWS ============
export interface NewsImage {
  id: number;
  image_url: string;
  caption: string;
  order: number;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  author: string;
  published_at: string;
  is_featured: boolean;
  content?: string;
  images?: NewsImage[];
}

// ============ RESTAURANT ============
export interface Cuisine {
  id: number;
  icon: string;
  name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  name_en: string;
  name_ru: string;
  description: string;
  description_uz: string;
  cuisines: Cuisine[];
  city: CityEnum;
  city_label: string;
  price_range: PriceRange;
  rating: number;
  address_i18n: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  website: string;
  working_hours: string;
  has_wifi: boolean;
  has_parking: boolean;
  has_outdoor_seating: boolean;
  is_halal: boolean;
  is_vegetarian_friendly: boolean;
  cover_image: string | null;
  is_featured: boolean;
  images?: RestaurantImage[];
}

export interface RestaurantImage {
  id: number;
  image_url: string;
  is_cover: boolean;
  order: number;
}

// ============ TOUR ============
export interface TourImage {
  id: number;
  image_url: string;
  caption: string;
  order: number;
}

export interface Tour {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  cover_image_url: string | null;
  price: number;
  duration: number;
  duration_type: DurationType;
  duration_type_label: string;
  difficulty: DifficultyLevel;
  difficulty_label: string;
  rating: number;
  max_people: number;
  min_people: number;
  is_featured: boolean;
  description?: string;
  itinerary?: string;
  includes?: string;
  excludes?: string;
  meeting_point?: string;
  guide_languages?: string;
  images?: TourImage[];
}

// ============ REVIEW ============
export interface Review {
  id: number;
  name: string;
  country: string;
  rating: number;
  title: string;
  comment: string;
  created_at: string;
}

export interface ReviewStats {
  avg_rating: number;
  total: number;
}

export interface ReviewsResponse {
  success: boolean;
  stats: ReviewStats;
  results: Review[];
}

export type ReviewTargetType = 'hotel' | 'attraction' | 'restaurant' | 'tour';

// ============ CONTACT ============
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | string>;
}

// ============ STATS ============
export interface StatsData {
  total_hotels?: number;
  urgench_hotels?: number;
  khiva_hotels?: number;
  total_attractions?: number;
  featured_attractions?: number;
  transport_routes?: number;
  total_events?: number;
  total_news?: number;
  total_restaurants?: number;
  total_tours?: number;
}

// ============ HOME ============
export interface HomeSummary {
  success: boolean;
  lang: Language;
  stats: StatsData;
  featured_hotels: Hotel[];
  transport: TransportRoute[];
  attractions: Attraction[];
  events: Event[];
  news: News[];
  restaurants: Restaurant[];
  tours: Tour[];
}

// ============ PAGINATED ============
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ============ OPTIONS ============
export interface HotelOptions {
  success: boolean;
  cities: OptionItem<CityEnum>[];
  stars: number[];
  price: { min: number | null; max: number | null };
  ordering: string[];
  amenities: Amenity[];
}

export interface RestaurantOptions {
  success: boolean;
  cities: OptionItem<CityEnum>[];
  price_ranges: OptionItem<PriceRange>[];
  cuisines: Cuisine[];
}

// ============ SEARCH ============
export interface SearchResults {
  success: boolean;
  query: string;
  results: {
    hotels: Hotel[];
    attractions: Attraction[];
    events: Event[];
    news: News[];
    restaurants: Restaurant[];
    tours: Tour[];
  };
  counts: {
    hotels: number;
    attractions: number;
    events: number;
    news: number;
    restaurants: number;
    tours: number;
  };
}
