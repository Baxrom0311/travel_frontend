import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galereya',
  description: 'Xorazm go\'zal manzaralari, tarixiy yodgorliklari va mehmonxonalari rasmlari.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
