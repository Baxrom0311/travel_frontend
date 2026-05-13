'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Hotel } from '@/lib/types';
import { KHOREZM_CENTER } from '@/lib/constants';
import { useI18n } from '@/lib/i18n-context';
import { getLocalized, formatPrice } from '@/lib/i18n-helpers';
import 'leaflet/dist/leaflet.css';

const hotelIcon = new Icon({
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

interface AccommodationMapProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
}

function MapViewUpdater({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, map, zoom]);

  return null;
}

export function AccommodationMap({
  hotels,
  selectedHotel,
}: AccommodationMapProps) {
  const { language } = useI18n();

  const center = useMemo<LatLngExpression>(
    () =>
      selectedHotel && selectedHotel.latitude && selectedHotel.longitude
        ? [selectedHotel.latitude, selectedHotel.longitude]
        : KHOREZM_CENTER,
    [selectedHotel?.latitude, selectedHotel?.longitude]
  );
  const zoom = selectedHotel ? 13 : 10;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <MapViewUpdater center={center} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {hotels
        .filter((h) => h.latitude && h.longitude)
        .map((hotel) => (
          <Marker
            key={hotel.id}
            position={[hotel.latitude, hotel.longitude]}
            icon={hotelIcon}
          >
            <Popup>
              <div className="w-48">
                <h3 className="font-semibold text-sm mb-1">
                  {getLocalized(hotel, 'name', language) || hotel.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  {(
                    getLocalized(hotel, 'description', language) ||
                    hotel.description ||
                    ''
                  ).substring(0, 80)}
                  ...
                </p>
                <p className="text-sm font-semibold" style={{ color: '#d4a843' }}>
                  {formatPrice(hotel.price_per_night)}
                </p>
                {hotel.stars > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {'★'.repeat(hotel.stars)} ({hotel.rating.toFixed(1)}/10)
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
