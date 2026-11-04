import type { ReactNode } from "react";

type Tone = "ivory" | "sand" | "blush";

/** A gold corner flourish: two fine lines turning the corner, a curl and small diamonds. Drawn for the top-left; mirrored for the rest. */
function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={`pointer-events-none absolute h-u54 w-u54 ${className}`} fill="none" stroke="#c9962b" strokeLinecap="round">
      <path d="M3 61V19C3 10 10 3 19 3H61" strokeWidth="1.6" />
      <path d="M11 61V26C11 17.5 17.5 11 26 11H61" strokeWidth=".8" opacity=".6" />
      <path d="M19 3C19 12.5 12.5 19 3 19" strokeWidth="1.2" />
      <path d="M26 11C26 17 22 22 16 24" strokeWidth=".9" opacity=".7" />
      <circle cx="3" cy="3" r="2.4" fill="#c9962b" stroke="none" />
      <path d="M31 3l3 3-3 3-3-3zM3 31l3 3-3 3-3-3z" fill="#c9962b" stroke="none" />
    </svg>
  );
}

/** A faint lotus-mandala watermark behind the content of a slide. */
function Mandala() {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-u560 w-u560 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[.12]" fill="none" stroke="#9a6f12" strokeWidth=".6">
      {Array.from({ length: 16 }, (_, i) => <ellipse key={i} cx="0" cy="-62" rx="13" ry="34" transform={`rotate(${i * 22.5})`} />)}
      {Array.from({ length: 12 }, (_, i) => <path key={`p${i}`} d="M0 -34C8 -44 8 -54 0 -60 -8 -54 -8 -44 0 -34Z" transform={`rotate(${i * 30 + 15})`} />)}
      <circle r="96" /><circle r="30" /><circle r="22" strokeDasharray="2 3" />
    </svg>
  );
}

/** One hanging pendant: a string of marigolds ending in a brass temple bell with a swinging clapper. */
function Pendant({ flowers, delay }: { flowers: number; delay: number }) {
  const fy = (k: number) => 14 + k * 12; // flower centres
  const top = fy(flowers - 1) + 10; // where the bell's string starts
  const b = top + 7; // top of the bell body
  const H = b + 46;
  return (
    <svg viewBox={`0 0 44 ${H}`} className="orn-sway" style={{ width: "calc(var(--u) * 30)", height: `calc(var(--u) * ${H} * .68)`, animationDelay: `${delay}s` }} fill="none">
      <defs>
        <linearGradient id="br-body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8a5a10" /><stop offset=".28" stopColor="#f7df86" /><stop offset=".5" stopColor="#d9a63a" /><stop offset=".78" stopColor="#b07a1a" /><stop offset="1" stopColor="#7a4e0c" />
        </linearGradient>
        <linearGradient id="br-rim" x1="0" x2="1"><stop offset="0" stopColor="#7a4e0c" /><stop offset=".4" stopColor="#e8c25a" /><stop offset="1" stopColor="#6e460a" /></linearGradient>
        <radialGradient id="br-ball" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff3b0" /><stop offset="1" stopColor="#9a6a14" /></radialGradient>
      </defs>
      <line x1="22" y1="0" x2="22" y2={top + 8} stroke="#9a6a1a" strokeWidth="1.1" />
      {Array.from({ length: flowers }, (_, k) => <use key={k} href={k % 2 ? "#gl-b-ye" : "#gl-b-or"} transform={`translate(22 ${fy(k)}) scale(${0.72})`} />)}
      <circle cx="22" cy={top + 4} r="2.6" fill="none" stroke="#c9962b" strokeWidth="1.2" />
      {/* bell */}
      <path d={`M22 ${b}c-3 0-4 2-4 4h8c0-2-1-4-4-4z`} fill="url(#br-rim)" stroke="#7a4e0c" strokeWidth=".5" />
      <path d={`M22 ${b + 3}C13 ${b + 3} 10.5 ${b + 12} 9.5 ${b + 24}L5 ${b + 31}Q22 ${b + 36} 39 ${b + 31}L34.5 ${b + 24}C33.5 ${b + 12} 31 ${b + 3} 22 ${b + 3}Z`} fill="url(#br-body)" stroke="#6e460a" strokeWidth=".7" />
      <path d={`M15 ${b + 9}C14 ${b + 15} 13.5 ${b + 21} 12.5 ${b + 26}`} stroke="#fff6c8" strokeWidth="1.4" strokeLinecap="round" opacity=".65" />
      <path d={`M10 ${b + 21}Q22 ${b + 25} 34 ${b + 21}`} stroke="#7a4e0c" strokeWidth=".8" opacity=".7" />
      <path d={`M7.5 ${b + 27}Q22 ${b + 31} 36.5 ${b + 27}`} stroke="#f2d070" strokeWidth=".8" opacity=".8" />
      <ellipse cx="22" cy={b + 32} rx="17" ry="3.2" fill="url(#br-rim)" stroke="#6e460a" strokeWidth=".6" />
      <g className="orn-clapper"><line x1="22" y1={b + 32} x2="22" y2={b + 37} stroke="#8a5a10" strokeWidth="1" /><circle cx="22" cy={b + 40} r="3.4" fill="url(#br-ball)" stroke="#6e460a" strokeWidth=".5" /></g>
    </svg>
  );
}

