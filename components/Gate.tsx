"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/config";

type Phase = "closed" | "card" | "open";

/** The lock takes this long to click open before the doors start to swing. */
const UNLOCK_MS = 1000;

/** After the doors open, the camera pushes forward and the curtain frame sweeps past it (see .curtain-pass in
 *  globals.css: starts 2.5s after the tap, takes 3.5s). The gate is removed once that has finished. */
const GATE_DONE_AT = 6400;

export default function Gate() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    if (phase === "open") return;
    window.scrollTo(0, 0);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => { root.style.overflow = ""; };
  }, [phase]);

  const start = () => {
    if (phase !== "closed" || unlocking) return;
    setUnlocking(true); // shackle pops open, the lock drops away...
    setTimeout(() => {
      setPhase("card"); // ...then the doors swing
      document.documentElement.classList.add("revealed"); // the hero sequence plays behind the opening doors
    }, UNLOCK_MS);
    setTimeout(() => setPhase("open"), UNLOCK_MS + GATE_DONE_AT);
  };

  if (phase === "open") return null;
  const cardOpen = phase !== "closed";
  const ease = "ease-[cubic-bezier(.65,.05,.25,1)]";

  // The artwork covers the whole screen (edges may be trimmed on narrow phones) and is split down the seam into two doors.
  const ART_W = "max(100cqw, 53.69cqh)";
  const door = (left: boolean) => (
    <div
      className={`absolute top-0 h-full w-1/2 overflow-hidden bg-[#5e0f1f] ${left ? "left-0 origin-left" : "right-0 origin-right"} transition-[transform,filter] duration-[2600ms] ${ease}`}
      style={{
        // hinged on the outer edge, the door swings away from the viewer like a real door opening inward
        transform: cardOpen ? `rotateY(${left ? 105 : -105}deg)` : "none",
        filter: cardOpen ? "brightness(.55)" : "none",
        backfaceVisibility: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/gate-doors.jpg"
        alt=""
        style={{ width: ART_W }}
        className={`absolute top-1/2 h-auto max-w-none -translate-y-1/2 ${left ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`}
      />
    </div>
  );

  return (
    <div className="pointer-events-none fixed inset-y-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 overflow-hidden [container-type:size]">
      <div className="absolute inset-0 [perspective:1200px]" style={{ pointerEvents: phase === "closed" ? "auto" : "none" }}>
        {/* the curtain frame waits behind the doors; its open middle lets the scene show through. Once the doors are open
            it grows past the edges of the screen, as if the camera is moving through it */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/curtain-frame.png"
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-top ${cardOpen ? "curtain-pass" : ""}`}
        />

        {/* the doors */}
        {door(true)}
        {door(false)}

        {/* overlay box that matches the artwork exactly, so positions below are percentages of the image */}
        <div className="absolute left-1/2 top-1/2 aspect-[800/1490] -translate-x-1/2 -translate-y-1/2" style={{ width: ART_W }}>
          {/* names in gold, in the burgundy band between the Ganesha emblem and the arch */}
          <div className={`absolute inset-x-0 top-[19.2%] text-center transition-opacity duration-500 ${cardOpen ? "opacity-0" : "opacity-100"}`}>
            <p className="whitespace-nowrap font-serif text-[17px] font-semibold uppercase tracking-[.28em] text-[#f6e3a1] drop-shadow-[0_1px_3px_rgba(0,0,0,.7)]">
              {wedding.groom} <span className="mx-1 text-[#e8c872]">&amp;</span> {wedding.bride}
            </p>
          </div>

          {/* brass rod threaded through both door rings; the padlock hangs from its middle */}
          <svg viewBox="0 0 800 1490" preserveAspectRatio="none" className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${cardOpen ? "opacity-0" : "opacity-100"}`} aria-hidden>
            <defs>
              <linearGradient id="rod" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f6e3a0" /><stop offset=".45" stopColor="#b98a2e" /><stop offset="1" stopColor="#5a3b0a" />
              </linearGradient>
            </defs>
            <rect x="300" y="716" width="200" height="12" rx="6" fill="#000" opacity=".35" transform="translate(0 5)" />
            <rect x="300" y="709" width="200" height="11" rx="5.5" fill="url(#rod)" stroke="#3a2406" strokeWidth="1.2" />
            {[302, 498].map((x) => <circle key={x} cx={x} cy="714.5" r="9" fill="url(#rod)" stroke="#3a2406" strokeWidth="1.2" />)}
          </svg>

          {/* a small golden padlock holds the doors shut: tap it to unlock */}
          <button
            type="button" onClick={start} aria-label="Unlock and open the invitation"
            className={`pointer-events-auto absolute left-1/2 top-[47.9%] -translate-x-1/2 ${cardOpen ? "opacity-0 transition-opacity duration-300" : ""} ${unlocking ? "pointer-events-none" : ""}`}
          >
            <span className={`lock mx-auto block w-fit ${unlocking ? "lock-open" : "lock-idle"}`}>
              <svg viewBox="0 0 140 190" className="block w-[10.5cqw] min-w-[40px] max-w-[54px] drop-shadow-[0_5px_5px_rgba(0,0,0,.6)]" aria-hidden>
                <defs>
                  <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f3dc8e" /><stop offset=".3" stopColor="#c9993a" /><stop offset=".65" stopColor="#8e6218" /><stop offset="1" stopColor="#d6ad54" />
                  </linearGradient>
                  <linearGradient id="brassBar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#7d5514" /><stop offset=".45" stopColor="#f0d57e" /><stop offset="1" stopColor="#8a5f18" />
                  </linearGradient>
                  <radialGradient id="patina" cx=".5" cy=".5" r=".7">
                    <stop offset=".55" stopColor="#3b2506" stopOpacity="0" /><stop offset="1" stopColor="#3b2506" stopOpacity=".55" />
                  </radialGradient>
                  <radialGradient id="plate" cx=".4" cy=".35" r=".8">
                    <stop offset="0" stopColor="#f6e3a0" /><stop offset=".6" stopColor="#b98a2e" /><stop offset="1" stopColor="#6e4a10" />
                  </radialGradient>
                </defs>

                {/* thick shackle with collars */}
                <g className="lock-shackle">
                  <path d="M42 92 V58 a28 28 0 0 1 56 0 V92" fill="none" stroke="#4a3008" strokeWidth="15" strokeLinecap="round" />
                  <path d="M42 92 V58 a28 28 0 0 1 56 0 V92" fill="none" stroke="url(#brassBar)" strokeWidth="11" strokeLinecap="round" />
                  <rect x="33" y="80" width="18" height="12" rx="3" fill="url(#brass)" stroke="#4a3008" strokeWidth="1.5" />
                  <rect x="89" y="80" width="18" height="12" rx="3" fill="url(#brass)" stroke="#4a3008" strokeWidth="1.5" />
                </g>

                {/* shield-shaped body */}
                <path d="M18 98 Q18 90 27 90 H113 Q122 90 122 98 V136 Q122 176 70 186 Q18 176 18 136 Z" fill="url(#brass)" stroke="#4a3008" strokeWidth="2.5" />
                <path d="M18 98 Q18 90 27 90 H113 Q122 90 122 98 V136 Q122 176 70 186 Q18 176 18 136 Z" fill="url(#patina)" />
                {/* engraved inner border and scrollwork */}
                <path d="M27 99 H113 V136 Q113 168 70 177 Q27 168 27 136 Z" fill="none" stroke="#fbeaa8" strokeOpacity=".7" strokeWidth="1.4" />
                <path d="M32 104 H108 V135 Q108 163 70 171 Q32 163 32 135 Z" fill="none" stroke="#4a3008" strokeOpacity=".55" strokeWidth="1" strokeDasharray="1.5 3" />
                <g fill="none" stroke="#4a3008" strokeOpacity=".6" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M36 112 q10 -9 20 0 q-8 7 -14 2" /><path d="M104 112 q-10 -9 -20 0 q8 7 14 2" />
                  <path d="M38 148 q6 14 22 18" /><path d="M102 148 q-6 14 -22 18" />
                </g>
                {/* rivets */}
                {[[30, 100], [110, 100]].map(([x, y]) => (
                  <g key={x}><circle cx={x} cy={y} r="3.6" fill="url(#plate)" stroke="#4a3008" strokeWidth="1" /><circle cx={x - 1} cy={y - 1} r="1" fill="#fff" fillOpacity=".7" /></g>
                ))}
                {/* rosette at the crown */}
                <g transform="translate(70 108)">
                  {[0, 60, 120, 180, 240, 300].map((r) => (
                    <ellipse key={r} cx="0" cy="-5.5" rx="3" ry="5.5" fill="#e6c36a" stroke="#4a3008" strokeWidth=".8" transform={`rotate(${r})`} />
                  ))}
                  <circle r="3" fill="#8e6218" stroke="#4a3008" strokeWidth=".8" />
                </g>
                {/* keyhole escutcheon */}
                <circle cx="70" cy="140" r="21" fill="url(#plate)" stroke="#4a3008" strokeWidth="2" />
                <circle cx="70" cy="140" r="16.5" fill="none" stroke="#fbeaa8" strokeOpacity=".6" strokeWidth="1" />
                <circle cx="70" cy="135" r="6.2" fill="#2a1604" />
                <path d="M66.2 138 h7.6 l3 17 h-13.6 z" fill="#2a1604" />
                <circle cx="62" cy="128" r="2.4" fill="#fff" fillOpacity=".45" />
                {/* soft highlight along the shoulder */}
                <path d="M26 95 q28 -7 62 -4" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <span className={`mx-auto mt-2 block w-fit whitespace-nowrap rounded-full border border-[#e8c872]/70 bg-[#3a0a14]/80 px-3.5 py-1.5 text-center text-[12px] font-bold uppercase tracking-[.28em] text-[#fff6d6] shadow-[0_2px_8px_rgba(0,0,0,.55)] [text-shadow:0_1px_2px_rgba(0,0,0,.9)] transition-opacity duration-300 ${unlocking ? "opacity-0" : "opacity-100"}`}>
              Tap to open
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
