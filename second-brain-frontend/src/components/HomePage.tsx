import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './landing/Navbar';
import { Hero } from './landing/Hero';
import { SocialProof } from './landing/SocialProof';
import { Features } from './landing/Features';
import { HowItWorks } from './landing/HowItWorks';
import { LinkTypes } from './landing/LinkTypes';
import { CTASection } from './landing/CTASection';
import { Footer } from './landing/Footer';
import { Particles } from './shared/Particles';

export const HomePage = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative min-h-dvh transition-colors-300"
        style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
      >
        <Particles />
        <Navbar />
        <main>
          <Hero />
          <SocialProof />
          <Features />
          <HowItWorks />
          <LinkTypes />
          <CTASection />
        </main>
        <Footer />

        {/* Test credentials floating card */}
        <div
          className="fixed bottom-4 right-4 z-50 rounded-2xl border border-[var(--border)] p-4 text-xs"
          style={{
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-float)',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Test credentials</p>
          <p style={{ color: 'var(--text-secondary)' }}>
            user: <span style={{ color: 'var(--accent)' }}>varshan</span>
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            pass: <span style={{ color: 'var(--accent)' }}>varshan</span>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
