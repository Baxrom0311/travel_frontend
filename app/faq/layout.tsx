import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tez-tez so\'raladigan savollar',
  description: "Xorazmga sayohat haqida ko'p so'raladigan savollar: viza, ob-havo, narxlar, transport, valyuta.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
