"use client";

import { useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { SectionTitle } from "./Reveal";
import { photos } from "@/lib/config";

const variants = {
  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function Carousel() {
  const [[index, dir], setPage] = useState([0, 0]);
  const go = (d: number) => setPage(([i]) => [(i + d + photos.length) % photos.length, d]);

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    if (offset.x < -60 || velocity.x < -500) go(1);
    else if (offset.x > 60 || velocity.x > 500) go(-1);
  };

  return (
    <section className="paper px-6 py-16">
      <SectionTitle eyebrow="Our story" title="Engagement Moments" />
      <div className="relative mx-auto aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-2xl border-2 border-gold/60 shadow-xl bg-sage-100">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={index} src={photos[index]} alt={`Engagement photo ${index + 1}`} draggable={false}
            custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ x: { type: "spring", stiffness: 260, damping: 30 }, opacity: { duration: 0.3 } }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6} onDragEnd={onDragEnd}
            className="absolute inset-0 h-full w-full object-cover cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>
      </div>
      <div className="mt-5 flex justify-center gap-2.5">
        {photos.map((_, i) => (
          <button key={i} aria-label={`Go to photo ${i + 1}`} onClick={() => setPage([i, i > index ? 1 : -1])}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-gold" : "w-2.5 bg-sage-300"}`} />
        ))}
      </div>
    </section>
  );
}
