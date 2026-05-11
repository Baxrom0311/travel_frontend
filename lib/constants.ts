import { Language, Translations } from './types';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'uz', label: 'Ўз' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'РУ' },
];

export const ROUTES = {
  home: '/',
  accommodation: '/accommodation',
  transport: '/transport',
  khiva: '/khiva',
  contact: '/contact',
} as const;

export const NAVIGATION_ITEMS = {
  uz: [
    { label: 'Асосий', href: '/' },
    { label: 'Меҳманхона', href: '/accommodation' },
    { label: 'Транспорт', href: '/transport' },
    { label: 'Хива', href: '/khiva' },
    { label: 'Контакт', href: '/contact' },
  ],
  en: [
    { label: 'Home', href: '/' },
    { label: 'Accommodation', href: '/accommodation' },
    { label: 'Transport', href: '/transport' },
    { label: 'Khiva', href: '/khiva' },
    { label: 'Contact', href: '/contact' },
  ],
  ru: [
    { label: 'Главная', href: '/' },
    { label: 'Размещение', href: '/accommodation' },
    { label: 'Транспорт', href: '/transport' },
    { label: 'Хива', href: '/khiva' },
    { label: 'Контакт', href: '/contact' },
  ],
};

export const TRANSLATIONS: Translations = {
  'hero.title': {
    uz: 'Хорезмга қош келибсиз',
    en: 'Welcome to Khorezm',
    ru: 'Добро пожаловать в Хорезм',
  },
  'hero.subtitle': {
    uz: 'Ўзбекистонининг энг қадимий ҳудудини кашф этинг',
    en: 'Discover the ancient heart of Uzbekistan',
    ru: 'Откройте для себя древнее сердце Узбекистана',
  },
  'hero.explore': {
    uz: 'Кашф етинг',
    en: 'Explore',
    ru: 'Исследовать',
  },
  'stats.title': {
    uz: 'Кўчайди ва ўсади',
    en: 'By the Numbers',
    ru: 'Краткая статистика',
  },
  'stats.visitors': {
    uz: 'Сайёҳлар',
    en: 'Visitors',
    ru: 'Посетители',
  },
  'stats.hotels': {
    uz: 'Меҳманхонаси',
    en: 'Hotels',
    ru: 'Отели',
  },
  'stats.attractions': {
    uz: 'Жойлашувлар',
    en: 'Attractions',
    ru: 'Достопримечательности',
  },
  'stats.guides': {
    uz: 'Гидлар',
    en: 'Expert Guides',
    ru: 'Опытные гиды',
  },
  'features.title': {
    uz: 'Нега Хорезмни танлайсиз',
    en: 'Why Choose Khorezm',
    ru: 'Почему выбрать Хорезм',
  },
  'features.rich_culture': {
    uz: 'Бойитирилган маданият',
    en: 'Rich Culture',
    ru: 'Богатая культура',
  },
  'features.ancient_history': {
    uz: 'Қадимий тарих',
    en: 'Ancient History',
    ru: 'Древняя история',
  },
  'features.expert_guides': {
    uz: 'Маҳир гидлар',
    en: 'Expert Guides',
    ru: 'Опытные гиды',
  },
  'features.comfortable_stay': {
    uz: 'Ўтирмали қолиш',
    en: 'Comfortable Stay',
    ru: 'Комфортное проживание',
  },
  'accommodation.title': {
    uz: 'Меҳманхона',
    en: 'Accommodation',
    ru: 'Размещение',
  },
  'accommodation.filter': {
    uz: 'Сўзув',
    en: 'Filter',
    ru: 'Фильтр',
  },
  'transport.title': {
    uz: 'Транспорт',
    en: 'Transport',
    ru: 'Транспорт',
  },
  'khiva.title': {
    uz: 'Хива',
    en: 'Khiva',
    ru: 'Хива',
  },
  'contact.title': {
    uz: 'Контакт',
    en: 'Contact',
    ru: 'Контакт',
  },
  'contact.name': {
    uz: 'Ишм',
    en: 'Name',
    ru: 'Имя',
  },
  'contact.email': {
    uz: 'Электрон почтаси',
    en: 'Email',
    ru: 'Электронная почта',
  },
  'contact.message': {
    uz: 'Хабар',
    en: 'Message',
    ru: 'Сообщение',
  },
  'contact.send': {
    uz: 'Юбориш',
    en: 'Send',
    ru: 'Отправить',
  },
  'rating': {
    uz: 'Баҳоси',
    en: 'Rating',
    ru: 'Рейтинг',
  },
  'price': {
    uz: 'Нарх',
    en: 'Price',
    ru: 'Цена',
  },
};

