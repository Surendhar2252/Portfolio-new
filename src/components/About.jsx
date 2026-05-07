import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const counters = [
  { end: 15,   suffix: '+', label: 'Projects Built' },
  { end: 95,   suffix: '%', label: 'Model Accuracy' },
  { end: 5000, suffix: '+', label: 'Hours of Code',  step: 50 },
  { end: 12,   suffix: '+', label: 'Technologies' },
];

const highlights = [
  {
    icon: '🎯',
    title: 'End-to-End Delivery',
    desc: 'From raw data pipelines to React dashboards — I own the full lifecycle.',
  },
  {
    icon: '🤖',
    title: 'ML Engineering',
    desc: 'PyTorch, TensorFlow, LangChain — model training to production inference.',
  },
  {
    icon: '☁️',
    title: 'Cloud-Native Architecture',
    desc: 'Serverless APIs, Docker containers, and scalable Supabase/PostgreSQL backends.',
  },
  {
    icon: '⚡',
    title: 'Performance Focused',
    desc: 'Fast load times, efficient queries, and real-time UX built for scale.',
  },
];

function CounterNumber({ end, suffix, step = 1 }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1600;
    const increment = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      current = Math.min(current + increment, end);
      setCount(current);
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref} className="text-4xl font-black gradient-text-static">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="space-y-8">
      {/* Header card */}
      <div className="glass glow-card rounded-3xl p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">About Me</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Crafting <span className="gradient-text">AI-powered products</span>
              <br />that scale from prototype to launch.
            </h2>
          </div>
          <div className="shrink-0 rounded-2xl border border-slate-700/60 bg-slate-950/60 px-6 py-4">
            <p className="text-sm text-cyan-300 font-medium">AI / Full-Stack Engineering</p>
            <p className="mt-1 text-xs text-slate-500 max-w-[220px]">
              Research-driven systems · Clean architecture · Delightful UX
            </p>
          </div>
        </div>
      </div>

      {/* Animated counters */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {counters.map((c) => (
          <motion.div
            key={c.label}
            variants={fadeUp}
            className="glass glass-hover glow-card rounded-2xl p-6 text-center"
          >
            <CounterNumber end={c.end} suffix={c.suffix} step={c.step} />
            <p className="mt-2 text-sm text-slate-400">{c.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="glass rounded-3xl p-8 md:p-10"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              I'm an AI/ML and Full-Stack Engineering student who thrives on solving complex
              technical problems with elegant end-to-end solutions. With hands-on experience in
              Python model pipelines, React user interfaces, and cloud-native deployment, I build
              tools that help teams move from concept to measurable impact.
            </p>
            <p>
              My focus is on designing robust systems that integrate machine learning, real-time
              data, and intuitive workflows. I enjoy collaborating across product, design, and
              engineering teams to transform experimental models into resilient applications.
            </p>
          </div>
          <div className="space-y-3">
            {highlights.map(h => (
              <div key={h.title} className="glass-hover flex gap-4 rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
                <span className="text-2xl">{h.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{h.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
