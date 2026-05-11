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

// Homepage slideshow uchun mahalliy rasmlar (fallback)
// Backend cover_image qaytarganida o'rnatiladi
export const HOMEPAGE_IMAGES = [
  '/images/khiva-main.jpg',
  '/images/juma-mosque.jpg',
  '/images/kalta-minor.jpg',
  '/images/bazaar.jpg',
];

// Placeholder rasm fallback'lari (backenddan rasm kelmasa)
export const FALLBACK_IMAGES = {
  hotel: '/images/hotel-traditional.jpg',
  attraction: '/images/khiva-main.jpg',
  transport: '/images/caravan.jpg',
};

// Map markazi (Khorezm region)
export const KHOREZM_CENTER: [number, number] = [41.5500, 60.6300];
export const KHIVA_CENTER: [number, number] = [41.3786, 60.3592];
