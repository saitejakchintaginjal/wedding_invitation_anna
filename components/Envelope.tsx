"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [splitting, setSplitting] = useState(false);

  const open = () => {
    if (splitting) return;
    setSplitting(true);
    setTimeout(onOpen, 900);
  };

  const half = "absolute top-0 h-full w-1/2 bg-sage-400 leaf-pattern";

  return (
    <motion.div
      className="absolute inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ height: "100svh" }}
    >
      {/* two halves that slide apart */}
      <motion.div className={`${half} left-0 border-r border-gold/40`} animate={{ x: splitting ? "-100%" : 0 }} transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }} />
      <motion.div className={`${half} right-0 border-l border-gold/40`} animate={{ x: splitting ? "100%" : 0 }} transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }} />

      <motion.div animate={{ opacity: splitting ? 0 : 1 }} transition={{ duration: 0.4 }}>
        {/* gold string */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[3px] bg-gradient-to-b from-gold-light via-gold to-gold-dark"
          initial={{ height: 0 }} animate={{ height: "50%" }} transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <p className="absolute top-[14%] w-full text-center font-serif italic text-cream/90 text-lg tracking-wide">
          You are invited
        </p>

        {/* seal */}
        <motion.button
          onClick={open}
          aria-label="Tap to open the invitation"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full gold-btn flex items-center justify-center"
          style={{ boxShadow: "0 0 0 6px rgba(232,210,143,.35), 0 12px 30px rgba(0,0,0,.3)" }}
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ scale: { repeat: Infinity, duration: 2.4 }, }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="absolute inset-2 rounded-full border border-cream/60" />
          <span className="absolute inset-4 rounded-full border border-dashed border-cream/40" />
          <span className="text-center leading-tight">
            <span className="block font-script text-3xl">Z &amp; N</span>
            <span className="block text-[10px] tracking-[.25em] mt-1">TAP TO OPEN</span>
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
