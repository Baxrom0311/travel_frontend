import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aloqa — Visit Khorezm bilan bog\'laning',
  description: 'Savollaringiz yoki takliflaringiz bormi? Biz bilan bog\'laning.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
