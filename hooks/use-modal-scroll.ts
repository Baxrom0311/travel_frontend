'use client';

import { useEffect } from 'react';

/**
 * Modal ochilganda body scroll'ni lock qiladi va `modal-active` class qo'shadi.
 * `modal-active` class bo'lganda fixed iconlar (compare bar, live chat, etc.) yashirinadi.
 */
export function useModalScroll(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-active');

    return () => {
      document.body.style.overflow = original;
      // Faqat boshqa modallar yo'q bo'lsa olib tashlash
      // (data-modal-open=true atributli element bor bo'lsa qoldirish)
      const stillOpen = document.querySelector('[data-modal-open="true"]');
      if (!stillOpen) {
        document.body.classList.remove('modal-active');
      }
    };
  }, [isOpen]);
}
