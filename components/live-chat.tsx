'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useSounds } from '@/hooks/use-sounds';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

const BOT_RESPONSES: Record<string, string> = {
  salom: "Salom! Visit Khorezm'ga xush kelibsiz! Sizga qanday yordam bera olaman?",
  hello: "Hello! Welcome to Visit Khorezm! How can I help you today?",
  привет: "Привет! Добро пожаловать в Visit Khorezm! Чем могу помочь?",
  mehmonxona: "Xivada va Urganchda 10 ta ajoyib mehmonxona mavjud. Narxlar 150,000 so'mdan boshlanadi. Batafsil: /accommodation",
  hotel: "We have 10 hotels in Khiva and Urgench. Prices start from 150,000 UZS. More: /accommodation",
  turist: "Xivani kuzgi (sentyabr-oktyabr) va bahor (aprel-may) oylarida ziyorat qilish tavsiya etiladi.",
  viza: "30+ davlat fuqarolari uchun viza kerak emas (30 kungacha). Batafsil: e-visa.gov.uz",
  visa: "Citizens of 30+ countries don't need a visa (up to 30 days). More: e-visa.gov.uz",
  narx: "Narxlar: Ichan-qal'a biletlari 150,000 UZS, mehmonxonalar 200K-700K UZS, tours 180K-3.5M UZS",
  price: "Prices: Ichan-Kala tickets 150K UZS, hotels 200K-700K UZS, tours 180K-3.5M UZS",
};

const DEFAULT_SUGGESTIONS = [
  'Mehmonxonalar',
  'Viza kerak?',
  'Narxlar qanday?',
  'Qachon borish yaxshi?',
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function botReply(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return "Ajoyib savol! Batafsil javob uchun https://travel-backend-py8o.onrender.com/api/contact/ orqali bog'laning yoki telefon: +998 61 226 56 56";
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Salom! Visit Khorezm'ga xush kelibsiz! 🏛️ Qanday yordam bera olaman?",
      sender: 'bot',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { play } = useSounds();

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open) setHasUnread(false);
  }, [open]);

  const send = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      time: getTime(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    play('click');

    // Simulate bot thinking
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: botReply(text),
        sender: 'bot',
        time: getTime(),
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
      play('notification');
      if (!open) setHasUnread(true);
    }, 1000 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-xl shadow-primary/30 flex items-center justify-center"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread indicator */}
        {hasUnread && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white"
          />
        )}

        {/* Pulsing ring */}
        {!open && (
          <motion.span
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-primary"
          />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-40 w-[min(400px,calc(100vw-48px))] h-[520px] max-h-[calc(100vh-120px)] glass-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} strokeWidth={2.5} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">Visit Khorezm Assistant</div>
                <div className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Online
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Messages */}
            <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'bot'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {msg.sender === 'bot' ? <Bot size={14} strokeWidth={2.5} /> : <User size={14} strokeWidth={2.5} />}
                  </div>
                  <div className={`max-w-[75%] ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`rounded-2xl px-3 py-2 text-sm ${
                        msg.sender === 'bot'
                          ? 'bg-secondary text-foreground rounded-tl-sm'
                          : 'bg-primary text-primary-foreground rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</div>
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Bot size={14} strokeWidth={2.5} />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-foreground/40"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {DEFAULT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2 bg-background/80">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Xabar yozing..."
                className="flex-1 h-10 px-3 rounded-full bg-secondary border-0 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <Send size={16} strokeWidth={2.5} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
