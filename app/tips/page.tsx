'use client';

import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import {
  Phone, AlertTriangle, Heart, Shield, Flame, Car,
  CreditCard, Wifi, Zap, Plane, Train, Bus,
  Clock, Languages, Banknote, Globe,
} from 'lucide-react';

const EMERGENCY = [
  { icon: AlertTriangle, label: 'Yagona favqulodda', number: '112', color: 'bg-red-500', desc: 'Barcha xizmatlar' },
  { icon: Heart, label: 'Tez yordam', number: '103', color: 'bg-pink-500', desc: 'Tibbiy yordam' },
  { icon: Shield, label: 'Politsiya', number: '102', color: 'bg-blue-500', desc: 'Jinoyat/xavfsizlik' },
  { icon: Flame, label: 'Yong\'in xizmati', number: '101', color: 'bg-orange-500', desc: 'Yong\'in/ofat' },
  { icon: Car, label: 'Yo\'l politsiyasi', number: '104', color: 'bg-slate-500', desc: 'Avtohalokat' },
];

const USEFUL = [
  { icon: Phone, label: 'Xorazm turizm', number: '+998 61 226 56 56', desc: 'Turist yordam markazi' },
  { icon: Phone, label: 'Airport Urganch', number: '+998 62 223 45 67', desc: 'Xalqaro aeroport' },
  { icon: Phone, label: 'Xiva muzeylari', number: '+998 62 375 77 79', desc: 'Ichan-qal\'a admin' },
];

const PRACTICAL = [
  {
    icon: Banknote,
    title: 'Valyuta',
    items: [
      "O'zbek so'mi (UZS) — asosiy valyuta",
      'Banklar: 9:00-17:00, shanba yarim kun',
      'Bankomatlar: Visa, Mastercard qabul qiladi',
      'Exchange: Airport + bozor yaqinida',
    ],
  },
  {
    icon: Wifi,
    title: 'Aloqa / Internet',
    items: [
      'Ucell, Beeline, Mobiuz operatorlari',
      'SIM karta: pasport bilan arzon (3000-5000 UZS)',
      'Internet: aksariyat mehmonxonalarda bepul WiFi',
      '4G qamrovi: shaharlarda yaxshi',
    ],
  },
  {
    icon: Zap,
    title: 'Elektr energiyasi',
    items: [
      'Voltaj: 220V, 50Hz',
      'Rozetka: Tip C, F (Yevropa)',
      "Adapter USA/UK dan olib kelsangiz kerak bo'ladi",
    ],
  },
  {
    icon: Clock,
    title: 'Vaqt zonasi',
    items: [
      'GMT+5 (Asia/Tashkent)',
      'DST yo\'q — butun yil davomida bir xil',
      "Bozorlar: 8:00-18:00",
      "Muzeylar: 9:00-18:00 (dushanba yopiq bo'lishi mumkin)",
    ],
  },
  {
    icon: Languages,
    title: 'Tillar',
    items: [
      "O'zbek — asosiy davlat tili",
      'Rus tili — keng tarqalgan',
      'Ingliz tili: yoshlar va turistik joylarda',
      'Asosiy iboralarni o\'rganing: Salom, Rahmat, Iltimos',
    ],
  },
  {
    icon: Globe,
    title: 'Viza',
    items: [
      '30+ davlat fuqarolari uchun vizasiz (30 kun)',
      'E-visa: e-visa.gov.uz',
      'Pasport: 6 oydan ortiq amal qilish muddati',
      "Ro'yxatdan o'tish: 3 kun ichida mehmonxonada",
    ],
  },
];

const TIPS = [
  { icon: '💧', title: 'Suv', text: 'Quyoshli kunlarda ko\'p suv iching. Har doim suv olib yuring.' },
  { icon: '🕌', title: 'Kiyinish', text: 'Dinga hurmat — masjidlarga yopiq kiyimda boring.' },
  { icon: '🧴', title: 'Quyoshdan himoya', text: 'Quyoshdan himoya krem, shapka, ko\'zoynak majburiy.' },
  { icon: '📸', title: 'Fotosurat', text: 'Harbiy obyektlarda suratga olmang. Odamlardan ijozat so\'rang.' },
  { icon: '🛍️', title: 'Savdolashish', text: 'Bozorlarda savdolashish odat. 20-30% tushiradi.' },
  { icon: '🍽️', title: 'Mahalliy taom', text: 'Plov, shashlik, manty, lag\'mon majburiy tatib ko\'ring.' },
  { icon: '🚕', title: 'Taxi', text: 'Yandex Go yoki rasmiy taxi stoyankasidan oling.' },
  { icon: '💵', title: 'Chayon puli', text: 'Ofisiantlar uchun 5-10%, gidlar uchun $5-10.' },
];

export default function TipsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[350px] overflow-hidden">
        <Image src="/images/ichan-kala.jpg" alt="Travel tips" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-3">Sayohat qo'llanmasi</h1>
          <p className="text-gray-200 text-lg max-w-2xl">
            Xorazmga sayohatdan oldin bilib olishingiz kerak bo'lgan barcha muhim ma'lumotlar
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Emergency */}
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={32} strokeWidth={2.5} />
            Favqulodda raqamlar
          </h2>
          <p className="text-muted-foreground mb-6">Bepul, 24/7 ishlaydi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {EMERGENCY.map((e) => (
              <a
                key={e.label}
                href={`tel:${e.number}`}
                className="glass-card rounded-2xl p-5 text-center group hover:scale-105 transition-all"
              >
                <div className={`inline-flex w-14 h-14 rounded-xl ${e.color} items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <e.icon className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <div className="text-3xl font-bold font-serif mb-1">{e.number}</div>
                <div className="text-sm font-semibold">{e.label}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{e.desc}</div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Useful contacts */}
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Phone className="text-primary" size={32} strokeWidth={2.5} />
            Foydali raqamlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {USEFUL.map((u) => (
              <a key={u.label} href={`tel:${u.number.replace(/\s/g, '')}`} className="glass-card rounded-2xl p-5 group">
                <u.icon className="text-primary mb-3" size={24} strokeWidth={2.5} />
                <div className="font-semibold text-lg mb-1">{u.label}</div>
                <div className="text-primary font-bold mb-1">{u.number}</div>
                <div className="text-xs text-muted-foreground">{u.desc}</div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Practical */}
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Amaliy ma'lumotlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRACTICAL.map((p) => (
              <div key={p.title} className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <p.icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-serif font-bold text-lg">{p.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {p.items.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tips */}
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">💡 Sayohat maslahatlari</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIPS.map((tip) => (
              <div key={tip.title} className="glass-card rounded-2xl p-5 text-center group">
                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">{tip.icon}</div>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-xs text-muted-foreground">{tip.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
}
