"use client";

import { motion } from "framer-motion";
import Reveal, { SectionTitle } from "./Reveal";
import { timeline } from "@/lib/config";

const icons: Record<string, JSX.Element> = {
  arrival: <path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z" />,
  rings: <g><circle cx="9" cy="14" r="5" /><circle cx="15" cy="14" r="5" /><path d="M9 5l1.5 2L12 5" /></g>,
  glass: <g><path d="M7 3h10l-1 7a4 4 0 0 1-8 0z" /><path d="M12 14v7M8 21h8" /></g>,
};

export default function Timeline() {
  return (
    <section className="paper px-8 py-16">
      <SectionTitle eyebrow="Program" title="The Day's Schedule" />
      <div className="relative ml-6">
        <motion.div
          className="absolute left-0 top-2 w-px bg-gold/70 origin-top" style={{ height: "calc(100% - 1rem)" }}
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }}
        />
        {timeline.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.1} className="relative pl-10 pb-10 last:pb-0">
            <span className="absolute -left-[22px] top-0 flex h-11 w-11 items-center justify-center rounded-full bg-sage-500 ring-4 ring-cream">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-cream" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {icons[e.icon]}
              </svg>
            </span>
            <p className="text-xs tracking-[.25em] uppercase text-gold-dark">{e.time}</p>
            <h3 className="font-serif text-2xl text-sage-700 mt-0.5">{e.title}</h3>
            <p className="text-sm text-sage-800/80 mt-1">{e.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
