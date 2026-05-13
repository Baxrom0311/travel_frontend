import { Language } from './types';

/**
 * Berilgan ob'ektdan tilga mos field qaytaradi.
 * Masalan: getLocalized(hotel, 'name', 'en') -> hotel.name_en yoki hotel.name
 */
export function getLocalized<T extends Record<string, any>>(
  obj: T | null | undefined,
  field: string,
  lang: Language = 'uz'
): string {
  if (!obj) return '';
  const langField = `${field}_${lang}`;
  return obj[langField] || obj[field] || obj[`${field}_uz`] || '';
}

/**
 * Narxni chiroyli formatlash (UZS yoki USD)
 */
export function formatPrice(price: number, currency = 'UZS'): string {
  if (!price) return '—';
  if (currency === 'UZS') {
    const formatted = Math.round(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${formatted} so'm`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}
