'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Advanced page transition with:
 * - Page fade + slight slide
 * - Curtain effect overlay (gradient sweep)
 */
export function AdvancedPageTransition({ children }: Props) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Curtain overlay - sweeps on route change */}
        <motion.div
          key={`curtain-${pathname}`}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[150] pointer-events-none origin-top"
          style={{
            background: 'linear-gradient(180deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 70%, black) 100%)',
          }}
        >
          {/* Loader in center */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Page content with fade */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
