'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FavoriteButton } from '@/components/favorite-button';
import { ReviewsSection } from '@/components/reviews-section';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getTourBySlug } from '@/lib/api-client';
import { formatPrice } from '@/lib/i18n-helpers';
import { Tour } from '@/lib/types';
import { Clock, Users, MapPin, Star, ArrowLeft, CheckCircle2, XCircle, Mountain, Globe } from 'lucide-react';

export default function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { language } = useI18n();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const tc = getSection('common', language);
  const tt = getSection('tours', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getTourBySlug(slug, language);
      if (!data) { router.push('/tours'); return; }
      setTour(data);
      setLoading(false);
    })();
  }, [slug, language, router]);

  if (loading || !tour) {
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <Link href="/tours" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm">
            <ArrowLeft size={16} /> {tc.back}
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image src={tour.cover_image_url || '/images/ichan-kala.jpg'} alt={tour.title} fill className="object-cover" unoptimized priority />
              <div className="absolute top-4 left-4 glass-strong px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star size={12} className="fill-amber-500 text-amber-500" /> {tour.rating}
              </div>
              <div className="absolute top-4 right-4">
                <FavoriteButton
                  type="tour"
                  id={tour.id}
                  name={tour.title}
                  image={tour.cover_image_url || undefined}
                  href={`/tours/${tour.slug}`}
                  variant="glass"
                />
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h1 className="font-serif text-4xl font-bold mb-3">{tour.title}</h1>
              <p className="text-lg text-muted-foreground">{tour.short_description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                  <Clock size={18} className="text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{tt.duration}</div>
                    <div className="font-semibold text-sm">{tour.duration} {tour.duration_type_label}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                  <Users size={18} className="text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{tt.max_people}</div>
                    <div className="font-semibold text-sm">{tour.max_people}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                  <Mountain size={18} className="text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{tt.difficulty}</div>
                    <div className="font-semibold text-sm">{tour.difficulty_label}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                  <Globe size={18} className="text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{tt.guide_languages}</div>
                    <div className="font-semibold text-xs">{tour.guide_languages}</div>
                  </div>
                </div>
              </div>
            </div>

            {tour.description && (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-serif text-2xl font-bold mb-4">Tavsif</h2>
                <p className="leading-relaxed whitespace-pre-line">{tour.description}</p>
              </div>
            )}

            {tour.itinerary && (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-serif text-2xl font-bold mb-4">{tt.itinerary}</h2>
                <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap">{tour.itinerary}</pre>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.includes && (
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-600">
                    <CheckCircle2 size={18} /> {tt.includes}
                  </h3>
                  <div className="text-sm whitespace-pre-line">{tour.includes}</div>
                </div>
              )}
              {tour.excludes && (
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-red-500">
                    <XCircle size={18} /> {tt.excludes}
                  </h3>
                  <div className="text-sm whitespace-pre-line">{tour.excludes}</div>
                </div>
              )}
            </div>

            <ReviewsSection targetType="tour" targetId={tour.id} />
          </div>

          <div>
            <div className="glass-strong rounded-2xl p-6 sticky top-24 space-y-4">
              <div>
                <div className="text-3xl font-bold text-primary">{formatPrice(tour.price)}</div>
                <div className="text-sm text-muted-foreground">/ kishi</div>
              </div>
              {tour.meeting_point && (
                <div className="text-sm border-t border-border/50 pt-4">
                  <div className="text-xs text-muted-foreground mb-1">{tt.meeting_point}</div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                    <span>{tour.meeting_point}</span>
                  </div>
                </div>
              )}
              <Link
                href="/contact"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2"
              >
                {tt.book_now}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
