"use client";

import { useEffect, useState } from "react";
import CapName from "./CapName";
import { wedding } from "@/lib/config";

type Phase = "closed" | "card" | "curtain" | "open";

const BEADS =
  "bg-[radial-gradient(circle,#fff6c8_0_1.6px,#d4a83c_2.4px,transparent_3.6px)] [background-size:12px_11px] [background-repeat:repeat-y]";

/** Scalloped outline for the tag, built once. */
const SCALLOP = (() => {
  const pts: string[] = [];
  const n = 160;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 1 + 0.055 * Math.cos(t * 14);
    pts.push(`${i ? "L" : "M"}${(100 + Math.cos(t) * 82 * r).toFixed(1)} ${(110 + Math.sin(t) * 98 * r).toFixed(1)}`);
  }
  return pts.join("") + "Z";
})();

/** Embossed leaf sprays tiled over the card. */
function LeafPattern({ id }: { id: string }) {
  const spray = (
    <g fill="none" strokeLinecap="round">
      <path d="M20 100C30 70 50 50 80 40" strokeWidth="1.6" />
      {[[34, 78, -40], [46, 62, -55], [60, 50, -70], [28, 90, 20], [40, 76, 10], [54, 64, 0]].map(([x, y, r], i) => (
        <path key={i} d={`M${x} ${y}q8-14 22-10-4 14-22 10z`} transform={`rotate(${r} ${x} ${y})`} fill="currentColor" fillOpacity=".25" strokeWidth="1" />
      ))}
    </g>
  );
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id={id} width="150" height="190" patternUnits="userSpaceOnUse">
          <g color="#2a0610" stroke="#2a0610" opacity=".55" transform="translate(1.5 1.5)">{spray}</g>
          <g color="#e8c872" stroke="#e8c872" opacity=".45">{spray}</g>
          <g color="#2a0610" stroke="#2a0610" opacity=".5" transform="translate(88 120) scale(.8) rotate(160 50 50) translate(1.5 1.5)">{spray}</g>
          <g color="#e8c872" stroke="#e8c872" opacity=".4" transform="translate(88 120) scale(.8) rotate(160 50 50)">{spray}</g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function Blooms({ flip = false }: { flip?: boolean }) {
  const flowers = [[44, 62, 17, "#f7d9e0"], [76, 74, 13, "#f3b9c8"], [22, 80, 12, "#fff3ea"], [60, 46, 11, "#fff3ea"], [96, 84, 10, "#f7d9e0"]];
  return (
    <svg viewBox="0 0 130 120" className="absolute bottom-3 h-28 w-32" style={{ [flip ? "right" : "left"]: 6, transform: flip ? "scaleX(-1)" : undefined }} aria-hidden>
      {[[20, 96, -30], [50, 104, 10], [84, 98, 40], [34, 70, -50], [70, 60, 30]].map(([x, y, r], i) => (
        <path key={i} d={`M${x} ${y}q10-30 4-58 14 22 4 58z`} transform={`rotate(${r} ${x} ${y})`} fill="#3f6a34" opacity=".9" />
      ))}
      {flowers.map(([x, y, r, c], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r={r as number} fill={c as string} stroke="#e6a9ba" strokeWidth=".8" />
          <circle cx={x as number} cy={y as number} r={(r as number) * 0.55} fill="none" stroke="#e6a9ba" strokeWidth=".8" />
          <circle cx={x as number} cy={y as number} r={(r as number) * 0.18} fill="#e8b84a" />
        </g>
      ))}
    </svg>
  );
}

export default function Gate() {
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    if (phase === "open") return;
    window.scrollTo(0, 0);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => { root.style.overflow = ""; };
  }, [phase]);

  const start = () => {
    if (phase !== "closed") return;
    setPhase("card");
    setTimeout(() => setPhase("curtain"), 1250);
    setTimeout(() => setPhase("open"), 3500);
  };

  if (phase === "open") return null;
  const cardOpen = phase !== "closed";
  const curtainOpen = phase === "curtain";
  const ease = "ease-[cubic-bezier(.65,.05,.25,1)]";

  const curtain = (left: boolean) => (
    <div
      className={`absolute top-0 h-full w-1/2 ${left ? "left-0 origin-left" : "right-0 origin-right"} transition-transform duration-[2100ms] ${ease}`}
      style={{
        transform: curtainOpen ? `scaleX(.14)` : "scaleX(1)",
        background:
          "repeating-linear-gradient(90deg, rgba(160,110,60,.26) 0 4px, rgba(255,255,255,.28) 4px 15px, rgba(150,112,64,.12) 15px 28px), linear-gradient(180deg,#fbefd9,#f1dcbb 70%,#e6c99b)",
        boxShadow: left ? "inset -10px 0 18px rgba(120,86,40,.28)" : "inset 10px 0 18px rgba(120,86,40,.28)",
      }}
    >
      <div className={`absolute inset-y-0 w-2 ${BEADS} ${left ? "right-0 [background-position:left_top]" : "left-0 [background-position:right_top]"}`} />
      <Blooms flip={!left} />
    </div>
  );

  const cardHalf = (left: boolean) => (
    <div
      className={`absolute top-0 h-full w-1/2 overflow-hidden ${left ? "left-0 origin-left" : "right-0 origin-right"} transition-transform duration-[1300ms] ${ease}`}
      style={{
        transform: cardOpen ? `translateX(${left ? "-102%" : "102%"}) rotateY(${left ? -50 : 50}deg)` : "none",
        backfaceVisibility: "hidden",
        background: "linear-gradient(180deg,#8a1f38,#6e1428 50%,#560e1f)",
        boxShadow: left ? "inset -14px 0 22px rgba(0,0,0,.25)" : "inset 14px 0 22px rgba(0,0,0,.25)",
      }}
    >
      <div className={`absolute inset-0 ${left ? "" : "[transform:scaleX(-1)]"}`}><LeafPattern id={left ? "leafL" : "leafR"} /></div>
      {/* subtle inner border */}
      <div className={`absolute inset-y-4 ${left ? "left-4" : "right-4"} w-px bg-[#e8c872]/45`} />
      {/* gold beaded ribbon along the seam */}
      <div className={`absolute inset-y-0 w-2 ${BEADS} ${left ? "right-0 [background-position:left_top]" : "left-0 [background-position:right_top]"}`} />
      <div className={`absolute inset-y-0 w-[5px] bg-gradient-to-r from-[#c9a24b]/70 to-[#c9a24b]/70 ${left ? "right-[11px]" : "left-[11px]"} opacity-70`} />
    </div>
  );

  return (
    <div className="pointer-events-none fixed inset-y-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 overflow-hidden [perspective:1500px]">
      <div className="absolute inset-0" style={{ pointerEvents: phase === "closed" ? "auto" : "none" }}>
        {/* curtains wait behind the card */}
        {curtain(true)}
        {curtain(false)}

        {/* the card */}
        {cardHalf(true)}
        {cardHalf(false)}

        {/* names, embossed in gold at the top of the card */}
        <div className={`absolute inset-x-0 top-[10%] text-center transition-opacity duration-500 ${cardOpen ? "opacity-0" : "opacity-100"}`}>
          <p className="font-serif text-[10px] font-semibold uppercase tracking-[.4em] text-[#f1e2a8] drop-shadow-[0_1px_2px_rgba(0,0,0,.5)]">With Bappa&apos;s Blessings</p>
          <p className="font-script mt-2 text-[36px] text-[#f6e9b4] drop-shadow-[0_2px_4px_rgba(0,0,0,.45)]">
            <CapName className="mr-2">{wedding.groom}</CapName><span className="font-script text-3xl">&amp;</span> <CapName className="ml-2">{wedding.bride}</CapName>
          </p>
        </div>

        {/* tap-to-open tag */}
        <button
          type="button" onClick={start} aria-label="Open the invitation"
          className={`pointer-events-auto absolute left-1/2 top-1/2 h-[220px] w-[200px] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${cardOpen ? "scale-90 opacity-0" : "animate-[tagPulse_2.4s_ease-in-out_infinite]"}`}
        >
          <svg viewBox="0 0 200 220" className="absolute inset-0 h-full w-full drop-shadow-[0_8px_14px_rgba(0,0,0,.45)]" aria-hidden>
            <defs>
              <linearGradient id="tag" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f6dfb4" /><stop offset=".5" stopColor="#e7c48a" /><stop offset="1" stopColor="#cfa468" />
              </linearGradient>
            </defs>
            <path d={SCALLOP} fill="url(#tag)" stroke="#a9803f" strokeWidth="1.4" />
            <path d={SCALLOP} transform="translate(100 110) scale(.86) translate(-100 -110)" fill="none" stroke="#8a6428" strokeWidth="1" strokeDasharray="2 4" opacity=".7" />
            {/* flourishes */}
            <g fill="none" stroke="#8a6428" strokeWidth="1.3" strokeLinecap="round">
              <path d="M70 70q15-14 30 0 15-14 30 0" /><path d="M96 58q4-8 8 0" />
              <path d="M70 152q15 14 30 0 15 14 30 0" /><path d="M96 164q4 8 8 0" />
            </g>
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center text-[#5a1020]">
            <span className="font-serif text-[14px] font-bold uppercase leading-[1.3] tracking-[.16em]">Our big<br />day is here!<br /><span className="mt-1 block text-[10px] tracking-[.2em]">Click to see<br />the details</span></span>
          </span>
        </button>
      </div>
    </div>
  );
}
