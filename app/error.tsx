'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex w-20 h-20 rounded-3xl bg-red-100 dark:bg-red-900/30 items-center justify-center mb-6">
          <AlertTriangle className="text-red-600 dark:text-red-400" size={40} strokeWidth={2.5} />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-3">Xatolik yuz berdi</h1>
        <p className="text-muted-foreground mb-8">
          Sahifa yuklanmadi. Internetga ulanishni tekshiring yoki qaytadan urinib ko'ring.
        </p>
        {error.message && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl text-sm text-left font-mono break-words">
            {error.message}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            <RefreshCw size={18} strokeWidth={2.5} />
            Qaytadan
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-button font-semibold hover:bg-foreground/5 transition-colors"
          >
            <Home size={18} strokeWidth={2.5} />
            Bosh sahifa
          </Link>
        </div>
      </div>
    </div>
  );
}
