import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { CreateContent } from './createContent';
import { SideBar } from './Sidebar';
import { useContent } from './usefetchContent';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Plus, Share2, Brain, Search } from 'lucide-react';
import { Particles } from './shared/Particles';

async function handleShare() {
  const BACKED_URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const res = await axios.post(`${BACKED_URL}/api/v1/brain/share`, { share: true }, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    const data = res.data as { message: string };
    const hash = data.message;
    const fullLink = `${window.location.origin}/share/${hash}`;
    await navigator.clipboard.writeText(fullLink);
    toast.success('🔗 Share link copied to clipboard!');
  } catch (e) {
    toast.error('Failed to generate share link.');
  }
}

export function Dashboard() {
  useContent();
  const [model, openModel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div
      className="min-h-dvh flex transition-colors-300"
      style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
    >
      <Particles />
      <SideBar />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col min-h-dvh"
        style={{ marginLeft: '0', paddingLeft: '0' }}
      >
        {/* On desktop, offset for sidebar */}
        <div className="lg:ml-[220px] flex-1 flex flex-col">
          {/* Top bar */}
          <header
            className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-[var(--border)] backdrop-blur-2xl"
            style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}
          >
            <div className="flex items-center gap-3">
              <Brain size={20} style={{ color: 'var(--accent)' }} />
              <h1
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
              >
                My BrainDock
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-6 hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
              <input
                type="text"
                placeholder="Search your brain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--surface-raised)] border border-[var(--border)] rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)]"
              />
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                id="dashboard-share-btn"
                onClick={handleShare}
                className="btn-ghost flex items-center gap-2 text-sm px-4 py-2"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Share your brain"
              >
                <Share2 size={15} />
                <span className="hidden sm:inline">Share Brain</span>
              </motion.button>
              <motion.button
                id="dashboard-add-btn"
                onClick={() => openModel(true)}
                className="btn-accent flex items-center gap-2 text-sm px-4 py-2"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Add new content"
              >
                <Plus size={15} />
                <span>Add Link</span>
              </motion.button>
            </div>
          </header>

          {/* Card grid */}
          <main className="flex-1 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                <Outlet context={{ searchTerm }} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Add Content Modal */}
      <CreateContent model={model} setModel={openModel} />
    </div>
  );
}
