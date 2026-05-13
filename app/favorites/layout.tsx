import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saqlangan joylar',
  description: 'Sizning sevimli joylaringiz.',
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
