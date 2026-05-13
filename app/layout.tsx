import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { I18nProvider } from '@/lib/i18n-context';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ServerStatus } from '@/components/server-status';
import { PageTransition } from '@/components/page-transition';
import { ScrollProgress } from '@/components/scroll-progress';
import { BackToTop } from '@/components/back-to-top';
import { SplashScreen } from '@/components/splash-screen';
import { CustomCursor } from '@/components/custom-cursor';
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
    "Xorazm viloyati, Xiva va Urganchdagi eng yaxshi mehmonxonalar, diqqatga sazovor joylar, tadbirlar va transport ma'lumotlari.",
  keywords: [
    'Xorazm', 'Khorezm', 'Xiva', 'Khiva', 'Urgench', 'Urganch',
    'Uzbekistan turizm', 'UNESCO', 'Ichan-Kala',
  ],
  authors: [{ name: 'Visit Khorezm' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Visit Khorezm',
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['en_US', 'ru_RU'],
    url: 'https://visitkhorezm.uz',
    siteName: 'Visit Khorezm',
    title: "Visit Khorezm — Xorazmning qadimiy go'zalligini kashf eting",
    description: "Ichan-qal'a, Kalta Minor, Juma masjidi va boshqa tarixiy joylar.",
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
    description: "Xorazmning qadimiy go'zalligini kashf eting",
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
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d746d' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e14' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className={`${playfair.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <I18nProvider>
            <AuthProvider>
              <SplashScreen />
              <CustomCursor />
              <ScrollProgress />
              <PageTransition>{children}</PageTransition>
              <BackToTop />
              <Toaster />
              <ServerStatus />
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