// Sample hotel data with Khorezm images
export const SAMPLE_HOTELS = [
  {
    id: 1,
    name: 'Khiva Palace Hotel',
    description: 'Luxury traditional hotel in historic Khiva',
    price: 150,
    rating: 4.8,
    location: { lat: 41.3786, lng: 60.3592 },
    images: ['/images/hotel-traditional.jpg', '/images/khiva-main.jpg'],
    amenities: ['WiFi', 'Restaurant', 'Courtyard', 'Parking'],
  },
  {
    id: 2,
    name: 'Khorezm Heritage Inn',
    description: 'Traditional caravanserai-style accommodation',
    price: 120,
    rating: 4.6,
    location: { lat: 41.3880, lng: 60.3700 },
    images: ['/images/caravan.jpg', '/images/bazaar.jpg'],
    amenities: ['WiFi', 'Garden', 'Traditional Meals', 'Tours'],
  },
  {
    id: 3,
    name: 'Desert Rose Resort',
    description: 'Modern comfort with traditional charm',
    price: 180,
    rating: 4.9,
    location: { lat: 41.3700, lng: 60.3400 },
    images: ['/images/aral-sea.jpg', '/images/hotel-traditional.jpg'],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Spa'],
  },
];

// Sample attractions with Khorezm images
export const SAMPLE_ATTRACTIONS = [
  {
    id: 1,
    name: 'Ichan Kala',
    description: 'Ancient city walls and gates of Khiva',
    location: { lat: 41.3786, lng: 60.3592 },
    image: '/images/ichan-kala.jpg',
    category: 'Historical Gate',
  },
  {
    id: 2,
    name: 'Juma Mosque',
    description: 'Historic mosque with 213 wooden columns',
    location: { lat: 41.3800, lng: 60.3600 },
    image: '/images/juma-mosque.jpg',
    category: 'Mosque',
  },
  {
    id: 3,
    name: 'Kalta Minor',
    description: 'Unfinished minaret with turquoise tiles',
    location: { lat: 41.3770, lng: 60.3580 },
    image: '/images/kalta-minor.jpg',
    category: 'Minaret',
  },
  {
    id: 4,
    name: 'Khan Palace',
    description: 'Former residence of the Khan with intricate tilework',
    location: { lat: 41.3810, lng: 60.3610 },
    image: '/images/topkapi-palace.jpg',
    category: 'Palace',
  },
  {
    id: 5,
    name: 'Khorezm Museum',
    description: 'State museum showcasing regional history',
    location: { lat: 41.3750, lng: 60.3550 },
    image: '/images/khorezm-palace.jpg',
    category: 'Museum',
  },
];

// Sample transport options
export const SAMPLE_TRANSPORT = [
  {
    id: 1,
    name: 'City Taxi Service',
    type: 'Taxi',
    price: 5,
    capacity: 4,
    description: 'Quick rides around Khiva',
    image: '/images/caravan.jpg',
  },
  {
    id: 2,
    name: 'Silk Road Tours',
    type: 'Car Rental',
    price: 50,
    capacity: 5,
    description: 'Explore the entire Khorezm region',
    image: '/images/bazaar.jpg',
  },
  {
    id: 3,
    name: 'Desert Express',
    type: 'Shuttle',
    price: 15,
    capacity: 8,
    description: 'Group transportation to attractions',
    image: '/images/aral-sea.jpg',
  },
  {
    id: 4,
    name: 'Regional Bus',
    type: 'Bus',
    price: 3,
    capacity: 40,
    description: 'Budget-friendly city transport',
    image: '/images/khiva-main.jpg',
  },
];

// Homepage slideshow images
export const HOMEPAGE_IMAGES = [
  '/images/khiva-main.jpg',
  '/images/juma-mosque.jpg',
  '/images/kalta-minor.jpg',
  '/images/bazaar.jpg',
];
