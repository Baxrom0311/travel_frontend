import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Turlar va Ekskursiyalar — Xorazm bo\'ylab',
  description: 'Xorazm bo\'ylab professional gidlar bilan tayyor sayohat paketlari. Bir kundan 3 kungacha variantlar.',
  openGraph: {
    title: 'Turlar va Ekskursiyalar',
    description: 'Xorazm bo\'ylab tayyor sayohat paketlari',
    images: ['/images/ichan-kala.jpg'],
  },
};

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
