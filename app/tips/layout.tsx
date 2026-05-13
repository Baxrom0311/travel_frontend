import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sayohat qo\'llanmasi',
  description: "Xorazmga sayohatdan oldin bilib olishingiz kerak — favqulodda raqamlar, viza, valyuta, maslahatlar.",
};

export default function TipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
