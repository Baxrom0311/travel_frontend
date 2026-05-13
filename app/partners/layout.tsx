import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hamkor platformalar',
  description: 'Booking.com, Airbnb, TripAdvisor, Expedia, Hotels.com, Skyscanner — Xorazm sayohatingiz uchun barcha platformalar',
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
