'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Attraction } from '@/lib/types';
import { KHIVA_CENTER } from '@/lib/constants';
import { useI18n } from '@/lib/i18n-context';
import { getLocalized } from '@/lib/i18n-helpers';
import 'leaflet/dist/leaflet.css';

const attractionIcon = new Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface KhivaMapProps {
  attractions: Attraction[];
  selectedAttraction: Attraction | null;
}

export function KhivaMap({ attractions, selectedAttraction }: KhivaMapProps) {
  const { language } = useI18n();

  const center: LatLngExpression =
    selectedAttraction &&
    selectedAttraction.latitude &&
    selectedAttraction.longitude
      ? [selectedAttraction.latitude, selectedAttraction.longitude]
      : KHIVA_CENTER;

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      key={selectedAttraction?.id || 'default'}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {attractions
        .filter((a) => a.latitude && a.longitude)
        .map((attraction) => (
          <Marker
            key={attraction.id}
            position={[attraction.latitude, attraction.longitude]}
            icon={attractionIcon}
          >
            <Popup>
              <div className="w-48">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{attraction.icon || '📍'}</span>
                  <h3 className="font-semibold text-sm">
                    {getLocalized(attraction, 'name', language) ||
                      attraction.name}
                  </h3>
                </div>
                <p className="text-xs text-gray-600">
                  {(
                    getLocalized(attraction, 'description', language) ||
                    attraction.description ||
                    ''
                  ).substring(0, 100)}
                  ...
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
