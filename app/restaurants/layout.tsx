import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Restoranlar — Xorazmning eng yaxshi restoran va kafelari",
  description: "Xiva va Urganchda o'zbek, xalqaro, turk oshxonalari. Halol restoranlar, kafelar va tezkor ovqat.",
  openGraph: {
    title: 'Restoranlar — Visit Khorezm',
    description: 'Xorazmning eng yaxshi restoran va kafelari',
    images: ['/images/bazaar.jpg'],
  },
};

export default function RestaurantsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
