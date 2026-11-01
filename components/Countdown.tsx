"use client";

import { useEffect, useState } from "react";
import { events, wedding } from "@/lib/config";

function diff() {
  const ms = Math.max(0, new Date(wedding.date).getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return { Days: Math.floor(s / 86400), Hours: Math.floor(s / 3600) % 24, Minutes: Math.floor(s / 60) % 60, Seconds: s % 60 };
}

const main = events.find((e) => "featured" in e && e.featured);

/** The Muhurtham countdown, written onto the parchment sky of the sacred-fire illustration. */
export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const weekday = new Date(wedding.date).toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section>
      <div className="ornate-frame relative aspect-[765/1024] overflow-hidden rounded-3xl bg-[#c99a5b] shadow-[0_18px_40px_rgba(90,30,20,.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/muhurtham.jpg" alt="The couple at the sacred fire in a temple courtyard at sunset" className="absolute inset-0 h-full w-full object-cover" />

        {/* the text sits in the empty sky, clear of the hanging bells and garlands at both sides */}
        <div className="absolute inset-x-[12%] top-[9%] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[.4em] text-[#5a2a10]">Counting down to</p>
          <h2 className="font-serif text-[35px] font-semibold leading-tight text-maroon-deep [text-shadow:0_1px_0_rgba(255,236,200,.7),0_0_14px_rgba(255,236,200,.65)]">Muhurtham</h2>
          <div className="mx-auto mt-1 h-px w-24 bg-gradient-to-r from-transparent via-[#7a3a10] to-transparent" />
          <p className="mt-2 font-serif text-[15px] font-semibold text-[#4a1a0a] [text-shadow:0_0_10px_rgba(255,236,200,.8)]">
            {weekday}, {main?.date}
          </p>
          {main?.time && <p className="text-[11px] font-semibold uppercase tracking-[.25em] text-[#6b2a0c] [text-shadow:0_0_8px_rgba(255,236,200,.8)]">{main.time}</p>}

          <div className="mt-4 grid grid-cols-4 gap-2">
            {Object.entries(t ?? { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 }).map(([label, v]) => (
              <div key={label} className="rounded-xl border border-[#b88a2e]/60 bg-[#fff7ea]/85 py-2 text-center shadow-[0_6px_14px_rgba(70,30,10,.3)] backdrop-blur-[2px]">
                <div className="gold-text font-serif text-2xl font-semibold tabular-nums">{String(v).padStart(2, "0")}</div>
                <div className="text-[8px] font-semibold uppercase tracking-[.16em] text-maroon/85">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
