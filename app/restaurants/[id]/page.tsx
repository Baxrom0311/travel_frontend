'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FavoriteButton } from '@/components/favorite-button';
import { ReviewsSection } from '@/components/reviews-section';
import { PriceRange } from '@/components/price-range';
import { useGeolocation } from '@/hooks/use-geolocation';
import dynamic from 'next/dynamic';

const RouteMap = dynamic(() => import('@/components/route-map').then((m) => m.RouteMap), { ssr: false });
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getRestaurantById } from '@/lib/api-client';
import { Restaurant } from '@/lib/types';
import { MapPin, Phone, Globe, Clock, Wifi, Car, Leaf, Star, ArrowLeft, Navigation, X } from 'lucide-react';

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { language } = useI18n();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [routeOpen, setRouteOpen] = useState(false);
  const { coords: userCoords, status: geoStatus, request: requestGeo } = useGeolocation();
  const tc = getSection('common', language);
  const tr = getSection('restaurants', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const numId = Number(id);
      if (!numId) { router.push('/restaurants'); return; }
      const data = await getRestaurantById(numId, language);
      if (!data) { router.push('/restaurants'); return; }
      setRestaurant(data);
      setLoading(false);
    })();
  }, [id, language, router]);

  if (loading || !restaurant) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-32">
          <div className="h-96 bg-muted rounded-2xl animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  const images = restaurant.images || [];
  const coverImg = images[activeImg]?.image_url || restaurant.cover_image || '/images/bazaar.jpg';

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <Link href="/restaurants" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm">
            <ArrowLeft size={16} /> {tc.back}
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <Image src={coverImg} alt={restaurant.name} fill className="object-cover" unoptimized priority />
              <div className="absolute top-4 left-4 glass-strong px-3 py-2 rounded-full">
                <PriceRange range={restaurant.price_range} size={14} />
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="glass-strong px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-semibold">
                  <Star size={12} className="fill-amber-500 text-amber-500" /> {restaurant.rating}
                </div>
                <FavoriteButton
                  type="restaurant"
                  id={restaurant.id}
                  name={restaurant.name}
                  image={restaurant.cover_image || undefined}
                  href={`/restaurants/${restaurant.id}`}
                  variant="glass"
                />
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.slice(0, 5).map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImg(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${activeImg === idx ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <Image src={img.image_url} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}

            <div className="glass rounded-2xl p-6">
              <h1 className="font-serif text-4xl font-bold mb-3">{restaurant.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.cuisines.map(c => (
                  <span key={c.id} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                    {c.icon} {c.name}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground flex items-center gap-2 mb-4">
                <MapPin size={14} /> {restaurant.address_i18n}
              </p>
              <p className="text-lg leading-relaxed whitespace-pre-line">{restaurant.description}</p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold mb-4">Xususiyatlar</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {restaurant.has_wifi && <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg"><Wifi size={18} className="text-primary" /><span className="text-sm">{tr.wifi}</span></div>}
                {restaurant.has_parking && <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg"><Car size={18} className="text-primary" /><span className="text-sm">{tr.parking}</span></div>}
                {restaurant.has_outdoor_seating && <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg"><span className="text-xl">☀️</span><span className="text-sm">Tashqi</span></div>}
                {restaurant.is_halal && <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-green-700"><span className="font-bold text-xs">HALAL</span></div>}
                {restaurant.is_vegetarian_friendly && <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-green-700"><Leaf size={18} /><span className="text-sm">{tr.vegetarian}</span></div>}
              </div>
            </div>

            <ReviewsSection targetType="restaurant" targetId={restaurant.id} />
          </div>

          <div>
            <div className="glass-strong rounded-2xl p-6 sticky top-24 space-y-4">
              <div className="space-y-3 text-sm">
                {restaurant.working_hours && (
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-primary shrink-0" />
                    <span>{restaurant.working_hours}</span>
                  </div>
                )}
                {restaurant.phone && (
                  <a href={`tel:${restaurant.phone}`} className="flex items-center gap-3 hover:text-primary">
                    <Phone size={16} className="text-primary shrink-0" />
                    <span>{restaurant.phone}</span>
                  </a>
                )}
                {restaurant.website && (
                  <a href={restaurant.website} target="_blank" className="flex items-center gap-3 hover:text-primary">
                    <Globe size={16} className="text-primary shrink-0" />
                    <span className="truncate">{restaurant.website}</span>
                  </a>
                )}
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span>{restaurant.latitude.toFixed(4)}, {restaurant.longitude.toFixed(4)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (geoStatus !== 'success') requestGeo();
                  setRouteOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <Navigation size={16} strokeWidth={2.5} /> Yo'nalish ko'rsatish
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`}
                target="_blank"
                className="mt-2 w-full py-2.5 rounded-xl glass-button text-foreground text-sm font-semibold transition-all inline-flex items-center justify-center gap-2"
              >
                <MapPin size={14} strokeWidth={2.5} /> Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Route modal */}
      {routeOpen && (
        <div
          className="fixed inset-0 z-[95] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setRouteOpen(false)}
        >
          <div
            className="glass-strong rounded-2xl p-4 max-w-5xl w-full h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-serif text-xl font-bold">{restaurant.name}</h2>
                <p className="text-xs text-muted-foreground">Yo'nalish xaritasi</p>
              </div>
              <button
                onClick={() => setRouteOpen(false)}
                className="glass-button p-2 rounded-full"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex-1 relative">
              {geoStatus === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-sm text-muted-foreground">Joylashuvingiz aniqlanmoqda...</p>
                  </div>
                </div>
              )}
              {geoStatus === 'denied' && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center max-w-md glass rounded-xl p-6">
                    <MapPin size={32} className="text-red-500 mx-auto mb-3" strokeWidth={2.5} />
                    <h3 className="font-semibold mb-2">Joylashuv ruxsati kerak</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Brauzer'da joylashuvni yoqing
                    </p>
                    <button onClick={() => requestGeo()} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      Qayta urinish
                    </button>
                  </div>
                </div>
              )}
              {geoStatus === 'success' && userCoords && (
                <RouteMap
                  start={{ ...userCoords, label: 'Siz' }}
                  end={{
                    latitude: restaurant.latitude,
                    longitude: restaurant.longitude,
                    label: restaurant.name,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
