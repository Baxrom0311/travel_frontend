import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-strong rounded-3xl p-10 md:p-16 max-w-xl text-center">
        <div className="text-8xl md:text-9xl font-serif font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Sahifa topilmadi
        </h1>
        <p className="text-muted-foreground mb-8">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            <Home size={16} /> Bosh sahifa
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full glass-button text-foreground font-semibold hover:scale-105 transition-all"
          >
            <Search size={16} /> Qidiruv
          </Link>
        </div>
      </div>
    </div>
  );
}
