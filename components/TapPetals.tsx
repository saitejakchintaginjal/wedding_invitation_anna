"use client";

import { useEffect } from "react";

const PETALS = ["🌸", "🌺", "🌷", "✿", "💮"];

/** Little flowers float up wherever the guest taps or clicks. */
export default function TapPetals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const burst = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest("input, select, textarea, button, a")) return;
      for (let i = 0; i < 5; i++) {
        const p = document.createElement("span");
        p.className = "petal";
        p.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
        p.style.left = `${e.clientX - 9}px`;
        p.style.top = `${e.clientY - 9}px`;
        p.style.setProperty("--px", `${(Math.random() - 0.5) * 120}px`);
        p.style.setProperty("--py", `${-40 - Math.random() * 90}px`);
        p.style.setProperty("--pr", `${(Math.random() - 0.5) * 240}deg`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1200);
      }
    };
    window.addEventListener("pointerdown", burst);
    return () => window.removeEventListener("pointerdown", burst);
  }, []);
  return null;
}
