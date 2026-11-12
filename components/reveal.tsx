'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export function Reveal({ children, className = '', delay = 0, direction = 'up' }: { children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const reduced = useReducedMotion();
  const x = direction === 'left' ? -28 : direction === 'right' ? 28 : 0;
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, x, y: direction === 'up' ? 28 : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
