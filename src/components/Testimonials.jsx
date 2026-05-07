import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Professor of Machine Learning',
    org: 'University',
    avatar: 'SC',
    quote:
      'Alexander demonstrated exceptional ability to bridge theoretical ML concepts with practical engineering. His anomaly detection pipeline was production-ready and exceeded our benchmarks.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'CTO',
    org: 'TechStartup Inc.',
    avatar: 'MW',
    quote:
      'Working with Alex was a game-changer. He shipped a fully tested React + FastAPI system in record time. The code quality and documentation were outstanding.',
    rating: 5,
  },
  {
    name: 'Priya Rajan',
    role: 'Senior Engineer',
    org: 'Open Source Project',
    avatar: 'PR',
    quote:
      "Alex's contributions to our LangChain integration were thoughtful and well-structured. He's the kind of collaborator who makes everyone's work better.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive(p => (p + 1) % testimonials.length), 4500);
    return () => clearTimeout(t);
  }, [active, paused]);

  const t = testimonials[active];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass glow-card rounded-3xl p-8 md:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">Testimonials</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          What <span className="gradient-text">collaborators</span> say.
        </h2>
      </div>

      {/* Testimonial carousel */}
      <div
        className="relative glass glow-card overflow-hidden rounded-3xl p-8 md:p-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background accent */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* Quote mark */}
            <div className="mb-6 text-6xl leading-none gradient-text-static font-serif">"</div>

            <p className="text-lg text-slate-200 leading-relaxed md:text-xl max-w-3xl">
              {t.quote}
            </p>

            {/* Stars */}
            <div className="mt-6 flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>

            {/* Author */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-bold text-slate-950">
                {t.avatar}
              </div>
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-slate-400">{t.role} · {t.org}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              aria-label={`Testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-6 h-2 bg-gradient-to-r from-cyan-400 to-violet-500'
                  : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
