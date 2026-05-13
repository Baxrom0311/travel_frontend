'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Show only on first load in session
    const shown = sessionStorage.getItem('splash_shown');
    if (shown) {
      setVisible(false);
      return;
    }

    setMounted(true);
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('splash_shown', '1');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted && !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, var(--primary) 0%, color-mix(in srgb, var(--primary) 70%, black) 50%, black 100%)',
          }}
        >
          {/* Animated rings */}
          <div className="relative">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.4, 0], scale: [0.5, 2.5, 3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-full border-2 border-white"
                style={{ width: 120, height: 120, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
            ))}

            {/* Center logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-30 h-30 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-28 h-28 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl"
              >
                <MapPin className="text-white" size={48} strokeWidth={2.5} />
              </motion.div>
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-20 left-0 right-0 text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">
              Visit Khorezm
            </h1>
            <p className="text-white/70 text-sm uppercase tracking-[0.3em]">
              Travel & Tourism
            </p>
          </motion.div>

          {/* Progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-white"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
