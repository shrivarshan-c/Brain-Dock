import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const AVATARS = [
  { initials: 'AK', hue: 220 },
  { initials: 'SR', hue: 160 },
  { initials: 'JP', hue: 280 },
  { initials: 'ML', hue: 40 },
  { initials: 'TN', hue: 340 },
  { initials: 'VC', hue: 190 },
  { initials: 'BW', hue: 100 },
];

export function SocialProof() {
  return (
    <section className="relative py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-2xl border border-[var(--border)] px-8 py-5 flex flex-wrap items-center justify-between gap-4"
          style={{ background: 'var(--surface)' }}
        >
          {/* Avatars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[var(--surface)] flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `hsl(${av.hue}, 65%, 50%)`, zIndex: AVATARS.length - i }}
                  role="img"
                  aria-label={`User ${av.initials}`}
                >
                  {av.initials}
                </div>
              ))}
              <div
                className="w-9 h-9 rounded-full border-2 border-[var(--surface)] flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: 'var(--surface-raised)', color: 'var(--text-secondary)', zIndex: 0 }}
              >
                +2k
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>2,000+</span>{' '}
              learners organizing their internet
            </p>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-[#FBBF24] text-[#FBBF24]" />
              ))}
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              4.9 / 5
            </span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              from early users
            </span>
          </div>

          {/* Logos/Labels */}
          <div className="flex items-center gap-2 flex-wrap">
            {['YouTube', 'Twitter', 'GitHub', 'LeetCode', 'Notion'].map((name) => (
              <span
                key={name}
                className="text-xs px-3 py-1 rounded-full border border-[var(--border)] font-medium"
                style={{ color: 'var(--text-secondary)', background: 'var(--surface-raised)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
