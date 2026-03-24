import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tweet } from 'react-tweet';
import { ExternalLink, Trash2, Edit2, GripVertical } from 'lucide-react';
import { TagChip } from './shared/TagChip';

interface CardProps {
  src: string;
  title: string;
  type: string;
  description?: string;
  onDelete?: () => void;
}

const TYPE_META: Record<string, { color: string; label: string; icon: string }> = {
  youtube: { color: '#FF0000', label: 'YouTube', icon: '▶' },
  twitter: { color: '#1d9bf0', label: 'Twitter', icon: '𝕏' },
  document: { color: '#4285f4', label: 'Document', icon: '📄' },
  leetcode: { color: '#FFA116', label: 'LeetCode', icon: '⚡' },
  github: { color: '#6e40c9', label: 'GitHub', icon: '⬛' },
  note: { color: '#10b981', label: 'Note', icon: '📝' },
};

const embedUrl = (url: string): string => {
  if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

const extractTweetId = (url: string): string => {
  // Strip query parameters and hash if any
  const cleanUrl = url.split('?')[0].split('#')[0];
  const parts = cleanUrl.split('/');
  return parts.find(part => /^\d+$/.test(part)) || '';
};

export const Card = ({ src, title, type, description, onDelete }: CardProps) => {
  const [hovered, setHovered] = useState(false);
  const meta = TYPE_META[type.toLowerCase()] || { color: '#5b5ef4', label: type, icon: '🔗' };

  const domain = (() => {
    try { return new URL(src).hostname.replace('www.', ''); }
    catch { return ''; }
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="card-float card-shimmer rounded-2xl overflow-hidden relative group"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
      aria-label={`${type} card: ${title}`}
    >
      {/* Drag handle */}
      <div
        className="drag-handle absolute top-3 left-3 z-10 text-[var(--text-secondary)]"
        aria-hidden="true"
      >
        <GripVertical size={14} />
      </div>

      {/* Actions on hover */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -4 }}
        transition={{ duration: 0.18 }}
        className="absolute top-3 right-3 z-10 flex gap-1.5"
      >
        {type !== 'note' && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
            style={{ background: 'var(--surface-raised)', color: 'var(--text-secondary)' }}
            aria-label="Open link"
          >
            <ExternalLink size={13} />
          </a>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150 hover:bg-red-500/10 hover:text-red-400"
            style={{ background: 'var(--surface-raised)', color: 'var(--text-secondary)' }}
            aria-label="Delete"
          >
            <Trash2 size={13} />
          </button>
        )}
      </motion.div>

      {/* Type badge */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span
          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: `${meta.color}18`, color: meta.color }}
        >
          {meta.icon}
        </span>
        <TagChip color={meta.color}>{meta.label}</TagChip>
        {domain && (
          <span className="url-text ml-auto truncate max-w-[100px]" title={src}>
            {domain}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="px-4 pb-3">
        <h3
          className="text-sm font-semibold leading-tight line-clamp-2"
          style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}
        >
          {title}
        </h3>
      </div>

      {/* Media content */}
      <div className="px-4 pb-3">
        {type === 'youtube' && (
          <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface-raised)', aspectRatio: '16/9' }}>
            <iframe
              src={embedUrl(src)}
              className="w-full h-full"
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {type === 'twitter' && (
          <div className="overflow-hidden rounded-xl max-h-[320px] overflow-y-auto">
            <Tweet id={extractTweetId(src)} />
          </div>
        )}

        {type === 'document' && src.includes('docs.google.com') && (
          <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface-raised)' }}>
            <iframe
              src={src.replace('/edit', '/preview')}
              className="w-full"
              height="200px"
              title={title}
              loading="lazy"
            />
            <div className="px-3 py-2">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium flex items-center gap-1 hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                Open in Google Docs <ExternalLink size={11} />
              </a>
            </div>
          </div>
        )}

        {type === 'document' && !src.includes('docs.google.com') && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs p-3 rounded-xl hover:underline transition-colors"
            style={{
              background: 'var(--surface-raised)',
              color: 'var(--accent)',
              border: '1px solid var(--border)',
            }}
          >
            <ExternalLink size={12} />
            Open document
          </a>
        )}

        {type === 'leetcode' && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs p-3 rounded-xl hover:underline transition-colors font-medium"
            style={{
              background: '#FFA11615',
              color: '#FFA116',
              border: '1px solid #FFA11630',
            }}
          >
            ⚡ View on LeetCode <ExternalLink size={12} />
          </a>
        )}

        {type === 'note' && (
          <div className="rounded-xl p-4 text-sm whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto" style={{ background: 'var(--surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            {description}
          </div>
        )}
      </div>

      {/* Description */}
      {description && type !== 'note' && (
        <div className="px-4 pb-4">
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>
      )}

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${meta.color}60, transparent)` }}
        aria-hidden="true"
      />
    </motion.article>
  );
};
