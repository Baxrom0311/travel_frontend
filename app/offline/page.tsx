import type { Metadata } from 'next';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Offline',
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-strong rounded-3xl p-10 md:p-16 max-w-xl text-center">
        <div className="inline-flex w-20 h-20 rounded-2xl bg-primary items-center justify-center mb-6">
          <WifiOff className="text-white" size={36} />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">
          Internet yo'q
        </h1>
        <p className="text-muted-foreground mb-8">
          Ulanishni tekshiring va qayta urinib ko'ring. Ba'zi oldindan yuklangan sahifalar hali ham ishlashi mumkin.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="javascript:window.location.reload()"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            <RefreshCw size={16} /> Qayta urinish
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full glass-button text-foreground font-semibold hover:scale-105 transition-all"
          >
            <Home size={16} /> Bosh sahifa
          </Link>
        </div>
      </div>
    </div>
  );
}
