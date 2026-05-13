'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getAttractionById, getRelatedAttractions } from '@/lib/api-client';
import { Attraction } from '@/lib/types';
import { MapPin, Star, Clock, Ticket, ArrowLeft, Play } from 'lucide-react';

export default function AttractionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { language } = useI18n();
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [related, setRelated] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const t = getSection('khiva', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const numId = Number(id);
      if (!numId) { router.push('/khiva'); return; }
      const [attr, rel] = await Promise.all([
        getAttractionById(numId, language),
        getRelatedAttractions(numId, language),
      ]);
      if (!attr) { router.push('/khiva'); return; }
      setAttraction(attr);
      setRelated(rel);
      setLoading(false);
    })();
  }, [id, language, router]);

  if (loading || !attraction) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-32">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-96 bg-muted rounded-2xl" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = attraction.images || [];
  const coverImg = images[activeImage]?.image_url || attraction.cover_image || '/images/ichan-kala.jpg';

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20">
        {/* Back */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <Link href="/khiva" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
            <ArrowLeft size={16} /> {tc.back}
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <Image src={coverImg} alt={attraction.name} fill className="object-cover" unoptimized priority />
              <div className="absolute top-4 left-4 glass-strong px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
                <span className="text-2xl">{attraction.icon}</span>
                {attraction.is_featured && <><Star size={12} className="fill-amber-500 text-amber-500" /> Featured</>}
              </div>
              {attraction.video_url && (
                <a href={attraction.video_url} target="_blank" className="absolute bottom-4 right-4 glass-strong px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
                  <Play size={14} fill="currentColor" /> Video
                </a>
              )}
            </div>

            {/* Gallery thumbs */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.slice(0, 5).map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                      activeImage === idx ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.image_url} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}

            {/* Title & desc */}
            <div className="glass rounded-2xl p-6">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{attraction.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{attraction.description}</p>
            </div>

            {/* History */}
            {attraction.history && (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-serif text-2xl font-bold mb-4">{t.history}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{attraction.history}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info card */}
            <div className="glass-strong rounded-2xl p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span>{attraction.latitude.toFixed(4)}, {attraction.longitude.toFixed(4)}</span>
                </div>
                {attraction.working_hours && (
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock size={16} className="text-primary shrink-0" />
                    <span>{attraction.working_hours}</span>
                  </div>
                )}
                {attraction.entrance_fee !== undefined && attraction.entrance_fee > 0 && (
                  <div className="flex items-center gap-3 text-foreground">
                    <Ticket size={16} className="text-primary shrink-0" />
                    <span>{new Intl.NumberFormat('uz-UZ').format(attraction.entrance_fee)} UZS</span>
                  </div>
                )}
                {attraction.entrance_fee === 0 && (
                  <div className="flex items-center gap-3 text-green-600">
                    <Ticket size={16} className="shrink-0" />
                    <span className="font-semibold">{tc.free}</span>
                  </div>
                )}
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`}
                target="_blank"
                className="mt-4 w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2"
              >
                <MapPin size={16} /> Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 mt-16">
            <h2 className="font-serif text-3xl font-bold mb-6">{t.similar}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((a) => (
                <Link key={a.id} href={`/khiva/${a.id}`} className="group glass-card rounded-2xl overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={a.cover_image || '/images/ichan-kala.jpg'}
                      alt={a.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-1">{a.name}</h3>
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
