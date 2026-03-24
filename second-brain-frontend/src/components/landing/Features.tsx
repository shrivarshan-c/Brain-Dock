import { motion } from 'framer-motion';
import { Link, FolderOpen, Globe, Tag, Search, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: <Link size={22} />,
    title: 'Save Any Link',
    desc: 'YouTube, GitHub, docs, tweets, LeetCode — paste any URL and it just works.',
    accent: '#5b5ef4',
    size: 'large',
  },
  {
    icon: <FolderOpen size={22} />,
    title: 'Smart Collections',
    desc: 'Organize into named decks and boards that make sense to you.',
    accent: '#7b5ef4',
    size: 'normal',
  },
  {
    icon: <Globe size={22} />,
    title: 'Public Sharing',
    desc: 'Share curated link collections via a single URL — your knowledge, public.',
    accent: '#5e8ef4',
    size: 'normal',
  },
  {
    icon: <Tag size={22} />,
    title: 'Tags & Filters',
    desc: 'Tag anything. Find everything. Zero cognitive overhead.',
    accent: '#5ef4a2',
    size: 'normal',
  },
  {
    icon: <Search size={22} />,
    title: 'Full Search',
    desc: 'Across titles, tags, and URLs — instant results as you type.',
    accent: '#f45e5e',
    size: 'normal',
  },
  {
    icon: <Zap size={22} />,
    title: 'Instant Preview',
    desc: 'Rich metadata preview on hover — favicon, title, description.',
    accent: '#f4c55e',
    size: 'normal',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 max-w-2xl"
        >
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border"
            style={{ color: 'var(--accent)', borderColor: 'var(--accent)', background: 'var(--accent-glow)' }}
          >
            Features
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Everything floats{' '}
            <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400 }}>
              into place.
            </em>
          </h2>
          <p className="mt-4 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Purpose-built for the way you actually consume and save knowledge.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -6 }}
              className={`card-float card-shimmer rounded-2xl p-6 relative overflow-hidden group ${
                i === 0 ? 'md:col-span-2 md:row-span-1' : ''
              }`}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.accent}, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${feat.accent}18`, color: feat.accent }}
              >
                {feat.icon}
              </div>

              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
              >
                {feat.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {feat.desc}
              </p>

              {/* Background glow */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: feat.accent, filter: 'blur(40px)', pointerEvents: 'none' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
