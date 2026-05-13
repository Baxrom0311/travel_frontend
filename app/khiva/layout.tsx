import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xiva — Ichan-qal\'a va Xiva tarixiy joylari',
  description: 'Xiva — UNESCO jahon merosi. Ichan-qal\'a, Kalta Minor, Ko\'hna Ark, Juma masjidi va Islom Xo\'ja minorasi haqida to\'liq ma\'lumot.',
  openGraph: {
    title: 'Xiva — UNESCO jahon merosi',
    description: 'Xorazmning qadimiy shahri Xivaning tarixiy joylari',
    images: ['/images/khiva-main.jpg'],
  },
};

export default function KhivaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
