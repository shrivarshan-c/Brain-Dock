import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Card } from './Card';
import { FloatingOrb } from './shared/FloatingOrb';
import { Particles } from './shared/Particles';
import { ArrowRight, Brain } from 'lucide-react';

interface ContentItem {
  title: string;
  description: string;
  type: string;
  link: string;
}

export const SharedComponent = () => {
  const { shareLink } = useParams<{ shareLink: string }>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const BACKED_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BACKED_URL}/api/v1/brain/${shareLink}`);
        const data = res.data as { findUser?: { username: string }; findContent?: ContentItem[] };
        if (data.findUser && data.findContent) {
          setContent(data.findContent);
          setUsername(data.findUser.username);
        } else {
          setError('This share link may be invalid or expired.');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [shareLink]);

  return (
    <div
      className="min-h-dvh transition-colors-300 relative"
      style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
    >
      <Particles />
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" aria-hidden="true" />
      <FloatingOrb size={500} x="10%" y="20%" animationClass="orb-1" opacity={0.6} />
      <FloatingOrb size={350} x="90%" y="60%" animationClass="orb-2" opacity={0.5} color="var(--orb-color-2)" />

      {/* Header */}
      <header
        className="relative z-10 border-b border-[var(--border)] px-6 py-4 flex items-center justify-between backdrop-blur-xl"
        style={{ background: 'var(--bg)', opacity: 0.97 }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Go to BrainDock home"
        >
          <Brain size={20} style={{ color: 'var(--accent)' }} />
          <span className="font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans' }}>
            Brain<span style={{ color: 'var(--accent)' }}>Dock</span>
          </span>
        </button>
        <motion.button
          onClick={() => navigate('/signup')}
          className="btn-accent text-sm px-4 py-2 flex items-center gap-2"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          Build Your Own <ArrowRight size={13} />
        </motion.button>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
          >
            <div className="text-5xl">😕</div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{error}</h2>
            <button onClick={() => navigate('/')} className="btn-ghost text-sm">
              Go to BrainDock
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="mb-10"
            >
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Shared by
              </p>
              <h1
                className="text-4xl font-bold"
                style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
              >
                <em
                  style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}
                >
                  {username}
                </em>
                {"'s BrainDock"}
              </h1>
              <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
                {content.length} saved link{content.length !== 1 ? 's' : ''} · Read-only
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.map(({ title, description, type, link }, idx) => (
                <Card
                  key={idx}
                  title={title}
                  type={type}
                  description={description}
                  src={link}
                />
              ))}
            </div>

            {/* BrainDock branding footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                Saved with
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-base font-bold hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                🧠 BrainDock
              </button>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Your second brain — now weightless.
              </p>
              <motion.button
                onClick={() => navigate('/signup')}
                className="btn-accent mt-4 text-sm px-6 py-2.5 inline-flex items-center gap-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Build yours for free <ArrowRight size={13} />
              </motion.button>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};
