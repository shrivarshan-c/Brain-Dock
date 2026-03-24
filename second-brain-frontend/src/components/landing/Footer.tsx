import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../shared/ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

const FOOTER_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Privacy', href: '#' },
  { label: 'GitHub', href: '#' },
];

export function Footer() {
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();

  return (
    <footer className="border-t border-[var(--border)] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo + tagline */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer group"
          aria-label="Go to BrainDock home"
        >
          <span className="text-xl">🧠</span>
          <span
            className="font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem' }}
          >
            Brain<span style={{ color: 'var(--accent)' }}>Dock</span>
          </span>
          <span className="text-xs ml-2 hidden md:inline" style={{ color: 'var(--text-secondary)' }}>
            — Your second brain
          </span>
        </button>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm transition-colors duration-200 hover:text-[var(--accent)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            © 2025 BrainDock
          </p>
          <ThemeToggle dark={dark} toggle={toggle} />
        </div>
      </div>
    </footer>
  );
}
