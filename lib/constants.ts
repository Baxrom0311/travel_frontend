import { Language } from './types';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'uz', label: 'UZ' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'РУ' },
];

export const ROUTES = {
  home: '/',
  accommodation: '/accommodation',
  transport: '/transport',
  khiva: '/khiva',
  events: '/events',
  news: '/news',
  contact: '/contact',
} as const;

// Map markazi
export const KHOREZM_CENTER: [number, number] = [41.5500, 60.6300];
export const KHIVA_CENTER: [number, number] = [41.3786, 60.3592];

// Fallback rasmlar
export const FALLBACK_IMAGES = {
  hotel: '/images/hotel-traditional.jpg',
  attraction: '/images/khiva-main.jpg',
  transport: '/images/caravan.jpg',
  event: '/images/bazaar.jpg',
  news: '/images/ichan-kala.jpg',
};
