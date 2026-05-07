import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const filterTabs = ['All', 'AI / ML', 'Full-Stack', 'Automation'];

const projects = [
  {
    id: 1,
    title: 'MedSight CNN Diagnostic Assistant',
    category: 'AI / ML',
    description:
      'A medical imaging pipeline using convolutional neural networks to classify chest X-rays and generate explainable attention heatmaps for clinician review.',
    tags: ['PyTorch', 'FastAPI', 'React', 'Docker', 'Supabase'],
    metrics: [
      { icon: '🎯', value: '95%', label: 'Validation accuracy' },
      { icon: '⚡', value: '200ms', label: 'API response time' },
      { icon: '🖼️', value: '12M+', label: 'Images simulated' },
    ],
    featured: true,
    github: '#',
    live: '#',
    color: 'from-cyan-500/20 to-violet-500/10',
  },
  {
    id: 2,
    title: 'NeuraChat AI Collaboration Platform',
    category: 'Full-Stack',
    description:
      'A full-stack chatbot platform combining GPT-style conversation, vector search, and collaborative note-taking in a polished React dashboard.',
    tags: ['TypeScript', 'GraphQL', 'Redis', 'LangChain', 'Vite'],
    metrics: [
      { icon: '👥', value: '15k', label: 'Monthly active sessions' },
      { icon: '✅', value: '99.9%', label: 'Uptime' },
      { icon: '🚀', value: '2×', label: 'Faster response stream' },
    ],
    featured: false,
    github: '#',
    live: '#',
    color: 'from-violet-500/20 to-pink-500/10',
  },
  {
    id: 3,
    title: 'ScrapeSense Data Automation Engine',
    category: 'Automation',
    description:
      'An automated data collection and normalization system for market intelligence, combining browser automation, SQL ETL, and scheduled model retraining workflows.',
    tags: ['Python', 'Airflow', 'PostgreSQL', 'Selenium', 'AWS Lambda'],
    metrics: [
      { icon: '📦', value: '250k', label: 'Records ingested' },
      { icon: '⏱️', value: '5s', label: 'Average scrape time' },
      { icon: '🔔', value: '24/7', label: 'Error alerting' },
    ],
    featured: false,
    github: '#',
    live: '#',
    color: 'from-emerald-500/20 to-cyan-500/10',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
  exit:    { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function Projects() {
  const [activeFilter, setFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass glow-card rounded-3xl p-8 md:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">Projects</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Selected work in{' '}
          <span className="gradient-text">AI, automation,</span>
          {' '}and full-stack delivery.
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Real engineering complexity — model training, distributed APIs, responsive interfaces, and
          engineered pipelines for modern product use cases.
        </p>

        {/* Filter tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === tab
                  ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 shadow-glow'
                  : 'border border-slate-700/60 bg-slate-900/60 text-slate-400 hover:border-cyan-400/30 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <motion.div layout className="grid gap-6 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/90 p-7 shadow-glow-card transition-shadow duration-300 hover:shadow-glow-lg"
            >
              {/* Gradient glow top */}
              <div className={`pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br ${project.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative z-10">
                {/* Top row */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    project.category === 'AI / ML'      ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/20' :
                    project.category === 'Full-Stack'   ? 'bg-violet-400/10 text-violet-300 border border-violet-400/20' :
                    'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20'
                  }`}>
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-3 py-1 text-xs font-bold text-slate-950">
                      ✦ Featured
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white leading-snug group-hover:text-cyan-200 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{project.description}</p>

                {/* Metrics */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {project.metrics.map(m => (
                    <div key={m.label} className="rounded-xl bg-slate-900/60 p-3 text-center border border-slate-800/40">
                      <p className="text-lg">{m.icon}</p>
                      <p className="text-sm font-bold text-white">{m.value}</p>
                      <p className="text-xs text-slate-500 leading-tight mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-xl border border-slate-800/60 bg-slate-900/60 px-3 py-1 text-xs text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-6 flex gap-3">
                  <a
                    href={project.github}
                    className="flex-1 rounded-full border border-slate-700/60 py-2 text-center text-sm text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    className="flex-1 btn-shimmer rounded-full py-2 text-center text-sm font-semibold text-slate-950"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
