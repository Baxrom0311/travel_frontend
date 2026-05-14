'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { ChevronDown } from 'lucide-react';

const FAQS = {
  uz: [
    { q: "Xivaga qanday borish mumkin?", a: "Urganch xalqaro aeroportiga parvoz qilib, u yerdan taksi (30-40 daqiqa), avtobus yoki poyezd bilan Xivaga yetib borishingiz mumkin. Yangi aeroport terminali 2026-yilda ochildi." },
    { q: "Xivaning eng yaxshi fasllari qachon?", a: "Sayohat uchun eng yaxshi vaqt - aprel-may va sentyabr-oktyabr. Yozda (iyun-avgust) juda issiq (40°C+), qishda (dekabr-fevral) sovuq bo'ladi." },
    { q: "Qaysi valyuta ishlatiladi?", a: "O'zbekiston so'mi (UZS). Bank kartalari shaharning ko'p joyida qabul qilinadi. Naqd pul uchun ATM'lar mavjud. Valyuta ayirboshlash shoxobchalari aeroport va bozor yaqinida bor." },
    { q: "Viza kerakmi?", a: "30+ davlat fuqarolari uchun O'zbekistonga viza kerak emas (30 kungacha). Qolganlar uchun e-viza tizimi mavjud. Rasmiy ma'lumot: e-visa.gov.uz" },
    { q: "Ichan-qal'aga kirish qancha turadi?", a: "Umumiy bilet (barcha muzeylar) - 150,000 UZS (~$12). Alohida obidalar uchun 30,000-60,000 UZS. Chet ellik sayyohlar uchun bilet narxi boshqacha bo'lishi mumkin." },
    { q: "Qanday taom tatib ko'rishim kerak?", a: "Majburiy taomlar: shivit oshi (yashil makaron), tuxum barak, manty, Xorazm plovi, qovun taomlari. Restoranlarda halal taomlar mavjud." },
    { q: "Mehmonxona narxi qancha?", a: "Byudjet mehmonxona - 150-300 ming UZS/kecha, o'rtacha - 400-600 ming, premium (5★) - 700+ ming UZS. Xiva ichida turli variantlar bor." },
    { q: "WiFi bormi?", a: "Ha, aksariyat mehmonxonalar, restoranlar va kafelarda bepul WiFi. Aeroport va vokzalda ham mavjud. SIM karta olsangiz internet xizmati juda arzon." },
  ],
  en: [
    { q: "How do I get to Khiva?", a: "Fly to Urgench International Airport, then take a taxi (30-40 minutes), bus or train to Khiva. The new airport terminal opened in 2026." },
    { q: "What is the best season to visit?", a: "The best time to travel is April-May and September-October. Summer (June-August) is very hot (40°C+), winter (December-February) is cold." },
    { q: "What currency is used?", a: "Uzbek Som (UZS). Bank cards are accepted in most places in the city. ATMs available for cash. Currency exchanges are near the airport and bazaar." },
    { q: "Do I need a visa?", a: "Citizens of 30+ countries don't need a visa to Uzbekistan (up to 30 days). Others can apply for e-visa. Official info: e-visa.gov.uz" },
    { q: "How much does Ichan-Kala entry cost?", a: "General ticket (all museums) - 150,000 UZS (~$12). Individual monuments 30,000-60,000 UZS. Foreign tourist prices may vary." },
    { q: "What food should I try?", a: "Must-try dishes: shivit oshi (green noodles), tukhum barak, manty, Khorezm pilaf, melon dishes. Halal food available in restaurants." },
    { q: "How much do hotels cost?", a: "Budget hotel - 150-300k UZS/night, mid-range - 400-600k, premium (5★) - 700k+ UZS. Various options available in Khiva." },
    { q: "Is there WiFi?", a: "Yes, most hotels, restaurants and cafes have free WiFi. Also available at airport and train station. SIM cards provide affordable internet." },
  ],
  ru: [
    { q: "Как добраться до Хивы?", a: "Прилетите в Международный аэропорт Ургенча, затем такси (30-40 мин), автобус или поезд. Новый терминал открылся в 2026." },
    { q: "Когда лучше посещать?", a: "Лучшее время - апрель-май и сентябрь-октябрь. Летом (июнь-август) очень жарко (40°C+), зимой (декабрь-февраль) холодно." },
    { q: "Какая валюта используется?", a: "Узбекский сум (UZS). Карты принимаются в большинстве мест. Банкоматы есть. Обменники возле аэропорта и базара." },
    { q: "Нужна ли виза?", a: "Гражданам 30+ стран виза не нужна (до 30 дней). Остальные могут оформить e-visa. Подробнее: e-visa.gov.uz" },
    { q: "Сколько стоит вход в Ичан-Калу?", a: "Общий билет - 150,000 UZS (~$12). Отдельные памятники 30,000-60,000 UZS." },
    { q: "Что попробовать из еды?", a: "Обязательно: шивит оши, тухум барак, манты, хорезмский плов, дыня. Халяль есть в ресторанах." },
    { q: "Сколько стоят отели?", a: "Бюджет - 150-300 тыс UZS/ночь, средний - 400-600, премиум (5★) - 700+ тыс UZS." },
    { q: "Есть ли WiFi?", a: "Да, в большинстве отелей, ресторанов и кафе бесплатный WiFi. Также в аэропорту и вокзале." },
  ],
};

export default function FAQPage() {
  const { language } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const t = getSection('faq', language);
  const items = FAQS[language] || FAQS.uz;

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[300px] overflow-hidden">
        <Image src="/images/juma-mosque.jpg" alt={t.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
              >
                <span className="font-semibold text-foreground">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-primary transition-transform duration-300 shrink-0 ml-3 ${openIdx === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-4 text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
