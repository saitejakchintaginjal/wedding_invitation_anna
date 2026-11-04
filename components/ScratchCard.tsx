"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Slide from "./Slide";
import { wedding } from "@/lib/config";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const [y, m, d] = wedding.date.slice(0, 10).split("-").map(Number);
const weekday = DAYS[new Date(y, m - 1, d).getDay()];

/** twinkles that appear around the heart once the date is revealed (x/y/size are measured on a 200px-wide heart and scaled to its real size) */
const SPARKLES = [{ x: -14, y: 20, s: 16 }, { x: 196, y: 10, s: 20 }, { x: 214, y: 92, s: 12 }, { x: -22, y: 104, s: 12 }, { x: 28, y: -14, s: 12 }, { x: 150, y: 176, s: 14 }];
const REVEAL_AT = 0.5; // fraction scratched before the rest melts away

function paintFoil(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const { width: w, height: h } = canvas.getBoundingClientRect();
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = "source-over";

  // plain gold foil
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#e6c056");
  g.addColorStop(1, "#cc9d2f");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // call to action
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(255,247,200,.9)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 1;
  const script = getComputedStyle(canvas).getPropertyValue("--font-display").trim() || "cursive";
  ctx.fillStyle = "#6b1220";
  ctx.font = `${Math.round(w * 0.115)}px ${script}, cursive`;
  ctx.fillText("Scratch to reveal", w / 2, h * 0.38);
  ctx.font = `${Math.round(w * 0.14)}px ${script}, cursive`;
  ctx.fillText("the Date", w / 2, h * 0.53);
  ctx.shadowColor = "transparent";
}

export default function ScratchCard() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const c = canvas.current;
    if (!c || done) return;
    paintFoil(c);
    // the script font may still be loading on first paint
    document.fonts?.ready.then(() => paintFoil(c));
    let width = c.getBoundingClientRect().width;
    // repaint only when the width really changes, so mobile address-bar resizes don't wipe a half-scratched card
    const onResize = () => {
      const w = c.getBoundingClientRect().width;
      if (w !== width) {
        width = w;
        paintFoil(c);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [done]);

  const scratchedFraction = useCallback(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return 0;
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 40) {
      total++;
      if (data[i] === 0) clear++;
    }
    return clear / total;
  }, []);

  const point = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const scratch = (e: React.PointerEvent) => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || !drawing.current) return;
    const p = point(e);
    const from = last.current ?? p;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = Math.max(18, canvas.current!.getBoundingClientRect().width * 0.13); // the finger-sized brush grows with the heart
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (++moves.current % 8 === 0 && scratchedFraction() > REVEAL_AT) setDone(true);
  };

  const down = (e: React.PointerEvent) => {
    canvas.current?.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = null;
    scratch(e);
  };
  const up = () => {
    drawing.current = false;
    last.current = null;
  };

  return (
    <Slide id="save-the-date" tone="ivory">
      <div className="mb-u28 text-center">
        <h2 className="font-serif text-u38 font-semibold leading-tight text-maroon-deep">Save the Date</h2>
        <div className="mx-auto mt-u10 flex items-center justify-center gap-u8 text-gold">
          <span className="h-px w-u44 bg-gradient-to-r from-transparent to-gold" /><span aria-hidden className="text-u9">&#10022;</span><span className="h-px w-u44 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </div>

      {/* the heart outline is one shared clip path, so each layer below stays heart-shaped as it is inset */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <clipPath id="scratch-heart" clipPathUnits="objectBoundingBox">
          <path d="M0.5 1 C0.12 0.7 0 0.5 0 0.3 C0 0.12 0.12 0 0.27 0 C0.38 0 0.46 0.06 0.5 0.16 C0.54 0.06 0.62 0 0.73 0 C0.88 0 1 0.12 1 0.3 C1 0.5 0.88 0.7 0.5 1Z" />
        </clipPath>
      </svg>

      {/* every size inside the heart is in cqw (a share of the heart's own width), so it looks the same at any screen size */}
      <div
        className="relative w-u280 origin-top transition-[transform,margin] duration-[1100ms] ease-[cubic-bezier(.34,1.45,.5,1)] [container-type:inline-size] [filter:drop-shadow(0_14px_16px_rgba(90,30,20,.35))]"
        style={{ transform: done ? "scale(1.3)" : "none", marginBottom: done ? "calc(var(--u) * 78)" : 0 }}
      >
        {done && SPARKLES.map((p, i) => (
          <span key={i} aria-hidden className="sparkle pointer-events-none absolute text-gold" style={{ left: `${p.x / 2}%`, top: `${p.y / 2}cqw`, fontSize: `${p.s / 2}cqw`, animationDelay: `${0.5 + i * 0.22}s` }}>&#10022;</span>
        ))}
        <div className="relative aspect-[1/.92] [clip-path:url(#scratch-heart)]">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-light via-gold to-gold-dark" />
          <div className="absolute inset-[2.5%] bg-ivory [clip-path:url(#scratch-heart)]" />
          <div ref={wrap} className="absolute inset-[5%] bg-gradient-to-br from-cream to-[#fbe3b8] [clip-path:url(#scratch-heart)]">
            {/* the prize underneath */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-[10cqw] pt-[4cqw] text-center">
              <p className={`text-[4cqw] uppercase tracking-[.35em] text-gold-dark ${done ? "reveal-pop" : ""}`} style={{ animationDelay: "0.55s" }}>{weekday}</p>
              <p className={`gold-text font-serif font-semibold leading-none transition-[font-size] ${done ? "reveal-pop text-[33cqw]" : "text-[22cqw]"}`} style={{ animationDelay: "0.7s" }}>{d}</p>
              <p className={`font-serif text-[7cqw] font-semibold uppercase tracking-[.2em] text-maroon-deep ${done ? "reveal-pop" : ""}`} style={{ animationDelay: "1s" }}>{MONTHS[m - 1]}</p>
              <p className={`font-serif text-[6cqw] tracking-[.3em] text-maroon ${done ? "reveal-pop" : ""}`} style={{ animationDelay: "1.2s" }}>{y}</p>
            </div>

            {/* the foil */}
            <canvas
              ref={canvas}
              aria-label="Scratch card covering the wedding date"
              onPointerDown={down}
              onPointerMove={scratch}
              onPointerUp={up}
              onPointerCancel={up}
              className={`absolute inset-0 h-full w-full cursor-pointer transition-opacity duration-700 [touch-action:none] ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}
            />
          </div>
        </div>
      </div>
      <p className="mt-u20 text-center text-u13 uppercase tracking-[.3em] text-maroon/70">{done ? "See you there ♥" : "Use your finger to scratch"}</p>
    </Slide>
  );
}
