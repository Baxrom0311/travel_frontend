import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interaktiv xarita — Xorazmdagi barcha joylar',
  description: 'Mehmonxonalar, restoranlar, tarixiy joylar bitta xaritada. Xorazm va Xiva bo\'ylab.',
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
