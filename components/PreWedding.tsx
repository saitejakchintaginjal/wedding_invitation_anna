"use client";

import Reveal, { SectionTitle } from "./Reveal";
import { preEvents } from "@/lib/config";

export default function PreWedding() {
  return (
    <section className="bg-sage-100 px-6 py-16">
      <SectionTitle eyebrow="Celebrations" title="Pre-Wedding Events" />
      <div className="space-y-5">
        {preEvents.map((e, i) => (
          <Reveal key={e.name} delay={i * 0.12}>
            <div className="rounded-2xl bg-cream p-6 text-center border border-gold/40 shadow-sm">
              <h3 className="font-script text-4xl gold-text">{e.name}</h3>
              <p className="mt-2 font-serif text-lg text-sage-700">{e.date} · {e.time}</p>
              <p className="mt-1 text-sm text-sage-800/80">📍 {e.place}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
