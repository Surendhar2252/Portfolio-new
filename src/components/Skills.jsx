import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const categories = ['All', 'Languages', 'Frameworks', 'AI / ML', 'DevOps'];

const skills = [
  {
    name: 'Python',
    level: 92,
    category: 'Languages',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg',
  },
  {
    name: 'TypeScript',
    level: 85,
    category: 'Languages',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
  },
  {
    name: 'Java',
    level: 75,
    category: 'Languages',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/java.svg',
  },
  {
    name: 'SQL',
    level: 80,
    category: 'Languages',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg',
  },
  {
    name: 'React',
    level: 90,
    category: 'Frameworks',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
  },
  {
    name: 'FastAPI',
    level: 88,
    category: 'Frameworks',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/fastapi.svg',
  },
  {
    name: 'Tailwind CSS',
    level: 85,
    category: 'Frameworks',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg',
  },
  {
    name: 'Supabase',
    level: 78,
    category: 'Frameworks',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/supabase.svg',
  },
  {
    name: 'GraphQL',
    level: 72,
    category: 'Frameworks',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/graphql.svg',
  },
  {
    name: 'PyTorch',
    level: 85,
    category: 'AI / ML',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pytorch.svg',
  },
  {
    name: 'TensorFlow',
    level: 80,
    category: 'AI / ML',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tensorflow.svg',
  },
  {
    name: 'LangChain',
    level: 78,
    category: 'AI / ML',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/langchain.svg',
  },
  {
    name: 'Machine Learning',
    level: 88,
    category: 'AI / ML',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/machinelearning.svg',
  },
  {
    name: 'Data Visualization',
    level: 82,
    category: 'AI / ML',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/plotly.svg',
  },
  {
    name: 'Docker',
    level: 76,
    category: 'DevOps',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg',
  },
  {
    name: 'REST APIs',
    level: 92,
    category: 'DevOps',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postman.svg',
  },
  {
    name: 'AWS Lambda',
    level: 70,
    category: 'DevOps',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/awslambda.svg',
  },
  {
    name: 'PostgreSQL',
    level: 78,
    category: 'DevOps',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg',
  },
];

function SkillBar({ skill, index }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      key={skill.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="glass glass-hover rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-950/80 p-2">
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22%3E%3Crect width=%2224%22 height=%2224%22 fill=%22%23666%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dy=%22.35em%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2210%22 font-family=%22Arial,%20sans-serif%22%3E%3F%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
          <p className="text-sm font-semibold text-white">{skill.name}</p>
        </div>
        <span className="text-xs font-bold gradient-text-static">{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-800/80">
        <div
          className="skill-bar-fill"
          style={{ width: inView ? `${skill.level}%` : '0%' }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? skills
    : skills.filter(s => s.category === activeTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass glow-card rounded-3xl p-8 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">Skills</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              A strong toolkit for{' '}
              <span className="gradient-text">modern AI-driven</span> applications.
            </h2>
          </div>
          <p className="max-w-sm text-slate-400 text-sm leading-relaxed">
            Frontend polish · backend performance · machine learning tooling — across the full stack.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 shadow-glow'
                  : 'border border-slate-700/60 bg-slate-900/60 text-slate-400 hover:border-cyan-400/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill grid */}
      <motion.div
        layout
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
