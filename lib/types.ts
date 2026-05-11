// Hotel data structure
export interface Hotel {
  id: number;
  name: string;
  description: string;
  rating: number;
  price: number;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
  amenities: string[];
  rooms: number;
  reviews: number;
}

// Attraction data structure
export interface Attraction {
  id: number;
  name: string;
  description: string;
  category: 'gate' | 'museum' | 'monument' | 'historic';
  image: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  visitingHours: string;
  entryFee: number;
}

// Transport data structure
export interface Transport {
  id: number;
  type: 'taxi' | 'shuttle' | 'car_rental' | 'bus';
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
  contact: string;
  rating: number;
}

// Contact form message
export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: string;
}

// Statistics data
export interface StatsData {
  visitors: number;
  hotels: number;
  attractions: number;
  guides: number;
}

// Language type
export type Language = 'uz' | 'en' | 'ru';

// Translation object type
export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}
