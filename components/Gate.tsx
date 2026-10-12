"use client";

import { useEffect, useState } from "react";
import CapName from "./CapName";
import { wedding } from "@/lib/config";

type Phase = "closed" | "card" | "curtain" | "open";

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
    setTimeout(() => {
      setPhase("curtain");
      document.documentElement.classList.add("revealed"); // starts the walk-through and the blooming corners
    }, 1500);
    setTimeout(() => setPhase("open"), 5600);
  };

  if (phase === "open") return null;
  const cardOpen = phase !== "closed";
  const curtainOpen = phase === "curtain";
  const ease = "ease-[cubic-bezier(.65,.05,.25,1)]";

  // A pleated pink curtain with flowers across the top waits behind the doors. The artwork is one tall piece, split down
  // the middle, and the two halves slowly slide apart horizontally to reveal the invitation.
  const CURTAIN_W = "max(100cqw, 48.48cqh)";
  const curtain = (left: boolean) => (
    <div
      className={`absolute top-0 h-full w-1/2 overflow-hidden bg-[#f1d3cb] ${left ? "left-0" : "right-0"} transition-transform duration-[4000ms] ease-in-out`}
      style={{ transform: curtainOpen ? `translateX(${left ? "-100%" : "100%"})` : "none" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/curtain.jpg"
        alt=""
        style={{ width: CURTAIN_W }}
        className={`absolute top-1/2 h-auto max-w-none -translate-y-1/2 ${left ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`}
      />
    </div>
  );

  // The artwork covers the whole screen (edges may be trimmed on narrow phones) and is split down the seam into two doors.
  const ART_W = "max(100cqw, 56.67cqh)";
  const door = (left: boolean) => (
    <div
      className={`absolute top-0 h-full w-1/2 overflow-hidden bg-[#6b4a38] ${left ? "left-0 origin-left" : "right-0 origin-right"} transition-[transform,filter] duration-[1600ms] ${ease}`}
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
        {/* the curtain waits behind the doors */}
        {curtain(true)}
        {curtain(false)}

        {/* the doors */}
        {door(true)}
        {door(false)}

        {/* overlay box that matches the artwork exactly, so positions below are percentages of the image */}
        <div className="absolute left-1/2 top-1/2 aspect-[2160/3812] -translate-x-1/2 -translate-y-1/2" style={{ width: ART_W }}>
        {/* names in gold on the doors */}
        <div className={`absolute inset-x-0 top-[28%] text-center transition-opacity duration-500 ${cardOpen ? "opacity-0" : "opacity-100"}`}>
          <p className="font-script text-[34px] leading-tight text-[#f6e9b4] drop-shadow-[0_2px_4px_rgba(0,0,0,.55)]">
            <CapName className="mr-1.5">{wedding.groom}</CapName><span className="text-[28px]">&amp;</span> <CapName className="ml-1.5">{wedding.bride}</CapName>
          </p>
        </div>

        {/* tap-to-open button */}
        <button
          type="button" onClick={start} aria-label="Open the invitation"
          className={`pointer-events-auto absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${cardOpen ? "scale-90 opacity-0" : "animate-[tagPulse_2.4s_ease-in-out_infinite]"}`}
        >
          <span className="gold-btn block whitespace-nowrap rounded-full border border-[#fff3c4]/70 px-6 py-2.5 text-center font-serif text-[13px] font-bold uppercase leading-snug shadow-[0_8px_18px_rgba(0,0,0,.45)]">
            Our big day is here!
            <span className="block text-[10px] font-semibold tracking-[.2em]">Click to see the details</span>
          </span>
        </button>
        </div>
      </div>
    </div>
  );
}
