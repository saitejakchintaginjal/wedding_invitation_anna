"use client";

import { useEffect, useRef } from "react";

const LIGHT = ["#b3122e", "#d4236b", "#f26a1b", "#c9962b", "#7a3cc2", "#e0457b"];
const COLORS = ["#ffd54a", "#ff7aa8", "#ff9a3c", "#fff1b8", "#c77dff", "#7df0ff", "#ff5d73"];

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number };
type Rocket = { x: number; y: number; vy: number; targetY: number; color: string };

/** Rockets streak up and burst into gold/pink sparks. Pauses when off-screen or `enabled()` is false. */
export default function Fireworks({
  enabled, rate = 1, light = false, startAfter, className = "",
}: { enabled?: () => boolean; rate?: number; light?: boolean; startAfter?: { htmlClass: string; ms: number }; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    // decorative, and phones often have "reduce motion" on: still run it, just calmer
    if (!cv || !ctx) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, raf = 0, visible = true, last = performance.now(), wait = 0, readyAt = 0;
    const sparks: Spark[] = [];
    const rockets: Rocket[] = [];
    const PAL = light ? LIGHT : COLORS;
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);

    const burst = (x: number, y: number, color: string) => {
      const n = Math.floor(rnd(55, 95));
      const ring = Math.random() < 0.4;
      const k = Math.max(0.6, Math.min(W, H) / 700);
      const second = PAL[Math.floor(Math.random() * PAL.length)];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + rnd(0, 0.1);
        const s = (ring ? 3.4 : rnd(0.8, 3.8)) * k;
        sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: rnd(55, 100), color: i % 3 === 0 ? second : color, size: rnd(1.4, 2.8) });
      }
    };

    const launch = () => {
      rockets.push({
        x: rnd(W * 0.06, W * 0.94), y: H + 10, vy: -rnd(6, 9) * Math.max(0.7, H / 800),
        targetY: rnd(H * 0.08, H * 0.5), color: PAL[Math.floor(Math.random() * PAL.length)],
      });
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(2.5, (t - last) / 16.67);
      last = t;
      // optionally hold off until <html> has the class (e.g. "revealed") for `ms`, so the show starts once the scene is ready
      let held = false;
      if (startAfter) {
        if (!document.documentElement.classList.contains(startAfter.htmlClass)) { readyAt = 0; held = true; }
        else { if (!readyAt) readyAt = t; if (t - readyAt < startAfter.ms) held = true; }
      }
      if (held || !visible || (enabled && !enabled())) {
        if (sparks.length || rockets.length) { sparks.length = 0; rockets.length = 0; }
        ctx.clearRect(0, 0, W, H);
        return;
      }
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,.2)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = light ? "source-over" : "lighter";

      wait -= dt;
      if (wait <= 0) { launch(); if (Math.random() < 0.35) launch(); wait = rnd(30, 75) / (rate * (calm ? 0.6 : 1)); }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy * dt;
        ctx.globalAlpha = 0.9; ctx.fillStyle = light ? "#b3122e" : "#fff4cf";
        ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, 6.3); ctx.fill();
        ctx.globalAlpha = 0.35; ctx.fillStyle = r.color;
        ctx.beginPath(); ctx.arc(r.x, r.y + 8, 3, 0, 6.3); ctx.fill();
        if (r.y <= r.targetY) { burst(r.x, r.y, r.color); rockets.splice(i, 1); }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life >= s.max) { sparks.splice(i, 1); continue; }
        const drag = Math.pow(0.975, dt);
        s.vx *= drag; s.vy = s.vy * drag + 0.045 * dt;
        s.x += s.vx * dt; s.y += s.vy * dt;
        const a = 1 - s.life / s.max;
        ctx.globalAlpha = a * a;
        ctx.fillStyle = s.color;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size * (0.5 + a * 0.6), 0, 6.3); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", fit); };
  }, [enabled, rate, light]);

  return <canvas ref={ref} className={`pointer-events-none h-full w-full ${className}`} aria-hidden />;
}
