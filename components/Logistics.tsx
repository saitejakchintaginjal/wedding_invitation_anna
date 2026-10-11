"use client";

import Reveal, { SectionTitle } from "./Reveal";

export default function Logistics() {
  return (
    <section className="paper px-6 py-16">
      <SectionTitle eyebrow="For our guests" title="Getting There & Staying" />
      <div className="space-y-5">
        <Reveal>
          <div className="rounded-2xl border border-gold/50 bg-cream/80 p-6">
            <p className="text-2xl">🚐</p>
            <h3 className="font-serif text-2xl text-sage-700 mt-1">Transportation</h3>
            <p className="mt-2 text-sm leading-relaxed text-sage-800/90">
              Complimentary shuttles run every 30 minutes from the Garden Inn lobby to {`Grand Palace Hall`} from
              3:00 PM, with return trips after the reception until midnight.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-gold/50 bg-cream/80 p-6">
            <p className="text-2xl">🏨</p>
            <h3 className="font-serif text-2xl text-sage-700 mt-1">Accommodation</h3>
            <p className="mt-2 text-sm leading-relaxed text-sage-800/90">
              A room block is held at The Garden Inn until November 1. Mention the booking code below for our
              special rate.
            </p>
            <p className="mt-4 inline-block rounded-full border border-dashed border-gold px-5 py-2 font-serif text-lg tracking-widest text-gold-dark">
              ZAYNNORA26
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
