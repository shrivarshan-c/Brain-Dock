import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { FloatingOrb } from '../shared/FloatingOrb';

const HERO_CARDS = [
  {
    icon: '▶',
    iconColor: '#FF0000',
    bg: '#FF00001a',
    title: 'CS50 Lecture 4 — Memory',
    tag: 'YouTube',
    tagColor: '#FF0000',
    rotate: -8,
    translateX: -140,
    translateY: -30,
    delay: 0,
  },
  {
    icon: '𝕏',
    iconColor: '#1d9bf0',
    bg: '#1d9bf01a',
    title: 'Thread on React internals',
    tag: 'Twitter/X',
    tagColor: '#1d9bf0',
    rotate: 4,
    translateX: 80,
    translateY: -60,
    delay: 0.12,
  },
  {
    icon: '⚡',
    iconColor: '#FFA116',
    bg: '#FFA1161a',
    title: 'LeetCode #146 — LRU Cache',
    tag: 'LeetCode',
    tagColor: '#FFA116',
    rotate: -2,
    translateX: -50,
    translateY: 50,
    delay: 0.08,
  },
  {
    icon: '📄',
    iconColor: '#4285f4',
    bg: '#4285f41a',
    title: 'System Design Notes',
    tag: 'Docs',
    tagColor: '#4285f4',
    rotate: 10,
    translateX: 150,
    translateY: 30,
    delay: 0.18,
  },
  {
    icon: '⬛',
    iconColor: '#6e40c9',
    bg: '#6e40c91a',
    title: 'awesome-react-hooks',
    tag: 'GitHub',
    tagColor: '#6e40c9',
    rotate: -5,
    translateX: 20,
    translateY: -120,
    delay: 0.22,
  },
];

function HeroCreativeCluster() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex-1 flex items-center justify-center relative w-full translate-y-8 lg:translate-y-0"
      style={{ minHeight: '550px', perspective: '1200px' }}
    >
      <motion.div
        animate={{
          rotateX: -mousePos.y * 15,
          rotateY: mousePos.x * 15,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateZ(-50px)' }}>
          <svg className="w-[500px] h-[500px]" overflow="visible">
            <defs>
              <filter id="glow-hero">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <circle cx="250" cy="250" r="160" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" fill="none" className="animate-[spin_40s_linear_infinite]" />
            <circle cx="250" cy="250" r="220" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="2 12" fill="none" className="animate-[spin_60s_linear_infinite_reverse]" filter="url(#glow-hero)" />
          </svg>
        </div>

        {/* Central Core */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(var(--accent-rgb), 0.15)',
              '0 0 60px rgba(var(--accent-rgb), 0.4)',
              '0 0 20px rgba(var(--accent-rgb), 0.15)'
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute z-50 w-24 h-24 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--accent)]/40 backdrop-blur-xl"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-10 animate-pulse" />
          <span className="text-4xl filter drop-shadow-[0_0_10px_var(--accent)]">🧠</span>
        </motion.div>

        {/* Orbiting Cards */}
        {HERO_CARDS.map((card, i) => {
          const angle = (i / HERO_CARDS.length) * Math.PI * 2;
          const radius = i % 2 === 0 ? 150 : 200;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const z = 20 + i * 15; // Depth variation for parallax

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                x, y, z, // framer-motion maps z to translateZ seamlessly
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.8, type: 'spring' }}
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotateZ: [card.rotate, card.rotate + (i % 2 === 0 ? 3 : -3), card.rotate],
                }}
                transition={{
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
                className="card-shimmer rounded-2xl p-4 cursor-pointer select-none"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  minWidth: '200px',
                  boxShadow: `0 15px 35px -10px ${card.tagColor}25`,
                  backdropFilter: 'blur(16px)',
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: `0 25px 50px -12px ${card.tagColor}50`,
                  borderColor: card.tagColor,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-inner"
                    style={{ background: card.bg, color: card.iconColor }}
                  >
                    {card.icon}
                  </span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full border tracking-wide uppercase"
                    style={{
                      background: `${card.tagColor}15`,
                      color: card.tagColor,
                      borderColor: `${card.tagColor}30`,
                      fontFamily: 'DM Sans'
                    }}
                  >
                    {card.tag}
                  </span>
                </div>
                <p
                  className="text-[14px] font-semibold leading-snug"
                  style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans' }}
                >
                  {card.title}
                </p>
                <div
                  className="mt-3.5 h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'var(--surface-raised)' }}
                >
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{ background: card.tagColor, width: '0%' }}
                    animate={{ width: `${40 + i * 12}%` }}
                    transition={{ delay: 1 + i * 0.2, duration: 1.5, ease: 'easeOut' }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 px-4"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <FloatingOrb size={600} x="20%" y="30%" animationClass="orb-1" opacity={0.8} />
        <FloatingOrb size={450} x="80%" y="20%" animationClass="orb-2" opacity={0.6}
          color="var(--orb-color-2)" />
        <FloatingOrb size={350} x="60%" y="75%" animationClass="orb-3" opacity={0.5}
          color="var(--orb-color-3)" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" aria-hidden="true" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl w-full mx-auto">
        {/* Left: Copy */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                background: 'var(--accent-glow)',
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Free to use · Public sharing
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Your second{' '}
            <em
              className="not-italic"
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontStyle: 'italic',
                color: 'var(--accent)',
                fontWeight: 400,
              }}
            >
              brain
            </em>
            {' '}—{' '}
            <span style={{ fontFamily: 'Instrument Serif, serif', fontWeight: 400, fontStyle: 'italic' }}>
              now weightless.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
            className="text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)', maxWidth: '460px' }}
          >
            Save YouTube videos, docs, tweets, and LeetCode threads. Organize them. Share them.{' '}
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Never lose a link again.</strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <motion.button
              id="hero-cta-primary"
              onClick={() => navigate('/signup')}
              className="btn-accent flex items-center gap-2 px-6 py-3 text-base"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started Free
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              id="hero-cta-secondary"
              onClick={() => navigate('/signin')}
              className="btn-ghost flex items-center gap-2 px-6 py-3 text-base"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play size={14} />
              See Demo
            </motion.button>
          </motion.div>

          {/* Mini social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex items-center gap-3 pt-2"
          >
            <div className="flex -space-x-2">
              {['S', 'A', 'K', 'R', 'M'].map((l, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[var(--bg)] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: `hsl(${i * 60 + 200}, 70%, 50%)`, zIndex: 5 - i }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>2,000+</strong> learners organizing their internet
            </p>
          </motion.div>
        </div>

        {/* Right: Hero Card Cluster */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex-1 w-full"
        >
          <HeroCreativeCluster />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-[var(--border)] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
