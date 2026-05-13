import { Language } from './types';

type T = Record<Language, string>;

// Markazlashtirilgan tarjimalar - hamma joyda shu ishlatiladi
export const translations = {
  common: {
    view_all: { uz: "Barchasini ko'rish", en: 'View All', ru: 'Посмотреть все' },
    view: { uz: "Ko'rish", en: 'View', ru: 'Посмотреть' },
    book: { uz: 'Buyurtma', en: 'Book', ru: 'Забронировать' },
    search: { uz: 'Qidirish', en: 'Search', ru: 'Поиск' },
    loading: { uz: 'Yuklanmoqda...', en: 'Loading...', ru: 'Загрузка...' },
    not_found: { uz: 'Topilmadi', en: 'Not found', ru: 'Не найдено' },
    per_night: { uz: 'kecha', en: 'night', ru: 'ночь' },
    readmore: { uz: "Ko'proq o'qish", en: 'Read more', ru: 'Читать далее' },
    back: { uz: 'Ortga', en: 'Back', ru: 'Назад' },
    date: { uz: 'Sana', en: 'Date', ru: 'Дата' },
    location: { uz: 'Manzil', en: 'Location', ru: 'Местоположение' },
    free: { uz: 'Bepul', en: 'Free', ru: 'Бесплатно' },
    details: { uz: 'Batafsil', en: 'Details', ru: 'Подробнее' },
  },

  nav: {
    home: { uz: 'Asosiy', en: 'Home', ru: 'Главная' },
    places: { uz: 'Joylar', en: 'Places', ru: 'Места' },
    accommodation: { uz: 'Mehmonxonalar', en: 'Accommodation', ru: 'Отели' },
    restaurants: { uz: 'Restoranlar', en: 'Restaurants', ru: 'Рестораны' },
    tours: { uz: 'Turlar', en: 'Tours', ru: 'Туры' },
    transport: { uz: 'Transport', en: 'Transport', ru: 'Транспорт' },
    events: { uz: 'Tadbirlar', en: 'Events', ru: 'События' },
    news: { uz: 'Yangiliklar', en: 'News', ru: 'Новости' },
    map: { uz: 'Xarita', en: 'Map', ru: 'Карта' },
    trip_planner: { uz: 'Sayohat rejasi', en: 'Trip Planner', ru: 'План поездки' },
    tips: { uz: 'Qo\'llanma', en: 'Travel Tips', ru: 'Советы' },
    faq: { uz: 'FAQ', en: 'FAQ', ru: 'FAQ' },
    contact: { uz: 'Aloqa', en: 'Contact', ru: 'Контакт' },
    favorites: { uz: 'Saqlangan', en: 'Favorites', ru: 'Избранное' },
  },

  home: {
    hero_label: { uz: 'Xorazmni kashf eting', en: 'Discover Khorezm', ru: 'Откройте Хорезм' },
    hero_title: { uz: 'Visit Khorezm', en: 'Visit Khorezm', ru: 'Visit Khorezm' },
    hero_subtitle: {
      uz: "Ichan qal'a, qadimiy minoralar va Xorazmning boy madaniyatini kashf eting",
      en: 'Explore Ichan-Kala, ancient minarets, and the rich culture of Khorezm',
      ru: 'Исследуйте Ичан-Калу, древние минареты и богатую культуру Хорезма',
    },
    search_placeholder: {
      uz: 'Joy, mehmonxona yoki tadbir qidiring...',
      en: 'Search places, hotels or events...',
      ru: 'Поиск мест, отелей или событий...',
    },
    categories_title: { uz: 'Kategoriyalar', en: 'Categories', ru: 'Категории' },
    featured_title: { uz: 'Mashhur joylar', en: 'Featured Places', ru: 'Популярные места' },
    hotels_title: { uz: 'Eng yaxshi mehmonxonalar', en: 'Best Hotels', ru: 'Лучшие отели' },
    events_title: { uz: 'Yaqinlashayotgan tadbirlar', en: 'Upcoming Events', ru: 'Предстоящие события' },
    news_title: { uz: 'Oxirgi yangiliklar', en: 'Latest News', ru: 'Последние новости' },
    explore_khiva: { uz: "Xivani ko'rish", en: 'Explore Khiva', ru: 'Смотреть Хиву' },
    find_hotel: { uz: 'Mehmonxona topish', en: 'Find a Hotel', ru: 'Найти отель' },
  },

  categories: {
    attractions: { uz: 'Diqqatga sazovor joylar', en: 'Attractions', ru: 'Достопримечательности' },
    attractions_count: { uz: 'ta joy', en: 'places', ru: 'мест' },
    hotels: { uz: 'Mehmonxonalar', en: 'Hotels', ru: 'Отели' },
    hotels_count: { uz: 'ta mehmonxona', en: 'hotels', ru: 'отелей' },
    transport: { uz: 'Transport', en: 'Transport', ru: 'Транспорт' },
    transport_count: { uz: "ta yo'nalish", en: 'routes', ru: 'маршрутов' },
    events: { uz: 'Tadbirlar', en: 'Events', ru: 'События' },
    events_count: { uz: 'ta tadbir', en: 'events', ru: 'событий' },
  },

  accommodation: {
    title: { uz: 'Mehmonxonalar', en: 'Accommodation', ru: 'Размещение' },
    subtitle: {
      uz: 'Xiva va Urganchdagi eng yaxshi mehmonxonalar',
      en: 'Best hotels in Khiva and Urgench',
      ru: 'Лучшие отели в Хиве и Ургенче',
    },
    filter_city: { uz: 'Shahar', en: 'City', ru: 'Город' },
    filter_stars: { uz: 'Yulduzlar', en: 'Stars', ru: 'Звёзды' },
    filter_price: { uz: 'Narx', en: 'Price', ru: 'Цена' },
    all_cities: { uz: 'Barcha shaharlar', en: 'All cities', ru: 'Все города' },
    khiva: { uz: 'Xiva', en: 'Khiva', ru: 'Хива' },
    urgench: { uz: 'Urganch', en: 'Urgench', ru: 'Ургенч' },
    no_hotels: { uz: 'Mehmonxonalar topilmadi', en: 'No hotels found', ru: 'Отели не найдены' },
    amenities: { uz: 'Qulayliklar', en: 'Amenities', ru: 'Удобства' },
    similar: { uz: "O'xshash mehmonxonalar", en: 'Similar Hotels', ru: 'Похожие отели' },
  },

  khiva: {
    title: { uz: 'Xiva', en: 'Khiva', ru: 'Хива' },
    subtitle: {
      uz: "Ochiq osmon ostidagi muzey — UNESCO jahon merosi",
      en: 'Open-air museum — UNESCO World Heritage',
      ru: 'Музей под открытым небом — Наследие ЮНЕСКО',
    },
    history: { uz: 'Tarix', en: 'History', ru: 'История' },
    gallery: { uz: 'Galereya', en: 'Gallery', ru: 'Галерея' },
    working_hours: { uz: 'Ish vaqti', en: 'Working Hours', ru: 'Часы работы' },
    entrance_fee: { uz: 'Kirish narxi', en: 'Entrance Fee', ru: 'Входная плата' },
    similar: { uz: "O'xshash joylar", en: 'Similar Places', ru: 'Похожие места' },
    no_attractions: { uz: 'Joylar topilmadi', en: 'No places found', ru: 'Места не найдены' },
  },

  transport: {
    title: { uz: 'Transport', en: 'Transport', ru: 'Транспорт' },
    subtitle: {
      uz: "Aeroportdan Xivagacha qulay yo'llar",
      en: 'Convenient routes from airport to Khiva',
      ru: 'Удобные маршруты из аэропорта в Хиву',
    },
    from: { uz: 'Qayerdan', en: 'From', ru: 'Откуда' },
    to: { uz: 'Qayerga', en: 'To', ru: 'Куда' },
    duration: { uz: 'Vaqt', en: 'Duration', ru: 'Время' },
    price: { uz: 'Narx', en: 'Price', ru: 'Цена' },
  },

  events: {
    title: { uz: 'Tadbirlar', en: 'Events', ru: 'События' },
    subtitle: {
      uz: 'Xorazmdagi eng muhim voqealar va tadbirlar',
      en: 'Important happenings and events in Khorezm',
      ru: 'Важные события и мероприятия в Хорезме',
    },
    upcoming: { uz: 'Kelajak', en: 'Upcoming', ru: 'Предстоящие' },
    all: { uz: 'Barchasi', en: 'All', ru: 'Все' },
    free: { uz: 'Bepul', en: 'Free', ru: 'Бесплатно' },
    paid: { uz: 'Pulli', en: 'Paid', ru: 'Платно' },
    no_events: { uz: 'Tadbirlar topilmadi', en: 'No events found', ru: 'События не найдены' },
  },

  news: {
    title: { uz: 'Yangiliklar', en: 'News', ru: 'Новости' },
    subtitle: {
      uz: 'Xorazm haqida eng so\'nggi yangiliklar',
      en: 'Latest news from Khorezm',
      ru: 'Последние новости из Хорезма',
    },
    author: { uz: 'Muallif', en: 'Author', ru: 'Автор' },
    published: { uz: 'Chop etilgan', en: 'Published', ru: 'Опубликовано' },
    no_news: { uz: 'Yangiliklar topilmadi', en: 'No news found', ru: 'Новости не найдены' },
  },

  contact: {
    title: { uz: 'Aloqa', en: 'Contact', ru: 'Контакт' },
    subtitle: {
      uz: "Savollaringiz bormi? Biz bilan bog'laning",
      en: 'Have questions? Get in touch with us',
      ru: 'Есть вопросы? Свяжитесь с нами',
    },
    name: { uz: 'Ismingiz', en: 'Your name', ru: 'Ваше имя' },
    email: { uz: 'Email', en: 'Email', ru: 'Email' },
    message: { uz: 'Xabar', en: 'Message', ru: 'Сообщение' },
    send: { uz: 'Yuborish', en: 'Send', ru: 'Отправить' },
    success: { uz: 'Xabar yuborildi!', en: 'Message sent!', ru: 'Сообщение отправлено!' },
    error: { uz: 'Xatolik yuz berdi', en: 'An error occurred', ru: 'Произошла ошибка' },
  },

  footer: {
    description: {
      uz: "Xorazm viloyati bo'ylab sayohat qilish uchun to'liq qo'llanma",
      en: 'Complete guide for traveling through Khorezm region',
      ru: 'Полный путеводитель по Хорезмской области',
    },
    quick_links: { uz: 'Tezkor havolalar', en: 'Quick Links', ru: 'Быстрые ссылки' },
    contact_us: { uz: "Bog'lanish", en: 'Contact Us', ru: 'Связаться' },
    copyright: {
      uz: '© 2024 Visit Khorezm. Barcha huquqlar himoyalangan.',
      en: '© 2024 Visit Khorezm. All rights reserved.',
      ru: '© 2024 Visit Khorezm. Все права защищены.',
    },
    newsletter_title: { uz: 'Yangiliklarga obuna', en: 'Subscribe to Newsletter', ru: 'Подписка' },
    newsletter_desc: {
      uz: "Yangi tadbirlar va takliflar haqida birinchi bo'lib xabardor bo'ling",
      en: 'Be the first to know about new events and offers',
      ru: 'Узнавайте первыми о новых событиях',
    },
    newsletter_placeholder: { uz: 'Email manzilingiz', en: 'Your email', ru: 'Ваш email' },
    newsletter_button: { uz: 'Obuna', en: 'Subscribe', ru: 'Подписаться' },
    newsletter_success: { uz: 'Rahmat! Obuna muvaffaqiyatli', en: 'Thanks! Subscribed successfully', ru: 'Спасибо! Вы подписаны' },
  },

  restaurants: {
    title: { uz: 'Restoranlar', en: 'Restaurants', ru: 'Рестораны' },
    subtitle: {
      uz: 'Xorazmning eng yaxshi restoranlari va kafelarida taom tanlang',
      en: 'Choose from the best restaurants and cafes in Khorezm',
      ru: 'Выберите из лучших ресторанов и кафе Хорезма',
    },
    filter_cuisine: { uz: 'Oshxona', en: 'Cuisine', ru: 'Кухня' },
    filter_price: { uz: 'Narx', en: 'Price', ru: 'Цена' },
    all_cuisines: { uz: 'Barcha oshxonalar', en: 'All cuisines', ru: 'Все кухни' },
    halal: { uz: 'Halol', en: 'Halal', ru: 'Халяль' },
    vegetarian: { uz: 'Vegetarian', en: 'Vegetarian', ru: 'Вегетарианское' },
    wifi: { uz: 'WiFi', en: 'WiFi', ru: 'WiFi' },
    parking: { uz: 'Parking', en: 'Parking', ru: 'Парковка' },
    no_restaurants: { uz: 'Restoranlar topilmadi', en: 'No restaurants found', ru: 'Рестораны не найдены' },
  },

  tours: {
    title: { uz: 'Turlar va Ekskursiyalar', en: 'Tours & Excursions', ru: 'Туры и экскурсии' },
    subtitle: {
      uz: 'Professional gidlar bilan tayyor sayohat paketlari',
      en: 'Ready-made travel packages with professional guides',
      ru: 'Готовые туры с профессиональными гидами',
    },
    book_now: { uz: 'Hoziroq band qilish', en: 'Book Now', ru: 'Забронировать' },
    duration: { uz: 'Davomiyligi', en: 'Duration', ru: 'Длительность' },
    max_people: { uz: 'Max kishi', en: 'Max people', ru: 'Макс. человек' },
    difficulty: { uz: 'Qiyinlik', en: 'Difficulty', ru: 'Сложность' },
    itinerary: { uz: 'Kun-bakun reja', en: 'Itinerary', ru: 'Программа' },
    includes: { uz: 'Narxga kiradi', en: 'Includes', ru: 'Включено' },
    excludes: { uz: 'Narxga kirmaydi', en: 'Excludes', ru: 'Не включено' },
    meeting_point: { uz: 'Uchrashuv joyi', en: 'Meeting point', ru: 'Место встречи' },
    guide_languages: { uz: 'Gid tillari', en: 'Guide languages', ru: 'Языки гида' },
    no_tours: { uz: 'Turlar topilmadi', en: 'No tours found', ru: 'Туры не найдены' },
  },

  reviews: {
    title: { uz: 'Sharhlar', en: 'Reviews', ru: 'Отзывы' },
    write_review: { uz: 'Sharh yozish', en: 'Write a review', ru: 'Написать отзыв' },
    your_rating: { uz: 'Sizning reytingingiz', en: 'Your rating', ru: 'Ваша оценка' },
    review_title: { uz: 'Sarlavha', en: 'Title', ru: 'Заголовок' },
    review_comment: { uz: 'Fikringiz', en: 'Your comment', ru: 'Ваш отзыв' },
    country: { uz: 'Davlat', en: 'Country', ru: 'Страна' },
    submit_review: { uz: 'Yuborish', en: 'Submit', ru: 'Отправить' },
    no_reviews: { uz: 'Hali sharhlar yo\'q', en: 'No reviews yet', ru: 'Отзывов пока нет' },
    based_on: { uz: 'asosida', en: 'based on', ru: 'на основе' },
    reviews_count: { uz: 'ta sharh', en: 'reviews', ru: 'отзывов' },
    success: { uz: 'Sharh yuborildi!', en: 'Review submitted!', ru: 'Отзыв отправлен!' },
  },

  faq: {
    title: { uz: 'Tez-tez so\'raladigan savollar', en: 'FAQ', ru: 'Часто задаваемые вопросы' },
    subtitle: {
      uz: 'Sayohat haqida ko\'p so\'raladigan savollar va javoblar',
      en: 'Common questions and answers about traveling',
      ru: 'Часто задаваемые вопросы и ответы о путешествиях',
    },
  },

  map: {
    title: { uz: 'Interaktiv xarita', en: 'Interactive Map', ru: 'Интерактивная карта' },
    subtitle: {
      uz: 'Barcha joylarni bitta xaritada ko\'ring',
      en: 'See all places on one map',
      ru: 'Все места на одной карте',
    },
    filter_all: { uz: 'Hammasi', en: 'All', ru: 'Все' },
    filter_hotels: { uz: 'Mehmonxonalar', en: 'Hotels', ru: 'Отели' },
    filter_places: { uz: 'Joylar', en: 'Places', ru: 'Места' },
    filter_restaurants: { uz: 'Restoranlar', en: 'Restaurants', ru: 'Рестораны' },
  },

  favorites: {
    title: { uz: 'Saqlangan joylar', en: 'Favorites', ru: 'Избранное' },
    subtitle: {
      uz: "Siz saqlagan sevimli joylaringiz",
      en: 'Your saved favorites',
      ru: 'Ваши сохранённые места',
    },
    empty: { uz: 'Hali hech narsa saqlanmagan', en: 'Nothing saved yet', ru: 'Пока ничего не сохранено' },
    add_to_favorites: { uz: 'Sevimlilarga qo\'shish', en: 'Add to favorites', ru: 'В избранное' },
    remove_from_favorites: { uz: 'Olib tashlash', en: 'Remove', ru: 'Удалить' },
  },
} as const;

type Section = keyof typeof translations;

// Helper: tarjimani olish
export function getTranslation(section: Section, key: string, lang: Language): string {
  const sec = translations[section] as Record<string, T>;
  return sec?.[key]?.[lang] ?? key;
}

// Helper: butun seksiyani olish (barcha kalitlar bilan)
export function getSection<S extends Section>(section: S, lang: Language): Record<string, string> {
  const sec = translations[section] as Record<string, T>;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(sec)) {
    out[k] = v[lang];
  }
  return out;
}
