'use client';

import { useState } from 'react';
import { Share2, Copy, Check, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch {
        setOpen(!open);
      }
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={nativeShare}
        className="glass-button p-2.5 rounded-full text-foreground hover:scale-105 transition-transform"
        aria-label="Share"
      >
        <Share2 size={16} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 glass-strong rounded-2xl p-2 flex items-center gap-1 shadow-xl z-40"
            >
              <button
                onClick={shareToFacebook}
                className="w-10 h-10 rounded-xl hover:bg-foreground/5 flex items-center justify-center transition-colors"
                aria-label="Share to Facebook"
                title="Facebook"
              >
                <Facebook size={16} className="text-blue-600" strokeWidth={2.5} />
              </button>
              <button
                onClick={shareToTwitter}
                className="w-10 h-10 rounded-xl hover:bg-foreground/5 flex items-center justify-center transition-colors"
                aria-label="Share to Twitter"
                title="Twitter"
              >
                <Twitter size={16} className="text-sky-500" strokeWidth={2.5} />
              </button>
              <button
                onClick={shareToTelegram}
                className="w-10 h-10 rounded-xl hover:bg-foreground/5 flex items-center justify-center transition-colors"
                aria-label="Share to Telegram"
                title="Telegram"
              >
                <MessageCircle size={16} className="text-blue-500" strokeWidth={2.5} />
              </button>
              <button
                onClick={copyLink}
                className="w-10 h-10 rounded-xl hover:bg-foreground/5 flex items-center justify-center transition-colors"
                aria-label="Copy link"
                title="Copy link"
              >
                {copied ? (
                  <Check size={16} className="text-green-600" strokeWidth={2.5} />
                ) : (
                  <Copy size={16} className="text-foreground" strokeWidth={2.5} />
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
