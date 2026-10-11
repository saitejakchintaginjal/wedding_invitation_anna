"use client";

import { useEffect, useState } from "react";

const WORDS = ["weds", "vs", "weds", "♥"];

/** Cycles weds → vs → weds → ♥ once a second with a card-flip. */
export default function FlipWord({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`inline-block min-w-[2.6em] text-center [perspective:300px] ${className}`}>
      <span key={i} className="flip-in inline-block">{WORDS[i]}</span>
    </span>
  );
}
