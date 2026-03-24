import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../shared/ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Free', href: '#cta' },
];

export function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.nav
        id="main-navbar"
        className={`navbar-pill flex items-center gap-6 px-5 py-2.5 rounded-2xl backdrop-blur-xl border ${
          scrolled
            ? 'shadow-float-dark dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-[var(--border)]'
            : 'border-transparent'
        }`}
        style={{
          background: scrolled
            ? dark ? 'rgba(15,16,24,0.88)' : 'rgba(245,247,255,0.88)'
            : dark ? 'rgba(15,16,24,0.5)' : 'rgba(245,247,255,0.5)',
          maxWidth: scrolled ? '720px' : '860px',
          width: '100%',
        }}
        animate={{
          paddingTop: scrolled ? '8px' : '10px',
          paddingBottom: scrolled ? '8px' : '10px',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Logo */}
        <button
          id="navbar-logo"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          aria-label="Go to BrainDock home"
        >
          <span className="text-xl">🧠</span>
          <span
            className="font-bold tracking-tight text-[var(--text-primary)]"
            style={{ fontSize: '1.05rem', fontFamily: 'DM Sans, sans-serif' }}
          >
            Brain<span style={{ color: 'var(--accent)' }}>Dock</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 ml-4 flex-1">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle dark={dark} toggle={toggle} />

          <button
            id="navbar-signin"
            onClick={() => navigate('/signin')}
            className="hidden md:block btn-ghost text-sm px-4 py-2"
          >
            Sign In
          </button>

          <motion.button
            id="navbar-cta"
            onClick={() => navigate('/signup')}
            className="btn-accent text-sm px-4 py-2 hidden md:block"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start for Free
          </motion.button>

          {/* Mobile hamburger */}
          <button
            id="navbar-mobile-menu"
            className="md:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 left-4 right-4 rounded-2xl border border-[var(--border)] backdrop-blur-xl z-40 p-4 flex flex-col gap-3"
          style={{ background: dark ? 'rgba(15,16,24,0.95)' : 'rgba(245,247,255,0.95)' }}
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2 px-3 rounded-xl hover:bg-[var(--surface-raised)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-[var(--border)] pt-3 flex flex-col gap-2">
            <button onClick={() => navigate('/signin')} className="btn-ghost text-sm w-full">
              Sign In
            </button>
            <button onClick={() => navigate('/signup')} className="btn-accent text-sm w-full">
              Start for Free
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
