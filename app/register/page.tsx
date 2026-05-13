'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useAuth } from '@/lib/auth-context';
import { Mail, Lock, User as UserIcon, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
    password2: '',
    first_name: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const res = await register(form);
    if (res.success) {
      // Auto-login
      const loginRes = await login({ email: form.email, password: form.password });
      if (loginRes.success) {
        setSuccess(true);
        setTimeout(() => router.push('/'), 1000);
      } else {
        router.push('/login');
      }
    } else {
      const errs: Record<string, string> = {};
      if (res.errors) {
        for (const [k, v] of Object.entries(res.errors)) {
          errs[k] = Array.isArray(v) ? v[0] : String(v);
        }
      }
      setErrors(errs);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto px-4 pt-32 pb-16">
        <div className="glass-strong rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-primary items-center justify-center mb-4">
              <UserPlus className="text-white" size={28} />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-2">Ro'yxatdan o'tish</h1>
            <p className="text-sm text-muted-foreground">Yangi hisob yarating</p>
          </div>

          {success ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={20} />
              <div>
                <div className="font-semibold">Tabriklaymiz!</div>
                <div className="text-sm">Ro'yxatdan o'tdingiz va tizimga kirdingiz.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ism</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                    placeholder="Ismingiz"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Parol</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                    placeholder="Kamida 8 ta belgi"
                  />
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Parolni takrorlang</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <input
                    type="password"
                    required
                    value={form.password2}
                    onChange={(e) => setForm({ ...form, password2: e.target.value })}
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                  />
                </div>
              </div>

              {errors.detail && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.detail}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                <UserPlus size={16} /> {loading ? "Ro'yxatdan o'tmoqda..." : "Ro'yxatdan o'tish"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Hisobingiz bormi? </span>
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Kirish
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
