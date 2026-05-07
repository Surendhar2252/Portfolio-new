import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

const navItems = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Experience',   href: '#timeline' },
  { label: 'Contact',      href: '#contact' },
];

const socialLinks = [
  { label: 'GitHub',   href: 'https://github.com/alexdai-dev' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alex-dai-dev' },
  { label: 'Twitter',  href: '#' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

// ─── Particle Canvas ──────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(34,211,238,', 'rgba(168,85,247,', 'rgba(56,189,248,'];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.6 + 0.4,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34,211,238,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

export default function App() {
  const [scrollY, setScrollY]         = useState(0);
  const [activeSection, setActive]    = useState('home');
  const [menuOpen, setMenuOpen]       = useState(false);
  const [cursorPos, setCursorPos]     = useState({ x: -500, y: -500 });
  const [showTop, setShowTop]         = useState(false);
  const progressRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (sy / total) * 100 : 0;
      setScrollY(sy);
      setShowTop(sy > 400);
      document.documentElement.style.setProperty('--scroll-progress', `${pct}%`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cursor glow
  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Cursor glow */}
      <div
        className="cursor-glow hidden lg:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" />

      {/* ─── Navbar ──────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrollY > 40
            ? 'border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-slate-950/40'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="group flex items-center gap-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-black text-slate-950">
              AD
            </span>
            <span className="text-sm font-semibold text-white transition group-hover:text-cyan-300">
              Alexander Dai
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`nav-link text-sm text-slate-400 hover:text-white ${
                  activeSection === item.href.replace('#', '') ? 'active' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="hidden rounded-full border border-cyan-400/30 px-4 py-2 text-sm text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-white md:inline-flex"
            >
              Say Hello 👋
            </a>

            {/* Hamburger */}
            <button
              aria-label="Toggle menu"
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-900/60 md:hidden"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span className={`block h-0.5 w-5 rounded-full bg-slate-300 transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 rounded-full bg-slate-300 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 w-5 rounded-full bg-slate-300 transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu ─────────────────────────────────── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          aria-label="Close menu"
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }}
              transition={{ delay: i * 0.07 }}
              className="text-2xl font-semibold text-slate-200 hover:text-cyan-300 transition"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); setMenuOpen(false); }}
          className="mt-10 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-8 py-3 text-sm font-bold text-slate-950"
        >
          Say Hello 👋
        </a>
      </div>

      {/* ─── Main Content ─────────────────────────────────── */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-8">

        {/* Hero */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} id="home">
          <Hero />
        </motion.div>

        {/* About */}
        <motion.section
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          id="about" className="mt-24"
        >
          <About />
        </motion.section>

        {/* Skills */}
        <motion.section
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          id="skills" className="mt-24"
        >
          <Skills />
        </motion.section>

        {/* Projects */}
        <motion.section
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          id="projects" className="mt-24"
        >
          <Projects />
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          id="timeline" className="mt-24"
        >
          <Timeline />
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          id="testimonials" className="mt-24"
        >
          <Testimonials />
        </motion.section>

        {/* Contact */}
        <motion.section
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          id="contact" className="mt-24"
        >
          <Contact />
        </motion.section>
      </main>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-sm font-black text-slate-950">AD</span>
                <span className="font-semibold text-white">Alexander Dai</span>
              </div>
              <p className="mt-3 text-sm text-slate-500 max-w-xs">
                AI/ML & Full-Stack engineer building the next generation of intelligent applications.
              </p>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">Navigation</p>
              <ul className="space-y-2">
                {navItems.map(item => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                      className="text-sm text-slate-400 hover:text-cyan-300 transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-slate-500">Connect</p>
              <ul className="space-y-2">
                {socialLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-slate-400 hover:text-cyan-300 transition"
                    >
                      {link.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800/50 pt-6 md:flex-row">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} Alexander Dai. Crafted with React, Tailwind & Framer Motion.
            </p>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-500">Available for opportunities</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Back To Top ─────────────────────────────────── */}
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`back-to-top flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:shadow-cyan-400/40 ${showTop ? 'visible' : ''}`}
      >
        ↑
      </button>
    </div>
  );
}
