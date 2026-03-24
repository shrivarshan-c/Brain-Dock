import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Link as LinkIcon, Tag, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import type React from 'react';
import type { SetStateAction } from 'react';

const CONTENT_TYPES = [
  { value: 'youtube', label: 'YouTube', color: '#FF0000', icon: '▶' },
  { value: 'twitter', label: 'Twitter / X', color: '#1d9bf0', icon: '𝕏' },
  { value: 'document', label: 'Document', color: '#4285f4', icon: '📄' },
  { value: 'leetcode', label: 'LeetCode', color: '#FFA116', icon: '⚡' },
  { value: 'note', label: 'Note', color: '#10b981', icon: '📝' },
];

interface ModelType {
  model: boolean;
  setModel: React.Dispatch<SetStateAction<boolean>>;
}

export const CreateContent = ({ model, setModel }: ModelType) => {
  const [selectedType, setSelectedType] = useState(CONTENT_TYPES[0]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const BACKED_URL = import.meta.env.VITE_BACKEND_URL;

  const close = () => setModel(false);

  const addContent = async () => {
    const title = titleRef.current?.value?.trim();
    let link = selectedType.value === 'note' ? 'note' : linkRef.current?.value?.trim();
    const description = selectedType.value === 'note' ? noteRef.current?.value?.trim() : descriptionRef.current?.value?.trim();
    
    if (!title || (selectedType.value !== 'note' && !link)) {
      toast.error('Title and link are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKED_URL}/api/v1/content`,
        { title, link, type: selectedType.value, description },
        { headers: { Authorization: `${localStorage.getItem('token')}` } }
      );
      const resData = res.data as { message?: string };
      toast.success(resData?.message || 'Link added!');
      close();
      if (titleRef.current) titleRef.current.value = '';
      if (linkRef.current) linkRef.current.value = '';
      if (descriptionRef.current) descriptionRef.current.value = '';
      if (noteRef.current) noteRef.current.value = '';
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to add link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {model && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Add new content"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-float-hover)',
            }}
          >
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, ${selectedType.color}60, var(--accent), ${selectedType.color}60)` }}
            />

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div>
                <h2
                  className="text-lg font-bold"
                  style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Add a Link
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Save it to your BrainDock
                </p>
              </div>
              <button
                onClick={close}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: 'var(--surface-raised)', color: 'var(--text-secondary)' }}
                aria-label="Close modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 pb-6 space-y-4">
              {/* Content type selector */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Type
                </label>
                <div className="relative">
                  <button
                    id="content-type-selector"
                    onClick={() => setTypeOpen(v => !v)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={typeOpen}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ background: `${selectedType.color}18`, color: selectedType.color }}
                      >
                        {selectedType.icon}
                      </span>
                      {selectedType.label}
                    </span>
                    <ChevronDown size={14} style={{ color: 'var(--text-secondary)', transform: typeOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                  </button>
                  <AnimatePresence>
                    {typeOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        className="absolute top-full mt-1 w-full z-10 rounded-xl overflow-hidden"
                        style={{
                          transformOrigin: 'top',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          boxShadow: 'var(--shadow-float)',
                        } as React.CSSProperties}
                        role="listbox"
                      >
                        {CONTENT_TYPES.map((ct) => (
                          <li
                            key={ct.value}
                            role="option"
                            aria-selected={selectedType.value === ct.value}
                            onClick={() => { setSelectedType(ct); setTypeOpen(false); }}
                            className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm font-medium transition-colors"
                            style={{
                              color: 'var(--text-primary)',
                              background: selectedType.value === ct.value ? 'var(--surface-raised)' : 'transparent',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-raised)')}
                            onMouseLeave={e => (e.currentTarget.style.background = selectedType.value === ct.value ? 'var(--surface-raised)' : 'transparent')}
                          >
                            <span
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                              style={{ background: `${ct.color}18`, color: ct.color }}
                            >
                              {ct.icon}
                            </span>
                            {ct.label}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="add-title" className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Title
                </label>
                <input
                  id="add-title"
                  ref={titleRef}
                  type="text"
                  placeholder="e.g. CS50 Lecture 4"
                  className="input-bd"
                  required
                  aria-required="true"
                />
              </div>

              {/* Link */}
              {selectedType.value !== 'note' && (
                <div>
                  <label htmlFor="add-link" className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    URL
                  </label>
                  <div className="relative">
                    <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                    <input
                      id="add-link"
                      ref={linkRef}
                      type="url"
                      placeholder="https://..."
                      className="input-bd pl-9 font-mono-bd text-sm"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
              )}

              {/* Description / Note Content */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="add-desc" className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    {selectedType.value === 'note' ? 'Note Content' : 'Note (optional)'}
                  </label>
                  {selectedType.value !== 'note' && (
                    <button 
                      onClick={() => {
                        toast.info("Mock AI is summarizing your link...");
                        setTimeout(() => {
                           if (descriptionRef.current) descriptionRef.current.value = "AI Generated Summary: This link covers essential concepts and key takeaways from the content.";
                           toast.success("AI Summarization Complete!");
                        }, 1500);
                      }}
                      className="text-xs font-medium px-2 py-0.5 rounded-md hover:opacity-80 transition-colors flex items-center gap-1"
                      style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}
                    >
                      ✨ Auto-Summarize
                    </button>
                  )}
                </div>
                {selectedType.value === 'note' ? (
                  <textarea
                    id="add-desc"
                    ref={noteRef}
                    placeholder="Write your note down in markdown..."
                    className="input-bd min-h-[120px] resize-none py-3"
                    required
                  />
                ) : (
                  <input
                    id="add-desc"
                    ref={descriptionRef}
                    type="text"
                    placeholder="Quick note about this link..."
                    className="input-bd"
                  />
                )}
              </div>

              {/* Submit */}
              <motion.button
                id="add-content-submit"
                onClick={addContent}
                disabled={loading}
                className="btn-accent w-full flex items-center justify-center gap-2 py-3 mt-2"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{ opacity: loading ? 0.7 : 1 }}
                aria-busy={loading}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Plus size={16} />
                )}
                {loading ? 'Adding...' : 'Add to BrainDock'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Keep InputBox for backward compat
export const InputBox = ({ type, placeholder, ref }: { type: string; placeholder: string; ref?: any }) => (
  <input className="input-bd" type={type} placeholder={placeholder} ref={ref} />
);
