"use client";

import Reveal from "./Reveal";

export default function Welcome() {
  return (
    <section className="paper px-8 py-16 text-center">
      <Reveal>
        <p className="font-script text-5xl gold-text">Welcome</p>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-6 font-serif text-xl leading-relaxed text-sage-800">
          With hearts full of joy, we welcome you to the celebration of our wedding. Your love, prayers and
          support have carried us to this beautiful moment, and we are truly grateful to share it with you.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="mt-6 text-xs tracking-[.3em] uppercase text-gold-dark">Thank you for being part of our story</p>
      </Reveal>
    </section>
  );
}
