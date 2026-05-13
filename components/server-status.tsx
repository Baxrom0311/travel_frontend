'use client';

import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Render free plan has 15min inactivity sleep.
 * This component warms up the backend and shows status on slow requests.
 */
export function ServerStatus() {
  const [status, setStatus] = useState<'checking' | 'ready' | 'warming' | 'error'>('checking');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    const start = Date.now();
    const timer = setTimeout(() => setVisible(true), 3000); // Show after 3s

    fetch(`${apiUrl.replace(/\/api\/?$/, '')}/health/`, { cache: 'no-store' })
      .then((res) => {
        clearTimeout(timer);
        const elapsed = Date.now() - start;
        if (res.ok) {
          if (elapsed > 3000) {
            setStatus('ready');
            setVisible(true);
            setTimeout(() => setVisible(false), 2500);
          } else {
            setStatus('ready');
            setVisible(false);
          }
        } else {
          setStatus('error');
          setVisible(true);
        }
      })
      .catch(() => {
        clearTimeout(timer);
        setStatus('error');
        setVisible(true);
      });

    // If still "checking" after 2s, show warming
    const warmTimer = setTimeout(() => {
      setStatus((prev) => (prev === 'checking' ? 'warming' : prev));
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(warmTimer);
    };
  }, []);

  if (!visible) return null;

  const config = {
    checking: {
      icon: Loader2,
      text: 'Serverga ulanmoqda...',
      bg: 'bg-blue-50',
      color: 'text-blue-700',
      spin: true,
    },
    warming: {
      icon: Loader2,
      text: 'Server uxlayotgan edi, 30-50 sekund kuting...',
      bg: 'bg-amber-50',
      color: 'text-amber-700',
      spin: true,
    },
    ready: {
      icon: CheckCircle2,
      text: 'Server tayyor!',
      bg: 'bg-green-50',
      color: 'text-green-700',
      spin: false,
    },
    error: {
      icon: AlertCircle,
      text: 'Serverga ulanib bo\'lmadi',
      bg: 'bg-red-50',
      color: 'text-red-700',
      spin: false,
    },
  }[status];

  const Icon = config.icon;

  return (
    <div
      className={`fixed bottom-4 right-4 ${config.bg} ${config.color} rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 text-sm font-medium z-50 animate-in slide-in-from-bottom-2 duration-300`}
      role="status"
    >
      <Icon size={16} className={config.spin ? 'animate-spin' : ''} />
      <span>{config.text}</span>
    </div>
  );
}
