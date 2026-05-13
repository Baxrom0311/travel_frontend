'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';

export interface Testimonial {
  id: number;
  name: string;
  country: string;
  avatar?: string;
  rating: number;
  text: string;
  role?: string;
}

interface Props {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
}

export function TestimonialsCarousel({ testimonials, autoplay = true, interval = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, testimonials.length]);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="py-20 section-bg">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4">
            <Quote size={12} className="text-primary" strokeWidth={2.5} />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sayyohlar fikri
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Mehmonlar <span className="gradient-text">nima deydi</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.1}>
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Large quote mark */}
            <Quote
              size={120}
              className="absolute top-4 right-4 text-primary/5 pointer-events-none"
              strokeWidth={1}
            />

            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg">
                    {current.avatar ? (
                      <img src={current.avatar} alt={current.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="text-white" size={32} strokeWidth={2.5} />
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={18}
                        className={s <= current.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}
                        strokeWidth={2.5}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed italic max-w-3xl">
                    "{current.text}"
                  </p>

                  {/* Author */}
                  <div>
                    <div className="font-serif text-xl font-bold">{current.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {current.role && <>{current.role} · </>}
                      {current.country}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            {testimonials.length > 1 && (
              <>
                <div className="flex items-center justify-center gap-3 mt-8">
                  <button
                    onClick={prev}
                    className="glass-button p-2.5 rounded-full hover:scale-110 transition-transform"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                  </button>

                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > index ? 1 : -1);
                          setIndex(i);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          i === index ? 'w-8 bg-primary' : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    className="glass-button p-2.5 rounded-full hover:scale-110 transition-transform"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
