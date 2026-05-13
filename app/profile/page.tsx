'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useAuth } from '@/lib/auth-context';
import { updateProfile, changePassword } from '@/lib/auth-client';
import { User as UserIcon, Mail, Phone, Globe, LogOut, Save, Lock, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, updateUser, logout, isAuthenticated } = useAuth();
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [form, setForm] = useState({
    first_name: '', last_name: '', phone: '', country: '', bio: '', language: 'uz',
  });
  const [pwd, setPwd] = useState({ old_password: '', new_password: '', new_password2: '' });
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/profile');
    }
    if (user) {
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        country: user.country || '',
        bio: user.bio || '',
        language: user.language || 'uz',
      });
    }
  }, [user, loading, isAuthenticated, router]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    const res = await updateProfile(form as any);
    if (res.success && res.user) {
      updateUser(res.user);
      setMsg({ type: 'success', text: 'Profil yangilandi!' });
    } else {
      setMsg({ type: 'error', text: 'Xatolik yuz berdi' });
    }
    setSaving(false);
    setTimeout(() => setMsg(null), 3000);
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.new_password !== pwd.new_password2) {
      setPwdMsg({ type: 'error', text: 'Yangi parollar mos kelmadi' });
      return;
    }
    const res = await changePassword(pwd.old_password, pwd.new_password);
    if (res.success) {
      setPwdMsg({ type: 'success', text: "Parol o'zgartirildi" });
      setPwd({ old_password: '', new_password: '', new_password2: '' });
    } else {
      setPwdMsg({ type: 'error', text: res.error || 'Xatolik' });
    }
    setTimeout(() => setPwdMsg(null), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 pt-32">
          <div className="h-96 bg-muted rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="glass rounded-2xl p-6 h-fit sticky top-24">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                {user.avatar_url ? (
                  <Image src={user.avatar_url} alt={user.full_name} width={96} height={96} className="object-cover" unoptimized />
                ) : (
                  <UserIcon size={40} className="text-primary" />
                )}
              </div>
              <h2 className="font-serif text-xl font-bold">{user.full_name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {user.is_verified && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-2">
                  <CheckCircle2 size={12} /> Tasdiqlangan
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Link href="/favorites" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm">
                <Heart size={16} className="text-primary" />
                Sevimlilar
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm text-red-600"
              >
                <LogOut size={16} /> Chiqish
              </button>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Info */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold mb-4">Profil ma'lumotlari</h2>
              <form onSubmit={save} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Ism"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className="h-11 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Familiya"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    className="h-11 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Davlat"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                />
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                >
                  <option value="uz">O'zbek</option>
                  <option value="en">English</option>
                  <option value="ru">Русский</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="O'zingiz haqingizda..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm resize-none"
                />

                {msg && (
                  <div className={`p-3 rounded-xl text-sm flex items-center gap-2 ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {msg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {msg.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  <Save size={16} /> {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-serif text-2xl font-bold mb-4">Parolni o'zgartirish</h2>
              <form onSubmit={savePassword} className="space-y-3">
                <input
                  type="password"
                  required
                  placeholder="Eski parol"
                  value={pwd.old_password}
                  onChange={(e) => setPwd({ ...pwd, old_password: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                />
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Yangi parol"
                  value={pwd.new_password}
                  onChange={(e) => setPwd({ ...pwd, new_password: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                />
                <input
                  type="password"
                  required
                  placeholder="Yangi parolni takrorlang"
                  value={pwd.new_password2}
                  onChange={(e) => setPwd({ ...pwd, new_password2: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-white border border-border focus:border-primary outline-none text-sm"
                />
                {pwdMsg && (
                  <div className={`p-3 rounded-xl text-sm flex items-center gap-2 ${pwdMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {pwdMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {pwdMsg.text}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-secondary text-foreground font-semibold hover:bg-secondary/80 inline-flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Parolni saqlash
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
