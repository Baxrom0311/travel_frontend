import type { MetadataRoute } from 'next';

const BASE_URL = 'https://visitkhorezm.uz';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: '', priority: 1.0, freq: 'daily' as const },
    { path: '/khiva', priority: 0.9, freq: 'weekly' as const },
    { path: '/accommodation', priority: 0.9, freq: 'weekly' as const },
    { path: '/restaurants', priority: 0.9, freq: 'weekly' as const },
    { path: '/tours', priority: 0.9, freq: 'weekly' as const },
    { path: '/transport', priority: 0.8, freq: 'monthly' as const },
    { path: '/events', priority: 0.8, freq: 'daily' as const },
    { path: '/news', priority: 0.8, freq: 'daily' as const },
    { path: '/map', priority: 0.7, freq: 'weekly' as const },
    { path: '/trip-planner', priority: 0.7, freq: 'monthly' as const },
    { path: '/tips', priority: 0.8, freq: 'monthly' as const },
    { path: '/faq', priority: 0.6, freq: 'monthly' as const },
    { path: '/contact', priority: 0.5, freq: 'monthly' as const },
  ];

  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
