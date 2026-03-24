import { motion } from 'framer-motion';
import { Clipboard, Tag, Share2 } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: <Clipboard size={24} />,
    title: 'Paste a link',
    desc: 'Drop any URL. We auto-fetch the title, description, and type.',
    accent: '#5b5ef4',
  },
  {
    number: '02',
    icon: <Tag size={24} />,
    title: 'Tag & organize',
    desc: 'Add tags, pick a collection. Your brain, your structure.',
    accent: '#7b5ef4',
  },
  {
    number: '03',
    icon: <Share2 size={24} />,
    title: 'Share or revisit',
    desc: 'One link shares your whole collection. Or keep it private forever.',
    accent: '#5e8ef4',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border"
            style={{ color: 'var(--accent)', borderColor: 'var(--accent)', background: 'var(--accent-glow)' }}
          >
            How it Works
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Three steps.{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>
              Zero friction.
            </em>
          </h2>
        </motion.div>

        {/* Steps with SVG connector */}
        <div className="relative">
          {/* Horizontal dashed connector line for desktop */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px">
            <svg className="w-full h-6" viewBox="0 0 100 8" preserveAspectRatio="none">
              <line
                x1="0" y1="4" x2="100" y2="4"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {/* Moving dot */}
              <circle r="3" fill="var(--accent)" opacity="0.8">
                <animateMotion dur="4s" repeatCount="indefinite" path="M0,4 L100,4" />
              </circle>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6 }}
                className="card-float card-shimmer rounded-2xl p-7 relative"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Step number */}
                <div
                  className="absolute top-5 right-5 text-2xl font-bold opacity-10"
                  style={{ fontFamily: 'Instrument Serif, serif', color: step.accent }}
                >
                  {step.number}
                </div>

                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${step.accent}15`, color: step.accent }}
                >
                  {step.icon}
                </div>

                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${step.accent}60, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
