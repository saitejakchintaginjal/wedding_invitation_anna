"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal, { SectionTitle } from "./Reveal";
import { wedding } from "@/lib/config";

const W = 300;
const H = 275;

function heartPath(ctx: CanvasRenderingContext2D | Path2D) {
  // heart drawn into a W x H box
  ctx.moveTo(W / 2, H - 12);
  ctx.bezierCurveTo(-30, H * 0.52, 30, -10, W / 2, H * 0.28);
  ctx.bezierCurveTo(W - 30, -10, W + 30, H * 0.52, W / 2, H - 12);
  ctx.closePath();
}

export default function ScratchDate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [hinted, setHinted] = useState(true);
  const baseline = useRef(1);

  const countOpaque = () => {
    const c = canvasRef.current!;
    const { data } = c.getContext("2d")!.getImageData(0, 0, c.width, c.height);
    let n = 0;
    for (let i = 3; i < data.length; i += 4 * 12) if (data[i] > 0) n++; // sampled
    return n;
  };

  // paint the textured green heart
  useEffect(() => {
    const c = canvasRef.current!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = W * dpr; c.height = H * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.beginPath(); heartPath(ctx); ctx.clip();
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#8aa070"); g.addColorStop(0.5, "#72895a"); g.addColorStop(1, "#5a6f46");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // speckle texture
    for (let i = 0; i < 1800; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)";
      ctx.fillRect(Math.random() * W, Math.random() * H, 1.5, 1.5);
    }
    // gold foil sparkles
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = "rgba(232,210,143,.5)";
      ctx.beginPath(); ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.8 + 0.4, 0, 7); ctx.fill();
    }
    ctx.strokeStyle = "rgba(232,210,143,.9)"; ctx.lineWidth = 4; ctx.beginPath(); heartPath(ctx); ctx.stroke();
    baseline.current = countOpaque() || 1;
  }, []);

  const checkProgress = useCallback(() => {
    if (countOpaque() / baseline.current < 0.45) setRevealed(true);
  }, []);

  const scratch = (e: React.PointerEvent) => {
    if (!drawing.current || revealed) return;
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const y = ((e.clientY - r.top) / r.height) * H;
    const ctx = c.getContext("2d")!;
    ctx.save();
    ctx.setTransform(Math.min(window.devicePixelRatio || 1, 2), 0, 0, Math.min(window.devicePixelRatio || 1, 2), 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    setHinted(false);
  };

  const saveDate = () => {
    const start = new Date(wedding.date);
    const end = new Date(start.getTime() + 6 * 3600 * 1000);
    const f = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${wedding.groom} & ${wedding.bride}'s Wedding`)}&dates=${f(start)}/${f(end)}&location=${encodeURIComponent(wedding.address)}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <section className="bg-sage-100 px-6 py-16 text-center">
      <SectionTitle eyebrow="Save the date" title="Our Special Day" />
      <Reveal>
        <p className="font-serif italic text-xl text-sage-700 mb-4">Scratch to Reveal</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mx-auto" style={{ width: W, height: H }}>
          {/* underlying content, clipped to the heart */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-cream"
            style={{ clipPath: "path('M150 263 C-30 143 30 -10 150 76 C270 -10 330 143 150 263Z')" }}
          >
            <p className="text-[10px] tracking-[.3em] uppercase text-gold-dark mt-8">Join us on</p>
            <p className="font-script text-4xl gold-text leading-tight px-10 mt-1">{wedding.dateLabel}</p>
          </div>

          <AnimatePresence>
            {!revealed && (
              <motion.canvas
                ref={canvasRef} width={W} height={H}
                className="absolute inset-0 cursor-pointer"
                style={{ width: W, height: H, touchAction: "none", filter: "drop-shadow(0 8px 14px rgba(58,73,48,.35))" }}
                exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.7 }}
                onPointerDown={(e) => { drawing.current = true; (e.target as Element).setPointerCapture(e.pointerId); scratch(e); }}
                onPointerMove={scratch}
                onPointerUp={() => { drawing.current = false; checkProgress(); }}
                onPointerCancel={() => { drawing.current = false; }}
              />
            )}
          </AnimatePresence>

          {hinted && !revealed && (
            <motion.span
              className="pointer-events-none absolute inset-0 flex items-center justify-center text-cream/90 font-serif italic text-lg"
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
            >
              ✦ drag to scratch ✦
            </motion.span>
          )}
        </div>
      </Reveal>

      <div className="h-24 mt-8">
        <AnimatePresence>
          {revealed && (
            <motion.button
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              whileTap={{ scale: 0.95 }} onClick={saveDate}
              className="gold-btn rounded-full px-8 py-3.5 text-xs font-medium"
            >
              SAVE THE DATE
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
