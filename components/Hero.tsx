"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/lib/config";

function Curtain({ side }: { side: "left" | "right" }) {
  const flip = side === "right";
  return (
    <motion.svg
      viewBox="0 0 120 700" preserveAspectRatio="none"
      className={`absolute top-0 h-full w-[30%] ${flip ? "right-0 -scale-x-100" : "left-0"}`}
      initial={{ x: flip ? 60 : -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id={`c-${side}`} x1="0" x2="1">
          <stop offset="0" stopColor="#47593a" /><stop offset=".25" stopColor="#72895a" />
          <stop offset=".5" stopColor="#4f6340" /><stop offset=".75" stopColor="#8aa070" />
          <stop offset="1" stopColor="#5a6f46" />
        </linearGradient>
      </defs>
      <path d="M0 0H120C100 120 118 240 96 360 C80 470 112 580 70 700H0Z" fill={`url(#c-${side})`} />
      <path d="M0 0H120C100 120 118 240 96 360 C80 470 112 580 70 700" fill="none" stroke="#c9a24b" strokeWidth="2" />
    </motion.svg>
  );
}

function Courtyard() {
  return (
    <svg viewBox="0 0 400 300" className="w-full" aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7efd2" /><stop offset="1" stopColor="#e1e8d5" /></linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dbe7e0" /><stop offset="1" stopColor="#a9c4bd" /></linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky)" />
      {/* arches */}
      {[40, 150, 260].map((x) => (
        <g key={x} fill="#eadfc6" stroke="#c9a24b" strokeWidth="1.5">
          <path d={`M${x} 190V90a50 50 0 0 1 100 0V190Z`} />
          <path d={`M${x + 12} 190V92a38 38 0 0 1 76 0V190Z`} fill="#c5d2b0" />
        </g>
      ))}
      {/* ground */}
      <rect y="190" width="400" height="110" fill="#d6c9a6" />
      <path d="M0 190H400" stroke="#c9a24b" strokeWidth="2" />
      {/* hedges */}
      <g fill="#72895a">
        <ellipse cx="40" cy="200" rx="45" ry="22" /><ellipse cx="360" cy="200" rx="45" ry="22" />
        <ellipse cx="90" cy="206" rx="30" ry="16" fill="#8aa070" /><ellipse cx="310" cy="206" rx="30" ry="16" fill="#8aa070" />
      </g>
      {/* fountain */}
      <g>
        <ellipse cx="200" cy="262" rx="110" ry="24" fill="#eadfc6" stroke="#c9a24b" strokeWidth="2" />
        <ellipse cx="200" cy="258" rx="98" ry="19" fill="url(#water)" />
        <rect x="192" y="190" width="16" height="64" fill="#eadfc6" stroke="#c9a24b" />
        <ellipse cx="200" cy="214" rx="38" ry="9" fill="#eadfc6" stroke="#c9a24b" strokeWidth="1.5" />
        <ellipse cx="200" cy="211" rx="32" ry="6" fill="url(#water)" />
        <ellipse cx="200" cy="190" rx="20" ry="5" fill="#eadfc6" stroke="#c9a24b" />
        <g stroke="#bcd3d0" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M200 188C200 160 200 150 200 146"><animate attributeName="stroke-opacity" values="1;.4;1" dur="2s" repeatCount="indefinite" /></path>
          <path d="M200 160C180 140 165 170 160 205" /><path d="M200 160C220 140 235 170 240 205" />
          <path d="M200 175C185 165 178 190 176 210" /><path d="M200 175C215 165 222 190 224 210" />
        </g>
      </g>
      {/* flowers */}
      {[[70, 270], [120, 285], [290, 285], [335, 268]].map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="7" fill="#fff" opacity=".9" /><circle cx={x} cy={y} r="2.5" fill="#c9a24b" /></g>
      ))}
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-sage-100 to-cream pt-14 pb-20 text-center">
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-sage-600 to-transparent" />
      <Curtain side="left" /><Curtain side="right" />

      <motion.div style={{ y }} className="relative z-10 px-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="text-[11px] tracking-[.4em] uppercase text-sage-700 mt-6">The wedding of</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}
          className="font-serif italic text-3xl text-sage-800 mt-3">We&apos;re getting married</motion.h1>
      </motion.div>

      <div className="relative z-10 mt-6 px-[18%]">
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, duration: 1.2 }}
          className="rounded-t-[40%] overflow-hidden border-2 border-gold/70 shadow-xl">
          <Courtyard />
        </motion.div>
      </div>

      <div className="relative z-10 mt-8 px-6">
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }}
          className="font-script text-6xl leading-tight gold-text">
          {wedding.groom}<span className="block text-4xl -my-1">&amp;</span>{wedding.bride}
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 1 }}
          className="mt-5 grid grid-cols-2 gap-4 text-sm font-serif text-sage-800">
          <div><p className="text-[10px] tracking-[.25em] uppercase text-gold-dark">Son of</p>{wedding.groomParents}</div>
          <div><p className="text-[10px] tracking-[.25em] uppercase text-gold-dark">Daughter of</p>{wedding.brideParents}</div>
        </motion.div>
      </div>
    </section>
  );
}
