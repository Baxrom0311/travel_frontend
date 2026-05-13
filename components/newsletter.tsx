'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { subscribeNewsletter } from '@/lib/api-client';

export function Newsletter() {
  const { language } = useI18n();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = getSection('footer', language);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const res = await subscribeNewsletter(email, language);
    if (res.success) {
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    }
    setSubmitting(false);
  };

  return (
    <div className="glass-strong rounded-2xl p-5 w-full min-w-0 overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <Mail size={18} className="text-primary shrink-0" strokeWidth={2.5} />
        <h3 className="font-semibold truncate">{t.newsletter_title}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">{t.newsletter_desc}</p>
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.newsletter_placeholder}
          className="w-full h-10 px-3 rounded-lg bg-white dark:bg-card border border-border text-sm outline-none focus:border-primary min-w-0"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary/90 transition-colors"
        >
          <Send size={14} strokeWidth={2.5} />
          <span>{t.newsletter_button}</span>
        </button>
      </form>
      {success && (
        <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-xs flex items-center gap-1">
          <CheckCircle2 size={12} strokeWidth={2.5} /> {t.newsletter_success}
        </div>
      )}
    </div>
  );
}
