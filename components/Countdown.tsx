"use client";

import { useEffect, useState } from "react";
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
    <section>
      <SectionTitle eyebrow="Counting down to" title="The Shaadi" />
      <div className="grid grid-cols-4 gap-2.5">
        {Object.entries(t ?? { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 }).map(([label, v]) => (
          <div key={label} className="glass rounded-2xl py-4 text-center">
            <div className="gold-text font-serif text-3xl font-semibold tabular-nums sm:text-4xl">{String(v).padStart(2, "0")}</div>
            <div className="mt-1 text-[9px] uppercase tracking-[.2em] text-maroon/80 sm:text-[10px]">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
