/**
 * JSON-LD structured data for SEO (schema.org).
 * Helps Google show rich results (ratings, prices, images).
 */

interface Props {
  data: Record<string, any>;
}

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ============ SCHEMA GENERATORS ============

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Visit Khorezm',
    url: 'https://visitkhorezm.uz',
    logo: 'https://visitkhorezm.uz/icon-512.png',
    description: 'Xorazm viloyati turizm portali',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Khiva',
      addressRegion: 'Khorezm',
      addressCountry: 'UZ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998 61 226 56 56',
      contactType: 'Customer Service',
      email: 'info@visitkhorezm.uz',
      availableLanguage: ['uz', 'en', 'ru'],
    },
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Visit Khorezm',
    url: 'https://visitkhorezm.uz',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://visitkhorezm.uz/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function hotelSchema(hotel: {
  id: number;
  name: string;
  description: string;
  rating: number;
  stars: number;
  price_per_night: number;
  latitude: number;
  longitude: number;
  address_i18n: string;
  cover_image?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    description: hotel.description,
    starRating: {
      '@type': 'Rating',
      ratingValue: hotel.stars,
      bestRating: 5,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: hotel.rating,
      bestRating: 10,
      ratingCount: 1,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotel.address_i18n,
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: hotel.latitude,
      longitude: hotel.longitude,
    },
    priceRange: `${hotel.price_per_night} UZS`,
    image: hotel.cover_image || '',
    url: `https://visitkhorezm.uz/accommodation/${hotel.id}`,
  };
}

export function touristAttractionSchema(attraction: {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  cover_image?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.description,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: attraction.latitude,
      longitude: attraction.longitude,
    },
    image: attraction.cover_image || '',
    url: `https://visitkhorezm.uz/khiva/${attraction.id}`,
  };
}

export function restaurantSchema(r: {
  id: number;
  name: string;
  description: string;
  rating: number;
  price_range: string;
  latitude: number;
  longitude: number;
  address_i18n: string;
  cover_image?: string | null;
  cuisines: { name: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: r.name,
    description: r.description,
    servesCuisine: r.cuisines.map((c) => c.name),
    priceRange: r.price_range,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: r.rating,
      bestRating: 5,
      ratingCount: 1,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: r.address_i18n,
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: r.latitude,
      longitude: r.longitude,
    },
    image: r.cover_image || '',
    url: `https://visitkhorezm.uz/restaurants/${r.id}`,
  };
}

export function articleSchema(news: {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  published_at: string;
  cover_image_url?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.excerpt,
    articleBody: news.content || news.excerpt,
    author: {
      '@type': 'Person',
      name: news.author || 'Visit Khorezm',
    },
    datePublished: news.published_at,
    image: news.cover_image_url || '',
    url: `https://visitkhorezm.uz/news/${news.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Visit Khorezm',
      logo: { '@type': 'ImageObject', url: 'https://visitkhorezm.uz/icon-512.png' },
    },
  };
}

export function eventSchema(event: {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date?: string | null;
  location: string;
  latitude?: number;
  longitude?: number;
  is_free: boolean;
  price: number;
  cover_image_url?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.start_date,
    endDate: event.end_date || event.start_date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location,
        addressCountry: 'UZ',
      },
      ...(event.latitude && event.longitude
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: event.latitude,
              longitude: event.longitude,
            },
          }
        : {}),
    },
    offers: {
      '@type': 'Offer',
      price: event.is_free ? '0' : String(event.price),
      priceCurrency: 'UZS',
      availability: 'https://schema.org/InStock',
    },
    image: event.cover_image_url || '',
    url: `https://visitkhorezm.uz/events/${event.id}`,
  };
}

export function breadcrumbSchema(items: { label: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.url ? { item: `https://visitkhorezm.uz${item.url}` } : {}),
    })),
  };
}
