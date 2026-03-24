import { motion } from 'framer-motion';

const LINK_TYPES = [
  { label: 'YouTube', icon: '▶', color: '#FF0000', rotate: -6, delay: 0 },
  { label: 'Twitter / X', icon: '𝕏', color: '#1d9bf0', rotate: 3, delay: 0.08 },
  { label: 'GitHub', icon: '⬛', color: '#6e40c9', rotate: -2, delay: 0.16 },
  { label: 'LeetCode', icon: '⚡', color: '#FFA116', rotate: 5, delay: 0.12 },
  { label: 'Docs / Notion', icon: '📄', color: '#4285f4', rotate: -4, delay: 0.2 },
];

export function LinkTypes() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Built for every corner{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>
              of the internet.
            </em>
          </h2>
          <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>
            Save from any platform. It all lands in one place.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {LINK_TYPES.map((lt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: lt.rotate }}
              viewport={{ once: true }}
              transition={{ delay: lt.delay, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -8, rotate: 0, scale: 1.06 }}
              className="card-float card-shimmer flex items-center gap-3 px-6 py-4 rounded-2xl cursor-default"
              style={{
                background: 'var(--surface)',
                border: `1px solid ${lt.color}30`,
                boxShadow: `var(--shadow-float), 0 0 0 1px ${lt.color}10`,
              }}
            >
              <span
                className="text-xl w-9 h-9 rounded-xl flex items-center justify-center font-bold flex-shrink-0"
                style={{ background: `${lt.color}18`, color: lt.color }}
              >
                {lt.icon}
              </span>
              <span
                className="font-semibold text-base"
                style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
              >
                {lt.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
