import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yangiliklar — Xorazm va turizm haqida',
  description: 'Xorazm, Xiva va O\'zbekiston turizmi haqida eng so\'nggi yangiliklar, tahlillar va maqolalar.',
  openGraph: {
    title: 'Yangiliklar — Visit Khorezm',
    description: 'Xorazm va turizm haqida so\'nggi yangiliklar',
    images: ['/images/ichan-kala.jpg'],
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