/** Top decoration: marigold-and-bell pendants hanging from the frame, swaying gently. */
function Bells() {
  const p = [{ f: 1, d: 0 }, { f: 2, d: 0.6 }, { f: 3, d: 1.2 }, { f: 2, d: 0.3 }, { f: 1, d: 0.9 }];
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-u12 z-0 flex -translate-x-1/2 items-start gap-u26">
      {p.map((x, i) => <Pendant key={i} flowers={x.f} delay={x.d} />)}
    </div>
  );
}

/** Bottom decoration: a slowly turning lotus rising from the frame, with twinkling sparkles either side. */
function Lotus() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-u120 overflow-hidden">
      <svg viewBox="-100 -100 200 200" className="orn-spin absolute left-1/2 top-u30 h-u210 w-u210 max-w-none -translate-x-1/2 opacity-[.34]" fill="none" stroke="#b8860b" strokeWidth=".8">
        {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="0" cy="-62" rx="12" ry="32" transform={`rotate(${i * 30})`} fill="rgba(241,217,138,.25)" />)}
        {Array.from({ length: 12 }, (_, i) => <path key={`p${i}`} d="M0 -30C7 -40 7 -50 0 -56 -7 -50 -7 -40 0 -30Z" transform={`rotate(${i * 30 + 15})`} />)}
        <circle r="22" /><circle r="14" strokeDasharray="2 3" />
      </svg>
      {[["22%", 0], ["34%", 0.8], ["66%", 0.4], ["78%", 1.2]].map(([x, d], i) => (
        <span key={i} className="orn-twinkle absolute bottom-u40 text-u12 text-gold" style={{ left: x as string, animationDelay: `${d}s` }}>&#10022;</span>
      ))}
    </div>
  );
}

/**
 * One full-screen section of the invitation. It is exactly one screen tall (taller only if a phone is turned sideways), so when the
 * page rests on a slide nothing of the slides above or below is visible. Content sits in a 390-unit-wide column that scales to fit.
 *   - frame:  the gold double line with corner flourishes (turn off for the hero, whose picture fills the slide)
 *   - mandala: the faint lotus pattern behind the content
 *   - bare:   content spans the whole slide width instead of the 390u column
 */
export default function Slide({
  tone = "ivory", mandala = false, frame = true, bare = false, id, className = "", top, children,
}: { tone?: Tone; mandala?: boolean; frame?: boolean; bare?: boolean; id?: string; className?: string; top?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} data-slide className={`slide slide-${tone} relative flex w-full items-center justify-center overflow-hidden ${className}`}>
      {mandala && <Mandala />}
      {top}
      {frame && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-u10 rounded-u10 border border-gold/45" />
          <div aria-hidden className="pointer-events-none absolute inset-u14 rounded-u7 border border-gold/20" />
          <Corner className="left-u10 top-u10" />
          <Corner className="right-u10 top-u10 -scale-x-100" />
          <Corner className="bottom-u10 left-u10 -scale-y-100" />
          <Corner className="bottom-u10 right-u10 -scale-100" />
          <Bells />
          <Lotus />
        </>
      )}
      <div className={`relative z-10 flex flex-col items-center ${bare ? "w-full" : "w-u390 max-w-full px-u20 py-u30"}`}>{children}</div>
    </section>
  );
}
