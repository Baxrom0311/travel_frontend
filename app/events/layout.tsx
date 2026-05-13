import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tadbirlar — Xorazmdagi festivallar va voqealar',
  description: 'Xorazm va Xivada o\'tkaziladigan festivallar, madaniy voqealar, ko\'rgazmalar va an\'anaviy bayramlar.',
  openGraph: {
    title: 'Tadbirlar — Visit Khorezm',
    description: 'Xorazmdagi festivallar va madaniy voqealar',
    images: ['/images/bazaar.jpg'],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
