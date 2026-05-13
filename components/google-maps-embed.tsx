'use client';

import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { googleMapsEmbedUrl, googleMapsDirectionsUrl, googleMapsPlaceUrl, LocationQuery } from '@/lib/external-links';

interface Props {
  name: string;
  latitude: number;
  longitude: number;
  className?: string;
  height?: string;
}

export function GoogleMapsEmbed({ name, latitude, longitude, className = '', height = '300px' }: Props) {
  const q: LocationQuery = { name, latitude, longitude };
  const embedUrl = googleMapsEmbedUrl(q);
  const dirUrl = googleMapsDirectionsUrl(q);
  const placeUrl = googleMapsPlaceUrl(q);

  return (
    <div className={`glass rounded-2xl overflow-hidden ${className}`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" strokeWidth={2.5} />
          <div>
            <h3 className="font-semibold text-sm">Google Maps</h3>
            <p className="text-[10px] text-muted-foreground">{latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href={placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button p-2 rounded-full"
            title="Open in Google Maps"
          >
            <ExternalLink size={14} strokeWidth={2.5} />
          </a>
          <a
            href={dirUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1"
            title="Directions"
          >
            <Navigation size={12} strokeWidth={2.5} /> Yo'l
          </a>
        </div>
      </div>
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${name} — Google Maps`}
      />
    </div>
  );
}
