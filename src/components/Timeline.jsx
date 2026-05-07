import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const timelineItems = [
  {
    year: '2024 – Present',
    title: 'AI/ML Research & Development',
    org: 'Self-directed · Open Source Contributions',
    type: 'experience',
    desc: 'Building and deploying computer vision models, LLM integrations, and full-stack AI products. Contributing to open-source ML tooling and writing technical posts.',
    tags: ['PyTorch', 'LangChain', 'FastAPI', 'React'],
    icon: '🤖',
  },
  {
    year: '2023 – 2024',
    title: 'Full-Stack Engineering Intern',
    org: 'Tech Startup · Remote',
    type: 'experience',
    desc: 'Developed and shipped React dashboards and REST APIs serving 10k+ monthly users. Introduced automated testing pipelines and reduced deployment time by 40%.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
    icon: '💼',
  },
  {
    year: '2022 – 2026',
    title: 'B.Eng. AI / Machine Learning & Software Engineering',
    org: 'University · Expected 2026',
    type: 'education',
    desc: 'Studying machine learning, deep learning, algorithms, distributed systems, and human-computer interaction. Dean\'s List two consecutive semesters.',
    tags: ['Deep Learning', 'Algorithms', 'Systems Design', 'HCI'],
    icon: '🎓',
  },
  {
    year: '2022',
    title: 'AWS Cloud Practitioner Certified',
    org: 'Amazon Web Services',
    type: 'achievement',
    desc: 'Earned the AWS Cloud Practitioner certification, demonstrating foundational knowledge of cloud architecture, services, and cost management.',
    tags: ['AWS', 'Cloud', 'DevOps'],
    icon: '☁️',
  },
];

const typeColors = {
  experience:  'from-cyan-400 to-violet-500',
  education:   'from-violet-400 to-pink-500',
  achievement: 'from-emerald-400 to-cyan-400',
};

const typeBadge = {
  experience:  'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
  education:   'bg-violet-400/10 text-violet-300 border-violet-400/20',
  achievement: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
};

export default function Timeline() {
  const lineRef = useRef(null);
  const inView  = useInView(lineRef, { once: true, amount: 0.1 });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass glow-card rounded-3xl p-8 md:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">Experience</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          My journey in{' '}
          <span className="gradient-text">engineering & research.</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative" ref={lineRef}>
        {/* Center line — desktop only */}
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 lg:block">
          <div
            className="rounded-full bg-gradient-to-b from-cyan-400 to-violet-500 transition-all duration-[2s] ease-out"
            style={{ height: inView ? '100%' : '0%' }}
          />
        </div>

        {/* Left line — mobile */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 lg:hidden">
          <div
            className="rounded-full bg-gradient-to-b from-cyan-400 to-violet-500 transition-all duration-[2s] ease-out"
            style={{ height: inView ? '100%' : '0%' }}
          />
        </div>

        <div className="space-y-10">
          {timelineItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex gap-6 pl-14 lg:pl-0 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Desktop dot */}
              <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 lg:flex">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${typeColors[item.type]} text-xl shadow-glow`}>
                  {item.icon}
                </span>
              </div>

              {/* Mobile dot */}
              <div className="absolute left-0 top-4 flex lg:hidden">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${typeColors[item.type]} text-xl shadow-glow`}>
                  {item.icon}
                </span>
              </div>

              {/* Card (takes half width on desktop) */}
              <div className={`w-full lg:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                <div className="glass glass-hover rounded-2xl p-6">
                  <div className={`flex flex-wrap items-center gap-2 mb-3 ${i % 2 === 0 ? 'lg:justify-end' : ''}`}>
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${typeBadge[item.type]}`}>
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-500">{item.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-cyan-300 font-medium">{item.org}</p>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  <div className={`mt-4 flex flex-wrap gap-2 ${i % 2 === 0 ? 'lg:justify-end' : ''}`}>
                    {item.tags.map(t => (
                      <span key={t} className="rounded-xl border border-slate-800/60 bg-slate-900/60 px-3 py-1 text-xs text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
