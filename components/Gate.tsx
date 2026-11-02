"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/config";

type Phase = "closed" | "card" | "open";

/** After the doors open, the camera pushes forward and the toran sweeps past it (see .camera-in and .curtain-pass in
 *  globals.css). The gate is removed once that has finished, which is also the moment auto-scrolling may begin. */
const GATE_DONE_AT = 7000;

export default function Gate() {
  const [phase, setPhase] = useState<Phase>("closed");
  const started = useRef(false);

  useEffect(() => {
    if (phase === "open") return;
    window.scrollTo(0, 0);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => { root.style.overflow = ""; };
  }, [phase]);

  const start = () => {
    if (started.current) return;
    started.current = true;
    window.dispatchEvent(new Event("invitation:open")); // this tap is the touch that lets the browser play the music
    setPhase("card"); // the doors swing
    document.documentElement.classList.add("revealed"); // the hero sequence plays behind the opening doors
    setTimeout(() => {
      setPhase("open");
      document.documentElement.classList.add("gate-done");
      window.dispatchEvent(new Event("invitation:ready")); // the page is now free to scroll
    }, GATE_DONE_AT);
  };

  if (phase === "open") return null;
  const cardOpen = phase !== "closed";
  const ease = "ease-[cubic-bezier(.65,.05,.25,1)]";

  // The artwork covers the whole screen (edges may be trimmed on narrow phones). It is built in layers, back to front: the two
  // golden door halves, then the fixed burgundy wall with the Ganesha emblem and a doorway cut out of it. Only the doors move.
  // Positions are percentages of the 800 x 1490 picture.
  const ART_W = "max(100cqw, 53.69cqh)";
  const leaf = (left: boolean) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={left ? "/door/leaf-left.webp" : "/door/leaf-right.webp"}
      alt=""
      draggable={false}
      className={`absolute z-[3] ${left ? "origin-left" : "origin-right"} transition-[transform,filter] duration-[4500ms] ${ease}`}
      style={{
        left: left ? "4.375%" : "49.75%", top: left ? "22.752%" : "22.819%", width: left ? "45.875%" : "45.75%", height: left ? "76.443%" : "76.309%",
        // hinged on the outer edge: the door swings away from the viewer like a door opening inward
        transform: cardOpen ? `rotateY(${left ? 105 : -105}deg)` : "none",
        filter: cardOpen ? "brightness(.6)" : "none",
        backfaceVisibility: "hidden",
      }}
    />
  );

  return (
    <div className="pointer-events-none fixed inset-y-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 overflow-hidden [container-type:size]">
      <div className="absolute inset-0 [perspective:1200px]" style={{ pointerEvents: phase === "closed" ? "auto" : "none" }}>
        {/* warm light behind the toran, seen through the doorway as the doors open */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(255,241,201,.9)_0%,rgba(255,217,143,.7)_42%,rgba(227,160,75,.55)_100%)] ${cardOpen ? "curtain-pass" : ""}`} style={{ transformOrigin: "50% 50%" }} />

        {/* the toran waits behind the doors and is revealed as they open, drifting closer as the camera moves in; its open middle lets the scene show through. Then
            it grows past the edges of the screen, as if the camera is flying through the archway */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className={`absolute inset-0 ${cardOpen ? "toran-approach" : ""}`}>
          <img
            src="/toran.webp"
            alt=""
            draggable={false}
            className={`absolute inset-0 h-full w-full object-cover ${cardOpen ? "curtain-pass" : ""}`}
            style={{ objectPosition: "50% 50%", transformOrigin: "50% 50%" }} /* full height; the middle of the archway is where the camera flies through */
          />
        </div>

        {/* artwork box: its size matches the picture exactly, so every position below is a percentage of the picture */}
        <div className="absolute left-1/2 top-1/2 aspect-[800/1490] -translate-x-1/2 -translate-y-1/2" style={{ width: ART_W }}>
          <div className={`absolute inset-0 [perspective:1200px] ${cardOpen ? "camera-in" : ""}`}>
          {leaf(true)}
          {leaf(false)}
          {/* the fixed wall: stays while the doors swing, then the camera moves in and it zooms off the edges of the screen */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/door/frame.webp" alt="" draggable={false}
            className="absolute inset-0 z-[4] h-full w-full"
          />

          {/* text and lock sit above everything */}
          <div className="absolute inset-0 z-[5]">
          {/* names in gold, in the burgundy band between the Ganesha emblem and the arch */}
          <div className={`absolute inset-x-0 top-[19.2%] text-center transition-opacity duration-500 ${cardOpen ? "opacity-0" : "opacity-100"}`}>
            <p className="whitespace-nowrap font-serif text-[17px] font-semibold uppercase tracking-[.28em] text-[#f6e3a1] drop-shadow-[0_1px_3px_rgba(0,0,0,.7)]">
              {wedding.groom} <span className="mx-1 text-[#e8c872]">&amp;</span> {wedding.bride}
            </p>
          </div>

          {/* the whole door is the button: a tap anywhere opens it. The plaque below the handles tells guests so. */}
          <button
            type="button" onClick={start} aria-label="Tap to open the invitation"
            className={`absolute inset-0 ${cardOpen ? "pointer-events-none" : "pointer-events-auto"}`}
          >
            <span
              className="pointer-events-none absolute left-1/2 top-[57.5%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-opacity duration-500"
              style={{ opacity: cardOpen ? 0 : 1 }}
            >
              {/* a finger that keeps tapping */}
              <svg viewBox="0 0 24 24" aria-hidden className="tap-bob mb-1.5 h-14 w-14 drop-shadow-[0_2px_3px_rgba(0,0,0,.7)]" fill="#fff1c4" stroke="#5a1020" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 3.2a1.7 1.7 0 0 1 3.4 0v6.3h.4a1.8 1.8 0 0 1 2.3 1 1.8 1.8 0 0 1 2.4.9 1.8 1.8 0 0 1 2.2 1.7v3.2c0 3.6-2.5 6.4-6 6.4h-1.6c-2.2 0-3.7-.8-4.9-2.1l-3.3-3.5a1.7 1.7 0 0 1 2.4-2.4l1.8 1.5z" />
              </svg>
              <span className="relative">
                <span className="tap-ring absolute inset-0 rounded-full border-2 border-[#f1d98a]" />
                <span className="tap-ring absolute inset-0 rounded-full border-2 border-[#f1d98a]" style={{ animationDelay: "1.1s" }} />
                <span className="tap-glow relative flex items-center gap-3 rounded-full border-2 border-[#f1d98a] bg-[linear-gradient(180deg,#7d1a30,#4a0c1c_55%,#2f0711)] px-6 py-3 shadow-[inset_0_0_0_3px_rgba(58,10,20,.9),inset_0_0_0_4px_rgba(241,217,138,.55)]">
                  <span aria-hidden className="text-[11px] text-[#f1d98a]">&#10022;</span>
                  <span className="whitespace-nowrap font-serif text-[16px] font-bold uppercase tracking-[.3em] text-[#fff3cf] [text-shadow:0_1px_2px_rgba(0,0,0,.8),0_0_10px_rgba(241,217,138,.55)]">Tap to open</span>
                  <span aria-hidden className="text-[11px] text-[#f1d98a]">&#10022;</span>
                </span>
              </span>
            </span>
          </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
