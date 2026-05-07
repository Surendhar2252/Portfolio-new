import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const headlines = [
  'AI-First Full-Stack Engineer',
  'Building Conversational Systems',
  'Deploying Intelligent Products',
  'Designing Scalable Architectures',
];

const stats = [
  { value: '15+', label: 'Projects Built' },
  { value: '95%', label: 'Model Accuracy' },
  { value: '3+', label: 'Years Learning' },
  { value: '10k+', label: 'Lines of Code' },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const [active, setActive]           = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping]           = useState(true);

  useEffect(() => {
    const headline = headlines[active];
    let idx = typing ? 0 : headline.length;

    const interval = setInterval(() => {
      if (typing) {
        if (idx <= headline.length) {
          setDisplayText(headline.slice(0, idx));
          idx++;
        } else {
          clearInterval(interval);
          setTimeout(() => setTyping(false), 1800);
        }
      } else {
        if (idx >= 0) {
          setDisplayText(headline.slice(0, idx));
          idx--;
        } else {
          clearInterval(interval);
          setTyping(true);
          setActive(p => (p + 1) % headlines.length);
        }
      }
    }, typing ? 75 : 38);

    return () => clearInterval(interval);
  }, [active, typing]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 p-8 shadow-glow-card backdrop-blur-sm md:p-14">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800/20 blur-3xl" />
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        {/* ─── Left column ──────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-7"
        >
          {/* Badge */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cyan-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI / Full-Stack Portfolio
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            I build{' '}
            <span className="gradient-text">scalable AI</span>
            {' '}products that{' '}
            <span className="gradient-text-static">delight users.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeUp} className="max-w-xl text-base text-slate-400 md:text-lg leading-relaxed">
            AI/ML & Full-Stack Engineering student turning research-led models into
            polished, production-ready applications. Blending data science, intuitive
            UX, and modern cloud architecture.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="btn-shimmer inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-slate-950"
            >
              View My Work
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="mailto:alex.dai.dev@example.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-7 py-3 text-sm text-slate-300 transition hover:border-violet-400 hover:text-violet-300"
            >
              Let's Collaborate
            </a>
          </motion.div>

          {/* Stat badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/60 px-5 py-3 text-center"
              >
                <p className="text-xl font-bold gradient-text-static">{s.value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── Right column ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col gap-5"
        >
          {/* Avatar card */}
          <div className="glass glow-card rounded-[2rem] p-6 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 ring-pulse text-4xl font-black text-slate-950">
              AD
            </div>
            <p className="font-semibold text-white">Alexander Dai</p>
            <p className="mt-1 text-sm text-cyan-300">AI / Full-Stack Engineer</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-400">Open to opportunities</span>
            </div>
          </div>

          {/* Typing card */}
          <div className="glass rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Current Focus</p>
            <p className="mt-3 min-h-[1.6rem] font-medium text-white">
              {displayText}
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-cyan-400 align-middle" />
            </p>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Responsive web apps · Cloud-native APIs · Recommendation systems · Conversational AI
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'AI Research', value: '90% precision anomaly detection' },
              { label: 'Full-Stack',  value: 'React · FastAPI · Supabase' },
            ].map(card => (
              <div key={card.label} className="glass glass-hover rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">{card.label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{card.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
