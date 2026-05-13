/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Backend media (Django) va boshqa tashqi manbalar uchun
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      { protocol: 'http', hostname: 'localhost', port: '8000' },
      { protocol: 'https', hostname: 'visitkhorezm.uz' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
    // Production'da optimize qilamiz, dev uchun ham
    formats: ['image/avif', 'image/webp'],
  },
  // Production uchun
  poweredByHeader: false,
  reactStrictMode: true,
  // Next 16 specific
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
