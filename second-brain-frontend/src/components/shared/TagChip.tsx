import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TagChipProps {
  children: ReactNode;
  icon?: ReactNode;
  color?: string;
  className?: string;
}

export function TagChip({ children, icon, color, className = '' }: TagChipProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`tag-chip ${className}`}
      style={color ? { color, borderColor: `${color}30`, background: `${color}12` } : {}}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
}
