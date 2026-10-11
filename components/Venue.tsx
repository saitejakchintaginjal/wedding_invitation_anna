"use client";

import Reveal, { SectionTitle } from "./Reveal";
import { wedding } from "@/lib/config";

export default function Venue() {
  const q = encodeURIComponent(wedding.mapsQuery);
  return (
    <section className="bg-sage-100 px-6 py-16 text-center">
      <SectionTitle eyebrow="Where" title="The Venue" />
      <Reveal>
        <h3 className="font-serif text-3xl text-sage-700">{wedding.venue}</h3>
        <p className="mt-2 text-sm text-sage-800/80 px-6">{wedding.address}</p>
      </Reveal>
      <Reveal delay={0.15} className="mt-6">
        <div className="overflow-hidden rounded-2xl border-2 border-gold/60 shadow-lg">
          <iframe
            title={`Map of ${wedding.venue}`}
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            className="h-64 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer"
          className="gold-btn mt-6 inline-block rounded-full px-8 py-3.5 text-xs font-medium">
          OPEN IN GOOGLE MAPS
        </a>
      </Reveal>
    </section>
  );
}
