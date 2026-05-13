'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Send, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { getSection } from '@/lib/translations';
import { getReviews, submitReview } from '@/lib/api-client';
import { Review, ReviewStats, ReviewTargetType } from '@/lib/types';

interface Props {
  targetType: ReviewTargetType;
  targetId: number;
}

export function ReviewsSection({ targetType, targetId }: Props) {
  const { language } = useI18n();
  const t = getSection('reviews', language);
  const tc = getSection('common', language);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ avg_rating: 0, total: 0 });
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    rating: 5,
    title: '',
    comment: '',
  });

  useEffect(() => {
    load();
  }, [targetType, targetId]);

  const load = async () => {
    const data = await getReviews(targetType, targetId);
    if (data) {
      setReviews(data.results);
      setStats(data.stats);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitReview({
      ...form,
      target_type: targetType,
      target_id: targetId,
    });
    if (res.success) {
      setSuccess(true);
      setForm({ name: '', email: '', country: '', rating: 5, title: '', comment: '' });
      setTimeout(() => { setSuccess(false); setShowForm(false); }, 3000);
    }
    setSubmitting(false);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
            <MessageSquare size={20} className="text-primary" />
            {t.title}
          </h2>
          {stats.total > 0 && (
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 text-amber-500">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} className={i <= stats.avg_rating ? 'fill-current' : ''} />
                ))}
              </div>
              <span className="font-semibold text-foreground">{stats.avg_rating}</span>
              <span>{t.based_on} {stats.total} {t.reviews_count}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"
        >
          {t.write_review}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="mb-6 p-4 bg-secondary/50 rounded-xl space-y-3">
          {success && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
              <CheckCircle2 size={16} /> {t.success}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Ismingiz"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-10 px-3 rounded-lg bg-white border border-border text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-10 px-3 rounded-lg bg-white border border-border text-sm"
            />
            <input
              type="text"
              placeholder={t.country}
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="h-10 px-3 rounded-lg bg-white border border-border text-sm"
            />
            <input
              type="text"
              placeholder={t.review_title}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="h-10 px-3 rounded-lg bg-white border border-border text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t.your_rating}:</span>
            {[1,2,3,4,5].map(i => (
              <button
                key={i}
                type="button"
                onClick={() => setForm({ ...form, rating: i })}
              >
                <Star size={24} className={i <= form.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'} />
              </button>
            ))}
          </div>
          <textarea
            placeholder={t.review_comment}
            required
            rows={3}
            minLength={10}
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white border border-border text-sm resize-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send size={14} /> {submitting ? '...' : t.submit_review}
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">{t.no_reviews}</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="p-4 bg-secondary/50 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    {r.country && <div className="text-xs text-muted-foreground">{r.country}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className={i <= r.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              {r.title && <h4 className="font-semibold mb-1">{r.title}</h4>}
              <p className="text-sm text-muted-foreground">{r.comment}</p>
              <div className="text-xs text-muted-foreground mt-2">
                {new Date(r.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
