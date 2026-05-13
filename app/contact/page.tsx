'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { submitContact } from '@/lib/api-client';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const { language } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<null | 'success' | 'error'>(null);
  const t = getSection('contact', language);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
    const res = await submitContact(form);
    setResult(res.success ? 'success' : 'error');
    setSending(false);
    if (res.success) setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[350px] mt-16 overflow-hidden">
        <Image src="/images/khiva-main.jpg" alt={t.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-200 text-lg max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold mb-6">Get in Touch</h2>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="text-primary" size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="font-semibold">info@visitkhorezm.uz</div>
              </div>
            </div>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Phone className="text-primary" size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Phone</div>
                <div className="font-semibold">+998 61 226 56 56</div>
              </div>
            </div>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="text-primary" size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Address</div>
                <div className="font-semibold">Xiva, Xorazm viloyati</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="glass-strong rounded-2xl p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.name}</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-12 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t.email}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-12 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t.message}</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary outline-none resize-none"
              />
            </div>

            {result === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl text-sm">
                <CheckCircle2 size={16} /> {t.success}
              </div>
            )}
            {result === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
                <AlertCircle size={16} /> {t.error}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={16} /> {sending ? '...' : t.send}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
