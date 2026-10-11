"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "./Reveal";
import { wedding } from "@/lib/config";

function diff() {
  const ms = Math.max(0, new Date(wedding.date).getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return { Days: Math.floor(s / 86400), Hours: Math.floor(s / 3600) % 24, Minutes: Math.floor(s / 60) % 60, Seconds: s % 60 };
}

export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-sage-500 leaf-pattern px-6 py-16 text-cream">
      <div className="[&_h2]:!text-cream [&_p]:!text-gold-light">
        <SectionTitle eyebrow="Counting down to" title="Forever" />
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {Object.entries(t ?? { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 }).map(([label, v], i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
            className="rounded-xl border border-gold/60 bg-sage-700/40 py-4 text-center backdrop-blur-sm">
            <motion.div key={v} initial={{ y: -8, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} className="font-serif text-3xl tabular-nums">
              {String(v).padStart(2, "0")}
            </motion.div>
            <div className="mt-1 text-[9px] tracking-[.2em] uppercase text-gold-light">{label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
