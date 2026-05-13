# 🏛️ Visit Khorezm — Frontend

Xorazm viloyati turizm portali — Next.js + TypeScript + Liquid Glass dizayn.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.2-cyan)

## ✨ Features

- 🎨 **Liquid Glass Design** — Zamonaviy glass morphism
- 🌐 **3 Language Support** — UZ/EN/RU
- 🗺️ **Interactive Map** — Leaflet bilan (hotels, places, restaurants)
- ❤️ **Favorites** — localStorage asosida
- ⭐ **Reviews System** — Har bir obyektda
- 🔍 **Global Search** — Barcha kontent bo'yicha
- 📱 **Responsive** — Mobile + Desktop
- 🎬 **Hero Video** — Autoplay background
- 🔗 **SEO Optimized** — Sitemap, robots, metadata
- ⚡ **Fast** — Static generation + Image optimization

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/visit-khorezm-frontend.git
cd visit-khorezm-frontend

# Install
pnpm install
# or: npm install

# Environment
echo "NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api" > .env.local

# Dev server
pnpm dev
```

Ochish: `http://localhost:3000`

## 📄 Pages (22 ta)

### Public Pages
- `/` — Bosh sahifa (Hero + Search + 6 seksiya)
- `/khiva` — Diqqatga sazovor joylar
- `/khiva/[id]` — Joy tafsiloti (gallery + history)
- `/accommodation` — Mehmonxonalar
- `/accommodation/[id]` — Mehmonxona tafsiloti
- `/restaurants` — Restoranlar
- `/restaurants/[id]` — Restoran tafsiloti
- `/tours` — Turlar
- `/tours/[slug]` — Tur tafsiloti (itinerary)
- `/transport` — Transport yo'nalishlari
- `/events` — Tadbirlar
- `/events/[id]` — Tadbir tafsiloti
- `/news` — Yangiliklar
- `/news/[slug]` — Yangilik tafsiloti
- `/map` — Interaktiv xarita
- `/favorites` — Saqlangan joylar
- `/faq` — Tez-tez so'raladigan savollar
- `/search` — Global qidiruv
- `/contact` — Aloqa
- `404` — Not Found

### SEO
- `/sitemap.xml`
- `/robots.txt`

## 🏗️ Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route pages
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Liquid Glass styles
│   ├── sitemap.ts
│   └── robots.ts
├── components/            # React komponentlar
│   ├── ui/               # shadcn/ui
│   ├── navbar.tsx        # Glass navbar (scroll-aware)
│   ├── footer.tsx        # Footer + Newsletter
│   ├── hero-video.tsx
│   ├── search-bar.tsx
│   ├── favorite-button.tsx
│   ├── newsletter.tsx
│   ├── reviews-section.tsx
│   └── all-places-map.tsx
├── hooks/
│   └── use-favorites.ts   # localStorage hook
├── lib/
│   ├── types.ts           # TypeScript types (backend bilan sinxron)
│   ├── translations.ts    # UZ/EN/RU tarjimalar
│   ├── api-client.ts      # API wrapper
│   ├── i18n-context.tsx   # i18n provider
│   ├── i18n-helpers.ts
│   └── constants.ts
├── public/
│   ├── images/            # Static images
│   └── videos/            # Hero videos
├── styles/                # Tailwind
├── next.config.mjs        # Image optimization
├── tsconfig.json
└── package.json
```

## 🎨 Design System

### Liquid Glass Classes
```css
.glass         /* Standard glass effect */
.glass-strong  /* Stronger blur */
.glass-card    /* Card with hover */
.glass-nav     /* Navigation bar */
.glass-nav-dark /* Transparent nav */
.glass-button  /* Button */
.gradient-text /* Brand gradient */
.liquid-shine  /* Animated shine */
.float         /* Floating animation */
```

### Colors
```css
--primary: #0d746d      /* Teal */
--accent: #d5a642       /* Gold */
--background: #f0f7ff   /* Sky blue */
```

### Typography
- **Serif**: Playfair Display (headings)
- **Sans**: Outfit (body)

## 🌐 Internationalization

Tarjimalar `lib/translations.ts`'da markazlashgan:

```typescript
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';

const { language } = useI18n();
const t = getSection('home', language);
// t.hero_title, t.hero_subtitle, ...
```

Til o'zgartirish: Navbar'dagi `UZ/EN/RU` tugmalari orqali (localStorage'ga saqlanadi).

## 🔌 API Integration

```typescript
import { getHotels, getHomeSummary } from '@/lib/api-client';

// Bosh sahifa
const data = await getHomeSummary('uz');

// Filterlar bilan
const hotels = await getHotels({ city: 'khiva', stars: 5 }, 'en');
```

Barcha API funksiyalari:
- `getHomeSummary()` — Aggregate data
- `getHotels()`, `getHotelById()`, `getRelatedHotels()`
- `getAttractions()`, `getAttractionById()`
- `getRestaurants()`, `getRestaurantById()`
- `getTours()`, `getTourBySlug()`
- `getEvents()`, `getNews()`
- `globalSearch()`
- `submitContact()`, `submitReview()`
- `subscribeNewsletter()`

## 💾 Favorites (localStorage)

```typescript
import { useFavorites } from '@/hooks/use-favorites';

const { favorites, toggle, isFavorite, count } = useFavorites();

toggle({ type: 'hotel', id: 1, name: 'Hotel X', href: '/accommodation/1' });
```

## 🗺️ Interactive Map

Leaflet + OpenStreetMap:
- 🏨 Blue markers — Hotels
- 🏛️ Amber markers — Attractions
- 🍽️ Orange markers — Restaurants
- Filter by type
- Click marker → Popup with link

## 📱 Components

### FavoriteButton
```tsx
<FavoriteButton
  type="hotel"
  id={hotel.id}
  name={hotel.name}
  image={hotel.cover_image}
  href={`/accommodation/${hotel.id}`}
/>
```

### SearchBar
```tsx
<SearchBar
  placeholder="Search..."
  size="lg"
  variant="glass"
/>
```

### ReviewsSection
```tsx
<ReviewsSection targetType="restaurant" targetId={restaurant.id} />
```

## 🔧 Environment

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Production:
```env
NEXT_PUBLIC_API_URL=https://api.visitkhorezm.uz/api
```

## 📦 Build & Deploy

```bash
# Production build
pnpm build

# Local production
pnpm start

# Lint
pnpm lint
```

### Deployment Platforms
- **Vercel** — Recommended (auto-deploy from GitHub)
- **Netlify** — Alternative
- **Self-hosted** — `pnpm build && pnpm start`

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Components | Radix UI + shadcn/ui |
| Maps | Leaflet + react-leaflet |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| Animations | tw-animate-css |

## 📄 License

MIT

## 🔗 Related

- **Backend API**: [visit-khorezm-backend](https://github.com/YOUR_USERNAME/visit-khorezm-backend)

## 📞 Contact

- Email: info@visitkhorezm.uz
- Website: https://visitkhorezm.uz
