import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { FloatingOrb } from './shared/FloatingOrb';

export const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BACKED_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value?.trim();
    const password = passwordRef.current?.value;
    if (!username || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BACKED_URL}/api/v1/signup`, { username, password });
      toast.success('Account created! Sign in now. 🎉');
      navigate('/signin');
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Signup failed. Try a different username.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-dvh flex items-center justify-center relative overflow-hidden px-4 transition-colors-300"
      style={{ background: 'var(--bg)' }}
    >
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" aria-hidden="true" />
      <FloatingOrb size={500} x="80%" y="25%" animationClass="orb-1" opacity={0.7} color="var(--orb-color-2)" />
      <FloatingOrb size={350} x="15%" y="75%" animationClass="orb-2" opacity={0.5} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm mb-6 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Go back to home"
        >
          <ArrowLeft size={15} />
          Back to home
        </button>

        <div
          className="rounded-2xl p-8"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-float)',
          }}
        >
          <div className="flex items-center gap-2.5 mb-8">
            <span className="text-2xl">🧠</span>
            <span
              className="font-bold text-xl"
              style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
            >
              Brain<span style={{ color: 'var(--accent)' }}>Dock</span>
            </span>
          </div>

          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Create your account
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            Free forever. No credit card needed.
          </p>

          <form onSubmit={handleSignUp} className="space-y-4" noValidate>
            <div>
              <label htmlFor="signup-username" className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Username
              </label>
              <input
                id="signup-username"
                ref={usernameRef}
                type="text"
                placeholder="choose a username"
                autoComplete="username"
                className="input-bd"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  ref={passwordRef}
                  type={showPass ? 'text' : 'password'}
                  placeholder="min 6 characters"
                  autoComplete="new-password"
                  className="input-bd pr-10"
                  required
                  minLength={6}
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <motion.button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className="btn-accent w-full py-3 text-base mt-2"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              style={{ opacity: loading ? 0.7 : 1 }}
              aria-busy={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : 'Create Account — Free'}
            </motion.button>
          </form>

          <p className="text-xs text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
            By signing up, you agree to our Terms of Service.
          </p>

          <p className="text-sm text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <button
              id="goto-signin"
              onClick={() => navigate('/signin')}
              className="font-semibold transition-colors hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
