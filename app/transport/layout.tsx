import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transport — Aeroportdan Xivagacha',
  description: 'Urganch aeroportidan Xivagacha borish uchun taksi, avtobus va poyezd variantlari. Narxlar va vaqt ma\'lumotlari.',
};

export default function TransportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
