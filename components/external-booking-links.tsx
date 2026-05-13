'use client';

import { ExternalLink } from 'lucide-react';
import {
  bookingSearchUrl, airbnbSearchUrl, tripAdvisorSearchUrl,
  expediaSearchUrl, hotelsComSearchUrl, LocationQuery,
} from '@/lib/external-links';

interface Props {
  name: string;
  latitude?: number;
  longitude?: number;
  className?: string;
  showAll?: boolean;
}

const PLATFORMS = [
  {
    id: 'booking',
    name: 'Booking.com',
    logo: 'booking',
    color: 'bg-[#003580]',
    textColor: 'text-white',
    getUrl: (q: LocationQuery) => bookingSearchUrl(q),
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    logo: 'airbnb',
    color: 'bg-[#FF5A5F]',
    textColor: 'text-white',
    getUrl: (q: LocationQuery) => airbnbSearchUrl(q),
  },
  {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    logo: 'ta',
    color: 'bg-[#00AF87]',
    textColor: 'text-white',
    getUrl: (q: LocationQuery) => tripAdvisorSearchUrl(q),
  },
  {
    id: 'expedia',
    name: 'Expedia',
    logo: 'expedia',
    color: 'bg-[#FFC72C]',
    textColor: 'text-black',
    getUrl: (q: LocationQuery) => expediaSearchUrl(q),
  },
  {
    id: 'hotels',
    name: 'Hotels.com',
    logo: 'hotels',
    color: 'bg-[#D32F2F]',
    textColor: 'text-white',
    getUrl: (q: LocationQuery) => hotelsComSearchUrl(q),
  },
];

export function ExternalBookingLinks({ name, latitude, longitude, className = '', showAll = false }: Props) {
  const q: LocationQuery = { name, latitude, longitude };
  const platforms = showAll ? PLATFORMS : PLATFORMS.slice(0, 3);

  return (
    <div className={`glass rounded-2xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">Narxlarni taqqoslash</h3>
          <p className="text-xs text-muted-foreground">Boshqa platformalarda ko'ring</p>
        </div>
        <ExternalLink size={16} className="text-muted-foreground" strokeWidth={2.5} />
      </div>

      <div className="space-y-2">
        {platforms.map((p) => (
          <a
            key={p.id}
            href={p.getUrl(q)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${p.color} ${p.textColor} flex items-center justify-center font-bold text-xs shrink-0`}>
                {p.name[0]}
              </div>
              <div>
                <div className="font-semibold text-sm">{p.name}</div>
                <div className="text-[10px] text-muted-foreground">Tekshirish →</div>
              </div>
            </div>
            <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={2.5} />
          </a>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-3">
        💡 Har xil platformalarda narxlar farq qilishi mumkin
      </p>
    </div>
  );
}
