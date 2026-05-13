'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getNews } from '@/lib/api-client';
import { FALLBACK_IMAGES } from '@/lib/constants';
import { News } from '@/lib/types';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

export default function NewsPage() {
  const { language } = useI18n();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const t = getSection('news', language);
  const tc = getSection('common', language);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getNews({}, language);
      setNews(data);
      setLoading(false);
    })();
  }, [language]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[350px] mt-16 overflow-hidden">
        <Image src="/images/ichan-kala.jpg" alt={t.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 glass-card rounded-2xl animate-pulse" />)}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <Newspaper className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground">{t.no_news}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n) => (
              <Link key={n.id} href={`/news/${n.slug}`} className="glass-card rounded-2xl overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <Image src={n.cover_image_url || FALLBACK_IMAGES.news} alt={n.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" unoptimized />
                  {n.is_featured && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold">Featured</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                    <Calendar size={12} />
                    <span>{new Date(n.published_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU')}</span>
                    {n.author && <><span>•</span><span>{n.author}</span></>}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{n.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{n.excerpt}</p>
                  <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {tc.readmore} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
