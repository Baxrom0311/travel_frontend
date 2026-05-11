'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { NAVIGATION_ITEMS } from '@/lib/constants';

export function Footer() {
  const { language } = useI18n();
  const navItems = NAVIGATION_ITEMS[language];

  const translations = {
    uz: {
      about: 'Биз хақимизда',
      quick_links: 'Тез ҳавола',
      contact: 'Контакт',
      rights: 'Барча ҳуқуқлар сақланган.',
    },
    en: {
      about: 'About Us',
      quick_links: 'Quick Links',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    ru: {
      about: 'О нас',
      quick_links: 'Быстрые ссылки',
      contact: 'Контакт',
      rights: 'Все права защищены.',
    },
  };

  const t = translations[language];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">
              Khorezm
            </h3>
            <p className="text-muted-foreground text-sm">
              {t.about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.quick_links}</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.contact}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: info@khorezm.uz</p>
              <p>Phone: +998 61 226 56 56</p>
              <p>Khiva, Khorezm Region</p>
            </div>
          </div>

          {/* Map Preview */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Location</h4>
            <p className="text-sm text-muted-foreground">
              Discover the ancient beauty of Khorezm
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Visit Khorezm. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
