import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { I18nProvider } from '@/lib/i18n-context';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://visitkhorezm.uz'),
  title: {
    default: 'Visit Khorezm — Xorazm turizm portali',
    template: '%s | Visit Khorezm',
  },
  description:
    "Xorazm viloyati, Xiva va Urganchdagi eng yaxshi mehmonxonalar, diqqatga sazovor joylar, tadbirlar va transport ma'lumotlari. UNESCO jahon merosi Xivani kashf eting.",
  keywords: [
    'Xorazm', 'Khorezm', 'Xiva', 'Khiva', 'Urgench', 'Urganch',
    'Uzbekistan turizm', 'UNESCO', 'Ichan-Kala',
    'mehmonxona', 'hotel', 'sayohat', 'travel',
  ],
  authors: [{ name: 'Visit Khorezm' }],
  creator: 'Visit Khorezm',
  publisher: 'Visit Khorezm',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['en_US', 'ru_RU'],
    url: 'https://visitkhorezm.uz',
    siteName: 'Visit Khorezm',
    title: 'Visit Khorezm — Xorazmning qadimiy go\'zalligini kashf eting',
    description: 'Ichan-qal\'a, Kalta Minor, Juma masjidi va boshqa tarixiy joylar. Mehmonxonalar, tadbirlar va transport xizmatlari.',
    images: [
      {
        url: '/images/khiva-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Visit Khorezm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit Khorezm',
    description: 'Xorazmning qadimiy go\'zalligini kashf eting',
    images: ['/images/khiva-main.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d746d' },
    { media: '(prefers-color-scheme: dark)', color: '#0a5d57' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <I18nProvider>
          {children}
          <Toaster />
        </I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
