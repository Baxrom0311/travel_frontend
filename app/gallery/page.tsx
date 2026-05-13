'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Lightbox, LightboxImage } from '@/components/lightbox';
import { Stagger, StaggerItem } from '@/components/motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { getHotels, getAttractions, getRestaurants } from '@/lib/api-client';
import { useI18n } from '@/lib/i18n-context';
import { Images, Filter } from 'lucide-react';

type Category = 'all' | 'attractions' | 'hotels' | 'restaurants' | 'khorezm';

interface GalleryImage extends LightboxImage {
  id: string;
  category: Category;
  location?: string;
}

const KHOREZM_IMAGES: GalleryImage[] = [
  { id: 'k1', src: '/images/khiva-main.jpg', alt: 'Khiva panoramic', category: 'khorezm', location: 'Ichan-Kala' },
  { id: 'k2', src: '/images/ichan-kala.jpg', alt: 'Ichan-Kala walls', category: 'khorezm', location: 'Ichan-Kala' },
  { id: 'k3', src: '/images/kalta-minor.jpg', alt: 'Kalta Minor', category: 'khorezm', location: 'Khiva' },
  { id: 'k4', src: '/images/juma-mosque.jpg', alt: 'Juma Mosque', category: 'khorezm', location: 'Khiva' },
  { id: 'k5', src: '/images/bazaar.jpg', alt: 'Khorezm bazaar', category: 'khorezm', location: 'Khiva' },
  { id: 'k6', src: '/images/caravan.jpg', alt: 'Silk Road caravan', category: 'khorezm', location: 'Khorezm' },
  { id: 'k7', src: '/images/aral-sea.jpg', alt: 'Aral Sea', category: 'khorezm', location: 'Karakalpakstan' },
  { id: 'k8', src: '/images/khorezm-palace.jpg', alt: 'Khorezm Palace', category: 'khorezm', location: 'Urgench' },
];

export default function GalleryPage() {
  const { language } = useI18n();
  const [images, setImages] = useState<GalleryImage[]>(KHOREZM_IMAGES);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [hotels, attractions, restaurants] = await Promise.all([
        getHotels({ page_size: 50 }, language),
        getAttractions(undefined, language),
        getRestaurants({}, language),
      ]);

      const dynamicImages: GalleryImage[] = [
        ...attractions
          .filter((a) => a.cover_image)
          .map((a) => ({
            id: `a${a.id}`,
            src: a.cover_image!,
            alt: a.name,
            category: 'attractions' as const,
            location: a.name,
          })),
        ...hotels
          .filter((h) => h.cover_image)
          .map((h) => ({
            id: `h${h.id}`,
            src: h.cover_image!,
            alt: h.name,
            category: 'hotels' as const,
            location: `${h.name}, ${h.city_label}`,
          })),
        ...restaurants
          .filter((r) => r.cover_image)
          .map((r) => ({
            id: `r${r.id}`,
            src: r.cover_image!,
            alt: r.name,
            category: 'restaurants' as const,
            location: `${r.name}, ${r.city_label}`,
          })),
      ];

      setImages([...KHOREZM_IMAGES, ...dynamicImages]);
      setLoading(false);
    })();
  }, [language]);

  const filtered = category === 'all' ? images : images.filter((img) => img.category === category);

  const categories: { value: Category; label: string; count: number }[] = [
    { value: 'all', label: 'Hammasi', count: images.length },
    { value: 'khorezm', label: 'Xorazm', count: images.filter((i) => i.category === 'khorezm').length },
    { value: 'attractions', label: 'Joylar', count: images.filter((i) => i.category === 'attractions').length },
    { value: 'hotels', label: 'Mehmonxonalar', count: images.filter((i) => i.category === 'hotels').length },
    { value: 'restaurants', label: 'Restoranlar', count: images.filter((i) => i.category === 'restaurants').length },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[350px] overflow-hidden">
        <Image src="/images/juma-mosque.jpg" alt="Gallery" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="glass-button inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4">
            <Images size={14} className="text-amber-400" strokeWidth={2.5} />
            <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">
              {images.length} rasm
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">Galereya</h1>
          <p className="text-gray-200 max-w-2xl">
            Xorazmning go'zal manzaralari, tarixiy yodgorliklari va zamonaviy mehmonxonalari
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category tabs */}
        <ScrollReveal className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={16} className="text-primary" strokeWidth={2.5} />
            <span className="text-sm font-semibold">Kategoriya</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                  category === cat.value ? 'bg-primary text-primary-foreground shadow-lg' : 'glass text-foreground'
                }`}
              >
                {cat.label}
                <span className="ml-1.5 text-[10px] opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-xl animate-pulse"
                style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <Images className="mx-auto text-muted-foreground mb-3" size={48} strokeWidth={1.5} />
            <p className="text-muted-foreground">Rasm topilmadi</p>
          </div>
        ) : (
          <Stagger className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3" stagger={0.04}>
            {filtered.map((img, idx) => (
              <StaggerItem key={img.id} className="break-inside-avoid">
                <button
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="w-full rounded-xl overflow-hidden group relative block"
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: idx % 3 === 0 ? '3/4' : idx % 5 === 0 ? '1/1' : '4/3' }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || ''}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {img.location && (
                      <div className="absolute bottom-2 left-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                        📍 {img.location}
                      </div>
                    )}
                  </div>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>

      <Footer />

      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
        images={filtered.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </div>
  );
}
