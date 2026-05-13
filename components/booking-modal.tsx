'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Mail, Phone, User, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { formatPrice } from '@/lib/i18n-helpers';
import { submitContact } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  hotelName: string;
  hotelId: number;
  pricePerNight: number;
}

export function BookingModal({ open, onClose, hotelName, hotelId, pricePerNight }: Props) {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [form, setForm] = useState({
    name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    check_in: today,
    check_out: tomorrow,
    guests: 2,
    rooms: 1,
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const nights = Math.max(
    1,
    Math.ceil((new Date(form.check_out).getTime() - new Date(form.check_in).getTime()) / 86400000)
  );
  const totalPrice = pricePerNight * nights * form.rooms;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const message = `
🏨 Band qilish so'rovi: ${hotelName} (#${hotelId})
👤 Ism: ${form.name}
📧 Email: ${form.email}
📞 Telefon: ${form.phone}
📅 Kirish: ${form.check_in}
📅 Chiqish: ${form.check_out}
🌙 Kechalar: ${nights}
👥 Mehmonlar: ${form.guests}
🛏️ Xonalar: ${form.rooms}
💰 Taxminiy narx: ${formatPrice(totalPrice)}
${form.notes ? `\n📝 Izoh:\n${form.notes}` : ''}
`.trim();

    const res = await submitContact({
      name: form.name,
      email: form.email,
      message,
    });

    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
      toast.success('Band qilish so\'rovingiz yuborildi! Siz bilan tez orada bog\'lanamiz.');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } else {
      toast.error('Xatolik yuz berdi. Keyinroq urinib ko\'ring.');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="glass-strong rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold">Band qilish</h2>
                <p className="text-sm text-muted-foreground">{hotelName}</p>
              </div>
              <button onClick={onClose} className="glass-button p-2 rounded-full">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {success ? (
              <div className="text-center py-12">
                <div className="inline-flex w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center mb-4">
                  <CheckCircle2 className="text-green-600 dark:text-green-400" size={40} strokeWidth={2.5} />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Muvaffaqiyat!</h3>
                <p className="text-muted-foreground">
                  So'rovingiz yuborildi. Email orqali tez orada javob beramiz.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                {/* Personal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                      <User size={12} strokeWidth={2.5} /> Ismingiz
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                      <Mail size={12} strokeWidth={2.5} /> Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                    <Phone size={12} strokeWidth={2.5} /> Telefon
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 __ ___ __ __"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                      <Calendar size={12} strokeWidth={2.5} /> Kirish sanasi
                    </label>
                    <input
                      type="date"
                      required
                      min={today}
                      value={form.check_in}
                      onChange={(e) => setForm({ ...form, check_in: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                      <Calendar size={12} strokeWidth={2.5} /> Chiqish sanasi
                    </label>
                    <input
                      type="date"
                      required
                      min={form.check_in}
                      value={form.check_out}
                      onChange={(e) => setForm({ ...form, check_out: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                      <Users size={12} strokeWidth={2.5} /> Mehmonlar
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                      🛏️ Xonalar
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={form.rooms}
                      onChange={(e) => setForm({ ...form, rooms: Number(e.target.value) })}
                      className="w-full h-11 px-3 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                    <MessageSquare size={12} strokeWidth={2.5} /> Qo'shimcha izoh
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Maxsus so'rovlar, ehtiyojlar..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm resize-none"
                  />
                </div>

                {/* Summary */}
                <div className="glass rounded-xl p-4 border border-primary/20">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-muted-foreground">Kechalar:</span>
                    <span className="font-semibold">{nights} × {formatPrice(pricePerNight)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-muted-foreground">Xonalar:</span>
                    <span className="font-semibold">×{form.rooms}</span>
                  </div>
                  <div className="border-t border-border/50 pt-2 flex justify-between items-center">
                    <span className="font-semibold">Jami:</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                  <Send size={16} strokeWidth={2.5} />
                  {submitting ? 'Yuborilmoqda...' : 'Band qilish so\'rovini yuborish'}
                </button>

                <p className="text-[10px] text-center text-muted-foreground">
                  Bu band qilish so'rovi. 24 soat ichida siz bilan bog'lanamiz.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
