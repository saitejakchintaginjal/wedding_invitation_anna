"use client";

import { motion } from "framer-motion";

/** Fade/slide children in as they scroll into view. */
export default function Reveal({
  children, delay = 0, y = 28, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <Reveal className="text-center mb-8">
      {eyebrow && <p className="text-[11px] tracking-[.35em] uppercase text-gold-dark">{eyebrow}</p>}
      <h2 className="font-serif text-4xl text-sage-700 mt-1">{title}</h2>
      <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-gold">
        <span className="h-px w-12 bg-gold/60" /><span>❦</span><span className="h-px w-12 bg-gold/60" />
      </div>
    </Reveal>
  );
}
