import { motion } from 'framer-motion';
import { useState } from 'react';

const contacts = [
  {
    label: 'GitHub',
    href: 'https://github.com/alexdai-dev',
    description: 'Check out my repositories',
    color: 'from-slate-400 to-slate-200',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.724-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.744 0.083-0.729 0.083-0.729 1.205 0.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495 0.997 0.108-0.775 0.418-1.305 0.76-1.605-2.665-0.305-5.466-1.332-5.466-5.93 0-1.31 0.469-2.381 1.236-3.221-0.124-0.303-0.536-1.524 0.117-3.176 0 0 1.008-0.322 3.301 1.23 0.957-0.266 1.983-0.399 3.003-0.404 1.02 0.005 2.047 0.138 3.006 0.404 2.291-1.552 3.297-1.23 3.297-1.23 0.655 1.653 0.243 2.874 0.119 3.176 0.77 0.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.476 5.921 0.43 0.37 0.823 1.102 0.823 2.222 0 1.606-0.015 2.899-0.015 3.293 0 0.322 0.218 0.694 0.825 0.576 4.765-1.589 8.199-6.087 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alex-dai-dev',
    description: 'Connect professionally',
    color: 'from-blue-400 to-blue-600',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-0.026-3.038-1.852-3.038-1.853 0-2.136 1.445-2.136 2.939v5.668h-3.554v-11.5h3.414v1.571h0.049c0.476-0.9 1.637-1.852 3.369-1.852 3.601 0 4.267 2.368 4.267 5.456v6.325zm-16.358-13.1c-1.145 0-2.075-0.929-2.075-2.075s0.93-2.075 2.075-2.075 2.075 0.929 2.075 2.075-0.93 2.075-2.075 2.075zm1.777 13.1h-3.554v-11.5h3.554v11.5zm18.134-20.452h-22.002c-0.551 0-0.998 0.447-0.998 0.998v22.004c0 0.551 0.447 0.998 0.998 0.998h22.002c0.551 0 0.998-0.447 0.998-0.998v-22.004c0-0.551-0.447-0.998-0.998-0.998z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:alex.dai.dev@example.com',
    description: 'alex.dai.dev@example.com',
    color: 'from-cyan-400 to-violet-500',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 12.713l-11.99-8.713c0-0.001 0-0.001 0-0.001v14.001c0 0.55 0.45 0.999 1 0.999h21.999c0.55 0 1-0.449 1-0.999v-14.001c0 0 0 0 0 0l-11.999 8.713zM12 9.734l10.683-7.765h-21.366l10.683 7.765z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error
  const [focused, setFocused] = useState('');

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass glow-card rounded-3xl p-8 md:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">Contact</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Let's build the <span className="gradient-text">next intelligent</span> product together.
        </h2>
        <p className="mt-4 max-w-xl text-slate-400">
          Whether you have a research prototype, startup idea, or ML integration challenge — I'm ready
          to take it from concept to production.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        {/* ─── Social links ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass glow-card rounded-3xl p-8 md:p-10 space-y-6"
        >
          <p className="text-sm font-medium text-slate-400">Find me on</p>
          <div className="space-y-3">
            {contacts.map(item => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-slate-800/60 bg-slate-950/40 px-5 py-4 transition-all hover:border-cyan-400/30 hover:bg-slate-900/60"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-slate-950 shadow-glow`}>
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{item.label}</p>
                  <p className="text-sm text-slate-500 truncate">{item.description}</p>
                </div>
                <svg className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ))}
          </div>

          {/* Availability banner */}
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-sm font-semibold text-emerald-300">Currently Available</p>
            </div>
            <p className="text-sm text-slate-400">
              Open to internships, part-time roles, freelance projects, and research collaborations.
              Response time: &lt; 24 hours.
            </p>
          </div>
        </motion.div>

        {/* ─── Contact Form ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass glow-card rounded-3xl p-8 md:p-10"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full flex-col items-center justify-center gap-4 text-center py-12"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-3xl">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white">Message Sent!</h3>
              <p className="text-slate-400 max-w-xs">
                Thanks for reaching out! I'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-sm font-medium text-slate-400 mb-6">Send a message</p>

              {[
                { id: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'Alex Dai' },
                { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              ].map(field => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-2 block text-sm font-medium text-slate-400"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    value={form[field.id]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused('')}
                    placeholder={field.placeholder}
                    className={`w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition-all duration-300 placeholder:text-slate-600 ${
                      focused === field.id
                        ? 'border-cyan-400/60 ring-2 ring-cyan-400/15 bg-slate-900/80'
                        : 'border-slate-800/80 hover:border-slate-700'
                    }`}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-400">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  placeholder="Tell me about your project, team, or challenges..."
                  className={`w-full rounded-2xl border bg-slate-950/60 px-4 py-3 text-slate-100 outline-none transition-all duration-300 resize-none placeholder:text-slate-600 ${
                    focused === 'message'
                      ? 'border-cyan-400/60 ring-2 ring-cyan-400/15 bg-slate-900/80'
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full btn-shimmer rounded-full py-3.5 text-sm font-bold text-slate-950 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  'Send Message →'
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
