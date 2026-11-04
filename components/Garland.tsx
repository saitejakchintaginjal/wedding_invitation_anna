/**
 * A hand-strung marigold garland for the top of the first screen: a swag of orange and yellow flowers with mango leaves,
 * and three tassels of flowers that sway. Every flower is drawn from layered petals so it reads as a real bloom.
 */
const W = 390;
const pt = (t: number, y0: number, sag: number) => {
  // quadratic curve from the left edge to the right edge, sagging in the middle
  const x = W * t;
  const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * (y0 + sag * 2) + t * t * y0;
  return { x, y };
};

export function Bloom({ id, outer, inner }: { id: string; outer: string; inner: string }) {
  return (
    <g id={id}>
      {Array.from({ length: 12 }, (_, i) => <ellipse key={`o${i}`} cx="0" cy="-5.2" rx="3.4" ry="5.6" fill={outer} stroke="rgba(120,50,0,.35)" strokeWidth=".35" transform={`rotate(${i * 30})`} />)}
      {Array.from({ length: 9 }, (_, i) => <ellipse key={`i${i}`} cx="0" cy="-3.1" rx="2.4" ry="3.6" fill={inner} stroke="rgba(120,50,0,.3)" strokeWidth=".3" transform={`rotate(${i * 40 + 15})`} />)}
      <circle r="1.7" fill="#7a3a00" opacity=".75" />
    </g>
  );
}

function Leaf({ x, y, a }: { x: number; y: number; a: number }) {
  return <path d="M0 0C3 -4 3 -10 0 -15 -3 -10 -3 -4 0 0Z" fill="url(#gl-leaf)" stroke="#2f5a1e" strokeWidth=".4" transform={`translate(${x} ${y}) rotate(${a})`} />;
}

export default function Garland() {
  const flowers: { x: number; y: number; s: number; k: number }[] = [];
  const leaves: { x: number; y: number; a: number }[] = [];
  const N = 30;
  for (let i = 0; i <= N; i++) {
    const t = i / N, p = pt(t, 6, 22);
    flowers.push({ x: p.x, y: p.y + (i % 2 ? 1.5 : 0), s: 1 + ((i * 7) % 5) * 0.04, k: i % 3 === 1 ? 1 : 0 });
    if (i < N) {
      const q = pt((i + 0.5) / N, 6, 22);
      leaves.push({ x: q.x, y: q.y + 3, a: 180 + (i % 2 ? 24 : -24) });
    }
  }
  const tassels = [{ t: 0.2, n: 2, d: 0 }, { t: 0.5, n: 3, d: 0.7 }, { t: 0.8, n: 2, d: 0.35 }];
  return (
    <svg viewBox={`0 0 ${W} 74`} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-auto w-full" fill="none">
      <defs>
        <radialGradient id="gl-or" cx="50%" cy="50%" r="55%"><stop offset="0" stopColor="#ffb21a" /><stop offset="1" stopColor="#e8620c" /></radialGradient>
        <radialGradient id="gl-ye" cx="50%" cy="50%" r="55%"><stop offset="0" stopColor="#ffe26a" /><stop offset="1" stopColor="#f2a30f" /></radialGradient>
        <radialGradient id="gl-or2" cx="50%" cy="50%" r="55%"><stop offset="0" stopColor="#ffc43a" /><stop offset="1" stopColor="#ef7a14" /></radialGradient>
        <radialGradient id="gl-ye2" cx="50%" cy="50%" r="55%"><stop offset="0" stopColor="#fff09a" /><stop offset="1" stopColor="#f8bf2c" /></radialGradient>
        <linearGradient id="gl-leaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5f9a35" /><stop offset="1" stopColor="#2f6a22" /></linearGradient>
        <Bloom id="gl-b-or" outer="url(#gl-or)" inner="url(#gl-or2)" />
        <Bloom id="gl-b-ye" outer="url(#gl-ye)" inner="url(#gl-ye2)" />
      </defs>
      <path d={`M0 6Q${W / 2} ${6 + 44} ${W} 6`} stroke="#8a5a1a" strokeWidth=".8" />
      {leaves.map((l, i) => <Leaf key={i} {...l} />)}
      {flowers.map((f, i) => <use key={i} href={f.k ? "#gl-b-ye" : "#gl-b-or"} transform={`translate(${f.x} ${f.y}) scale(${f.s})`} />)}
      {tassels.map((s, i) => {
        const p = pt(s.t, 6, 22);
        return (
          <g key={i} className="orn-sway-g" style={{ animationDelay: `${s.d}s` }}>
            <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + 6 + s.n * 7} stroke="#8a5a1a" strokeWidth=".8" />
            {Array.from({ length: s.n }, (_, k) => <use key={k} href={(k + i) % 2 ? "#gl-b-ye" : "#gl-b-or"} transform={`translate(${p.x} ${p.y + 12 + k * 7.5}) scale(${0.85 - k * 0.04})`} />)}
            <path d={`M${p.x} ${p.y + 12 + s.n * 7.5 - 2}c-2 2-2 5 0 7 2-2 2-5 0-7z`} fill="#c9962b" />
          </g>
        );
      })}
    </svg>
  );
}
