import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  dark: boolean;
  toggle: () => void;
  className?: string;
}

export function ThemeToggle({ dark, toggle, className = '' }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${dark ? 'bg-white/10 hover:bg-white/15' : 'bg-black/5 hover:bg-black/10'} ${className}`}
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute"
          >
            <Sun size={18} className="text-[var(--text-primary)]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute"
          >
            <Moon size={18} className="text-[var(--text-primary)]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
