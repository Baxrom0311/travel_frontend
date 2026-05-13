'use client';

import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ExternalBookingLinks } from '@/components/external-booking-links';
import { FlightSearch } from '@/components/flight-search';
import { InstagramFeed } from '@/components/instagram-feed';
import { GoogleMapsEmbed } from '@/components/google-maps-embed';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ExternalLink, Globe, Plane, Hotel, Camera, Map as MapIcon } from 'lucide-react';

const PARTNERS = [
  {
    name: 'Booking.com',
    logo: '🅱️',
    category: 'Mehmonxona',
    description: "Dunyoning eng katta mehmonxona bron qilish platformasi",
    url: 'https://www.booking.com/searchresults.html?ss=Khiva+Uzbekistan',
    color: 'from-blue-600 to-blue-700',
  },
  {
    name: 'Airbnb',
    logo: '🏠',
    category: 'Ijara',
    description: 'Mahalliylar bilan yashang, noyob uylarni toping',
    url: 'https://www.airbnb.com/s/Khiva/homes',
    color: 'from-pink-500 to-red-500',
  },
  {
    name: 'TripAdvisor',
    logo: '🦉',
    category: 'Sharh',
    description: "Sayyohlar sharhlari va reytinglari",
    url: 'https://www.tripadvisor.com/Search?q=Khiva+Uzbekistan',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Expedia',
    logo: '✈️',
    category: 'Sayohat paketlari',
    description: "Paketlar: parvoz + mehmonxona + mashina",
    url: 'https://www.expedia.com/Hotel-Search?destination=Khiva',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    name: 'Hotels.com',
    logo: '🏨',
    category: 'Mehmonxona',
    description: "10 ta kecha uchun 1-si bepul",
    url: 'https://www.hotels.com/search.do?q-destination=Khiva',
    color: 'from-red-500 to-rose-600',
  },
  {
    name: 'Skyscanner',
    logo: '🔭',
    category: 'Aviabilet',
    description: "Eng arzon parvozlarni toping",
    url: 'https://www.skyscanner.com/transport/flights/ist/ugc/',
    color: 'from-sky-500 to-cyan-600',
  },
  {
    name: 'Kiwi.com',
    logo: '🥝',
    category: 'Aviabilet',
    description: "Noyob aralash marshrutlar",
    url: 'https://www.kiwi.com/en/search/results/anywhere/urgench-uzbekistan/',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Google Maps',
    logo: '🗺️',
    category: 'Xarita',
    description: "Street View, yo'l ko'rsatish, uchinchi joy",
    url: 'https://www.google.com/maps/place/Khiva,+Uzbekistan',
    color: 'from-green-500 to-emerald-600',
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[350px] overflow-hidden">
        <Image src="/images/caravan.jpg" alt="Partners" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="glass-button inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4">
            <Globe size={14} className="text-amber-400" strokeWidth={2.5} />
            <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">
              Global hamkorlar
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">Hamkor platformalar</h1>
          <p className="text-gray-200 max-w-2xl">
            Xorazm bo'ylab sayohatingiz uchun dunyoning eng yirik turizm platformalari
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Partners grid */}
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
            <Hotel className="text-primary" size={32} strokeWidth={2.5} />
            Mehmonxona va bron qilish
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 group hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  {p.logo}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{p.category}</div>
                <h3 className="font-semibold text-lg mb-2">{p.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
                <div className="inline-flex items-center gap-1 text-xs text-primary font-semibold">
                  Ochish <ExternalLink size={12} strokeWidth={2.5} />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Flight search */}
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
            <Plane className="text-primary" size={32} strokeWidth={2.5} />
            Aviabilet qidirish
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FlightSearch />
            <ExternalBookingLinks
              name="Khiva, Uzbekistan"
              latitude={41.3786}
              longitude={60.3592}
              showAll
            />
          </div>
        </ScrollReveal>

        {/* Google Maps + Instagram */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                <MapIcon className="text-primary" size={24} strokeWidth={2.5} />
                Xivani xaritada
              </h2>
              <GoogleMapsEmbed
                name="Ichan Kala, Khiva, Uzbekistan"
                latitude={41.3786}
                longitude={60.3592}
                height="400px"
              />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold mb-4 flex items-center gap-2">
                <Camera className="text-primary" size={24} strokeWidth={2.5} />
                Ijtimoiy tarmoqlarda
              </h2>
              <InstagramFeed hashtag="visitkhorezm" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
}
