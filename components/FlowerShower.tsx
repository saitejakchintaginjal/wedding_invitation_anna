"use client";

import { useEffect, useRef } from "react";
import { buildSprites, type Sprite } from "./flowerSprites";

type Bloom = {
  img: HTMLCanvasElement; x: number; y: number; vy: number; vx: number; sway: number; swayRate: number; ph: number;
  rot: number; vr: number; s: number; flip: number; flipRate: number;
};

const EVERY_MS = 1300;          // a new flower roughly this often, so only a few are on screen at once

/** How each kind moves: heavy flower heads drop steadily; loose petals and leaves flutter and tumble more. Speeds are in pixels
 *  per frame at 60fps, so 0.5 is about 30 px a second (slow). */
const MOTION = {
  head:  { size: [15, 22], vy: [0.5, 0.9],  sway: [8, 18],  swayRate: [0.006, 0.012], vr: 0.008, flip: [0.004, 0.01] },
  petal: { size: [24, 34], vy: [0.3, 0.6],  sway: [18, 38], swayRate: [0.01, 0.02],   vr: 0.02,  flip: [0.012, 0.028] },
  leaf:  { size: [21, 28], vy: [0.35, 0.65], sway: [14, 28], swayRate: [0.01, 0.02],  vr: 0.015, flip: [0.01, 0.02] },
} as const;

/** A slow, gentle shower of realistic flowers across the whole page. Starts once the entrance doors have cleared (the Gate
 *  fires "invitation:ready"), never blocks a touch, and rests while the page is hidden. */
export default function FlowerShower() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current, ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const families = buildSprites();
    const total = families.reduce((n, f) => n + f.weight, 0);
    const pick = (): Sprite => {
      let w = Math.random() * total;
      for (const f of families) { if ((w -= f.weight) <= 0) return f.sprites[Math.floor(Math.random() * f.sprites.length)]; }
      return families[0].sprites[0];
    };

    let W = 0, H = 0, raf = 0, last = performance.now(), nextAt = 0, started = false, fadeIn = 0;
    const blooms: Bloom[] = [];
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const fit = () => { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    fit();
    window.addEventListener("resize", fit);

    const spawn = (anywhere = false) => {
      const sp = pick(), m = MOTION[sp.kind];
      blooms.push({
        img: sp.canvas, x: rnd(-0.02, 1.02) * W, y: anywhere ? rnd(-20, H * 0.5) : rnd(-50, -20),
        vy: rnd(m.vy[0], m.vy[1]), vx: rnd(-0.12, 0.12), sway: rnd(m.sway[0], m.sway[1]), swayRate: rnd(m.swayRate[0], m.swayRate[1]), ph: rnd(0, 6.283),
        rot: rnd(0, 6.283), vr: rnd(-m.vr, m.vr), s: rnd(m.size[0], m.size[1]), flip: rnd(0, 6.283), flipRate: rnd(m.flip[0], m.flip[1]),
      });
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(3, (t - last) / 16.67); last = t;
      if (document.hidden) return;
      if (started) {
        fadeIn = Math.min(1, fadeIn + dt / 180);                // eases in over about 3 seconds
        if (t >= nextAt) { spawn(); nextAt = t + rnd(EVERY_MS * 0.6, EVERY_MS * 1.4); }
      }
      ctx.clearRect(0, 0, W, H);
      for (let i = blooms.length - 1; i >= 0; i--) {
        const b = blooms[i];
        b.ph += b.swayRate * dt; b.y += b.vy * dt; b.x += (b.vx + Math.cos(b.ph) * b.sway * b.swayRate) * dt; b.rot += b.vr * dt; b.flip += b.flipRate * dt;
        if (b.y > H + 50) { blooms.splice(i, 1); continue; }
        const turn = Math.abs(Math.cos(b.flip));                // turning over as it falls: narrow when edge-on, and a little darker
        ctx.save();
        ctx.globalAlpha = 0.95 * fadeIn * (0.82 + 0.18 * turn);
        ctx.translate(b.x, b.y); ctx.rotate(b.rot); ctx.scale(Math.max(0.28, turn), 1);
        ctx.shadowColor = "rgba(90,30,20,.3)"; ctx.shadowBlur = 3; ctx.shadowOffsetY = 1;
        ctx.drawImage(b.img, -b.s / 2, -b.s / 2, b.s, b.s);
        ctx.restore();
      }
    };
    raf = requestAnimationFrame(frame);

    const begin = () => {
      if (started) return;
      started = true; nextAt = performance.now();
      for (let i = 0; i < 6; i++) spawn(true);                  // a few already drifting, so it does not start empty
    };
    if (document.documentElement.classList.contains("gate-done")) begin();
    window.addEventListener("invitation:ready", begin);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", fit); window.removeEventListener("invitation:ready", begin); };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[40] h-full w-full" />;
}
