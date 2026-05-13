import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mehmonxonalar — Xiva va Urganchdagi eng yaxshi turar joylar',
  description: 'Xiva va Urganchda 5 yulduzli, boutique va qulay mehmonxonalar. Narxlar, qulayliklar va real reytinglar.',
  openGraph: {
    title: 'Mehmonxonalar — Visit Khorezm',
    description: 'Xiva va Urganchdagi eng yaxshi mehmonxonalar',
    images: ['/images/hotel-traditional.jpg'],
  },
};

export default function AccommodationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
