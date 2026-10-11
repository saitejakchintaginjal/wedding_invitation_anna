"use client";

import Reveal, { SectionTitle } from "./Reveal";

const codes = [
  { who: "Women", text: "Elegant formal attire in pastel hues — sage, blush, champagne or ivory. Please avoid white." },
  { who: "Men", text: "Formal suits or traditional wear in muted earth tones — beige, olive, navy or soft grey." },
];

export default function DressCode() {
  return (
    <section className="paper px-6 py-16">
      <SectionTitle eyebrow="Attire" title="Dress Code" />
      <div className="grid grid-cols-2 gap-4">
        {codes.map((c, i) => (
          <Reveal key={c.who} delay={i * 0.15}>
            <div className="h-full rounded-2xl border border-gold/50 bg-cream/80 p-5 text-center shadow-sm">
              <p className="font-script text-3xl gold-text">{c.who}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-sage-800/90">{c.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
