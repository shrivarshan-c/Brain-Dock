import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FloatingOrb } from '../shared/FloatingOrb';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, #7b5ef4 50%, #5e8ef4 100%)',
          opacity: 0.92,
        }}
      />
      {/* Orbs on top */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <FloatingOrb size={400} x="15%" y="50%" color="rgba(255,255,255,0.08)" animationClass="orb-1" />
        <FloatingOrb size={300} x="85%" y="40%" color="rgba(255,255,255,0.06)" animationClass="orb-2" />
      </div>
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 bg-grid pointer-events-none opacity-20"
        style={{ '--grid-color': 'rgba(255,255,255,0.15)' } as React.CSSProperties}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2
            className="text-5xl lg:text-6xl font-bold leading-tight text-white mb-4"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Stop losing your{' '}
            <em
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              good finds.
            </em>
          </h2>
          <p
            className="text-lg mb-10 text-white/80"
            style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}
          >
            Join thousands building their second brain on BrainDock. No credit card needed.
          </p>

          {/* Glassmorphism card */}
          <motion.div
            className="glass-card max-w-lg mx-auto p-6"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '20px',
              backdropFilter: 'blur(20px)',
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4"
              >
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-white font-semibold text-lg">You're on the list!</p>
                <p className="text-white/70 text-sm mt-1">We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
                <input
                  id="cta-email-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.25)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  aria-label="Email address"
                />
                <motion.button
                  id="cta-submit-btn"
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm flex-shrink-0"
                  style={{
                    background: '#fff',
                    color: 'var(--accent)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Early Access
                  <ArrowRight size={15} />
                </motion.button>
              </form>
            )}
          </motion.div>

          <p className="mt-4 text-sm text-white/50">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
