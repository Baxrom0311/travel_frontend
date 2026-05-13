'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getNewsBySlug } from '@/lib/api-client';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { News } from '@/lib/types';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { language } = useI18n();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getNewsBySlug(slug, language);
      if (!data) { router.push('/news'); return; }
      setNews(data);
      setLoading(false);
    })();
  }, [slug, language, router]);

  if (loading || !news) {
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
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <Link href="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm">
            <ArrowLeft size={16} /> {tc.back}
          </Link>
        </div>

        <article className="max-w-4xl mx-auto px-4">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image src={news.cover_image_url || FALLBACK_IMAGES.news} alt={news.title} fill className="object-cover" unoptimized priority />
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-2"><Calendar size={14} />{new Date(news.published_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU')}</span>
            {news.author && <span className="flex items-center gap-2"><User size={14} />{news.author}</span>}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">{news.title}</h1>

          <div className="glass rounded-2xl p-8">
            <p className="text-lg text-muted-foreground mb-6 font-medium">{news.excerpt}</p>
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-line leading-relaxed">{news.content}</p>
            </div>
          </div>

          {news.images && news.images.length > 0 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {news.images.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={img.image_url} alt={img.caption || ''} fill className="object-cover hover:scale-105 transition-transform" unoptimized />
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
      <Footer />
    </div>
  );
}
