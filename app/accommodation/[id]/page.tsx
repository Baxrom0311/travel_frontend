'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getHotelById, getRelatedHotels } from '@/lib/api-client';
import { formatPrice } from '@/lib/i18n-helpers';
import { Hotel } from '@/lib/types';
import { MapPin, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { FavoriteButton } from '@/components/favorite-button';
import { ReviewsSection } from '@/components/reviews-section';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { language } = useI18n();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [related, setRelated] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const t = getSection('accommodation', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const numId = Number(id);
      if (!numId) { router.push('/accommodation'); return; }
      const [h, rel] = await Promise.all([
        getHotelById(numId, language),
        getRelatedHotels(numId, language),
      ]);
      if (!h) { router.push('/accommodation'); return; }
      setHotel(h);
      setRelated(rel);
      setLoading(false);
    })();
  }, [id, language, router]);

  if (loading || !hotel) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-32">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-96 bg-muted rounded-2xl" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = hotel.images || [];
  const coverImg = images[activeImage]?.image_url || hotel.cover_image || FALLBACK_IMAGES.hotel;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <Breadcrumbs items={[
            { label: t.title, href: '/accommodation' },
            { label: hotel.name },
          ]} />
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <Image src={coverImg} alt={hotel.name} fill className="object-cover" unoptimized priority />
              <div className="absolute top-4 left-4 glass-strong px-4 py-2 rounded-full text-sm font-semibold">
                ★ {hotel.stars} Star
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="glass-strong px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-semibold">
                  <Star size={12} className="fill-amber-500 text-amber-500" /> {hotel.rating}
                </div>
                <FavoriteButton
                  type="hotel"
                  id={hotel.id}
                  name={hotel.name}
                  image={hotel.cover_image || undefined}
                  href={`/accommodation/${hotel.id}`}
                  variant="glass"
                />
              </div>
            </div>

            {/* Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.slice(0, 5).map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      activeImage === idx ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.image_url} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="glass rounded-2xl p-6">
              <h1 className="font-serif text-4xl font-bold mb-3">{hotel.name}</h1>
              <p className="text-muted-foreground flex items-center gap-2 mb-4">
                <MapPin size={14} /> {hotel.address_i18n}
              </p>
              <p className="text-lg text-foreground leading-relaxed whitespace-pre-line">{hotel.description}</p>
            </div>

            {/* Amenities */}
            {hotel.amenities.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-serif text-2xl font-bold mb-4">{t.amenities}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.amenities.map((a) => (
                    <div key={a.id} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                      <span className="text-xl">{a.icon}</span>
                      <span className="text-sm font-medium">{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ReviewsSection targetType="hotel" targetId={hotel.id} />
          </div>

          {/* Sidebar */}
          <div>
            <div className="glass-strong rounded-2xl p-6 sticky top-24">
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary">{formatPrice(hotel.price_per_night)}</div>
                <div className="text-sm text-muted-foreground">/ {tc.per_night}</div>
              </div>
              <div className="space-y-3 text-sm border-t border-border/50 pt-4">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span>{hotel.city_label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star size={16} className="text-primary shrink-0" />
                  <span>{hotel.stars_label} ({hotel.rating}/10)</span>
                </div>
              </div>
              {hotel.google_maps_url && (
                <a
                  href={hotel.google_maps_url}
                  target="_blank"
                  className="mt-6 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2"
                >
                  <MapPin size={16} /> Google Maps
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-16">
            <h2 className="font-serif text-3xl font-bold mb-6">{t.similar}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((h) => (
                <Link key={h.id} href={`/accommodation/${h.id}`} className="glass-card rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={h.cover_image || FALLBACK_IMAGES.hotel}
                      alt={h.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-1 mb-1">{h.name}</h3>
                    <p className="text-xs text-primary font-bold">{formatPrice(h.price_per_night)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
