import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sayohat rejasi',
  description: "Bir necha kunlik sayohat rejangizni tuzing — Xorazm bo'ylab joylar, mehmonxonalar va restoranlarni tanlang.",
};

export default function TripPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
