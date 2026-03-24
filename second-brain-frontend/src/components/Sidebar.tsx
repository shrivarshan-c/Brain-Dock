import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Play as YTIcon, MessageCircle as Twitter, FileText, LayoutGrid, LogOut, Menu, X, StickyNote } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from './shared/ThemeToggle';

const NAV_ITEMS = [
  {
    label: 'All',
    icon: <LayoutGrid size={18} />,
    path: '/dashboard',
    exact: true,
    accent: '#5b5ef4',
  },
  {
    label: 'YouTube',
    icon: <YTIcon size={18} />,
    path: '/dashboard/youtube',
    accent: '#FF0000',
  },
  {
    label: 'Twitter',
    icon: <Twitter size={18} />,
    path: '/dashboard/twitter',
    accent: '#1d9bf0',
  },
  {
    label: 'Documents',
    icon: <FileText size={18} />,
    path: '/dashboard/document',
    accent: '#4285f4',
  },
  {
    label: 'Notes',
    icon: <StickyNote size={18} />,
    path: '/dashboard/note',
    accent: '#10b981',
  },
];

export function SideBar() {
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.exact) return location.pathname === item.path || location.pathname === '/dashboard/';
    return location.pathname === item.path;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 py-4 mb-2 cursor-pointer"
        onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
        role="button"
        aria-label="Go to dashboard"
      >
        <span className="text-2xl">🧠</span>
        <span
          className="font-bold text-lg tracking-tight"
          style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
        >
          Brain<span style={{ color: 'var(--accent)' }}>Dock</span>
        </span>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-4 h-px" style={{ background: 'var(--border)' }} />

      {/* Nav label */}
      <p
        className="px-4 mb-2 text-[11px] font-semibold tracking-widest uppercase"
        style={{ color: 'var(--text-secondary)' }}
      >
        Collections
      </p>

      {/* Nav items */}
      <nav className="flex-1 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <motion.button
              key={item.label}
              id={`sidebar-${item.label.toLowerCase()}`}
              onClick={() => { navigate(item.path); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 relative group text-left"
              style={{
                background: active ? `${item.accent}14` : 'transparent',
                color: active ? item.accent : 'var(--text-secondary)',
                borderLeft: active ? `3px solid ${item.accent}` : '3px solid transparent',
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              aria-current={active ? 'page' : undefined}
            >
              <span style={{ color: active ? item.accent : 'var(--text-secondary)' }}>
                {item.icon}
              </span>
              {item.label}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl -z-10"
                  style={{ background: `${item.accent}0a` }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-1 mt-4">
        <div className="mx-2 mb-3 h-px" style={{ background: 'var(--border)' }} />

        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {dark ? 'Dark Mode' : 'Light Mode'}
          </span>
          <ThemeToggle dark={dark} toggle={toggle} />
        </div>

        <motion.button
          id="sidebar-logout"
          onClick={() => { localStorage.clear(); navigate('/'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 text-left"
          style={{ color: 'var(--text-secondary)' }}
          whileHover={{ x: 2, color: '#ef4444' }}
          whileTap={{ scale: 0.98 }}
          aria-label="Logout"
        >
          <LogOut size={16} />
          Logout
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <motion.button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--border)]"
        style={{ background: 'var(--surface)' }}
        onClick={() => setIsOpen(v => !v)}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={18} style={{ color: 'var(--text-primary)' }} /> : <Menu size={18} style={{ color: 'var(--text-primary)' }} />}
      </motion.button>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40"
        style={{
          width: '220px',
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
        }}
        aria-label="Sidebar navigation"
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col"
              style={{
                width: '220px',
                background: 'var(--surface)',
                borderRight: '1px solid var(--border)',
              }}
              aria-label="Mobile navigation"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
