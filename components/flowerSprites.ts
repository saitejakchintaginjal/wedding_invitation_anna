/* Realistic flower sprites, painted once into small canvases and then reused by the falling-flower shower.
   Every petal is a shaped path filled with a gradient (darker at the base, lighter at the rim), then given a soft highlight,
   fine veins and a thin edge line; flowers are built from several overlapping layers, and each variant is slightly different. */

export type Sprite = { canvas: HTMLCanvasElement; kind: "head" | "petal" | "leaf" };

const S = 128;                                           // sprite size in pixels (drawn small on screen, so this stays sharp)

type Rng = () => number;
const seeded = (a: number): Rng => () => {
  a |= 0; a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type HSL = [number, number, number];
const hsl = ([h, s, l]: HSL, a = 1) => `hsla(${h.toFixed(0)},${s.toFixed(0)}%,${l.toFixed(0)}%,${a})`;

/** A petal pointing up from the origin: `tip` 0 = rounded, 1 = pointed; `notch` dents the tip like a ruffled petal. */
function petalPath(ctx: CanvasRenderingContext2D, len: number, wid: number, tip = 0.4, notch = 0) {
  const tx = wid * 0.3 * (1 - tip);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(wid * 0.62, -len * 0.1, wid * 0.7, -len * 0.74, tx, -len);
  ctx.quadraticCurveTo(0, -len * (1 - notch), -tx, -len);
  ctx.bezierCurveTo(-wid * 0.7, -len * 0.74, -wid * 0.62, -len * 0.1, 0, 0);
  ctx.closePath();
}

type PetalStyle = { base: HSL; rim: HSL; tip?: number; notch?: number; veins?: number; edge?: number; shine?: number };

function paintPetal(ctx: CanvasRenderingContext2D, len: number, wid: number, st: PetalStyle) {
  const { base, rim, tip = 0.4, notch = 0, veins = 0.12, edge = 0.22, shine = 0.3 } = st;
  petalPath(ctx, len, wid, tip, notch);
  const g = ctx.createLinearGradient(0, 0, 0, -len);
  g.addColorStop(0, hsl(base)); g.addColorStop(1, hsl(rim));
  ctx.fillStyle = g; ctx.fill();
  ctx.save();
  ctx.clip();
  // darker where the petal meets the flower, lighter and glossier toward the middle of its face
  const dark = ctx.createLinearGradient(0, 0, 0, -len * 0.45);
  dark.addColorStop(0, "rgba(20,0,0,.38)"); dark.addColorStop(1, "rgba(20,0,0,0)");
  ctx.fillStyle = dark; ctx.fillRect(-wid, -len * 1.1, wid * 2, len * 1.2);
  const lit = ctx.createRadialGradient(-wid * 0.12, -len * 0.62, 0, -wid * 0.12, -len * 0.62, len * 0.55);
  lit.addColorStop(0, `rgba(255,255,255,${shine})`); lit.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = lit; ctx.fillRect(-wid, -len * 1.1, wid * 2, len * 1.2);
  // fine veins fanning out from the base
  if (veins > 0) {
    ctx.strokeStyle = `rgba(0,0,0,${veins})`; ctx.lineWidth = Math.max(0.6, len * 0.012);
    for (const k of [-1, -0.5, 0, 0.5, 1]) {
      ctx.beginPath(); ctx.moveTo(0, -len * 0.04);
      ctx.quadraticCurveTo(k * wid * 0.3, -len * 0.5, k * wid * 0.22, -len * 0.93); ctx.stroke();
    }
  }
  ctx.restore();
  petalPath(ctx, len, wid, tip, notch);
  ctx.strokeStyle = `rgba(0,0,0,${edge})`; ctx.lineWidth = Math.max(0.7, len * 0.014); ctx.stroke();
}

const blank = () => {
  const canvas = document.createElement("canvas");
  canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
};

/** Marigold (genda): a dense pom-pom of many ruffled petals, in rings that get smaller and brighter toward the middle. */
function marigold(seed: number): Sprite {
  const r = seeded(seed), { canvas, ctx } = blank();
  const hue = 20 + r() * 14;                               // from deep orange to golden orange
  ctx.translate(S / 2, S / 2);
  const rings = [
    { n: 20, at: 0.2, len: 0.27, wid: 0.17 }, { n: 17, at: 0.15, len: 0.23, wid: 0.15 }, { n: 14, at: 0.11, len: 0.19, wid: 0.14 },
    { n: 11, at: 0.07, len: 0.15, wid: 0.125 }, { n: 8, at: 0.035, len: 0.11, wid: 0.105 }, { n: 5, at: 0.01, len: 0.08, wid: 0.09 },
  ];
  // soft shadow the flower casts on itself
  const sh = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 0.5);
  sh.addColorStop(0.7, "rgba(90,40,0,.0)"); sh.addColorStop(1, "rgba(90,40,0,.0)");
  rings.forEach((ring, k) => {
    const t = k / (rings.length - 1);
    for (let i = 0; i < ring.n; i++) {
      const a = (i / ring.n) * Math.PI * 2 + r() * 0.35 + k * 0.5;
      ctx.save();
      ctx.rotate(a); ctx.translate(0, -ring.at * S);
      const jitter = 0.9 + r() * 0.2;
      paintPetal(ctx, ring.len * S * jitter, ring.wid * S * jitter, {
        base: [hue - 6 + r() * 5, 95, 34 + t * 8 + r() * 4], rim: [hue + 4 + t * 5 + r() * 5, 100, 52 + t * 8 + r() * 6],
        tip: 0.05, notch: 0.06 + r() * 0.05, veins: 0.16, edge: 0.3, shine: 0.22,
      });
      ctx.restore();
    }
  });
  // the dark heart of the flower where the petals tuck in
  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 0.14);
  core.addColorStop(0, "rgba(120,40,0,.6)"); core.addColorStop(1, "rgba(120,40,0,0)");
  ctx.fillStyle = core; ctx.beginPath(); ctx.arc(0, 0, S * 0.14, 0, Math.PI * 2); ctx.fill();
  return { canvas, kind: "head" };
}

/** Rose seen from above: rings of broad, cupped petals around a tight spiral centre. */
function rose(seed: number, hue: number, light: number): Sprite {
  const r = seeded(seed), { canvas, ctx } = blank();
  ctx.translate(S / 2, S / 2);
  const layers = [
    { n: 6, at: 0.06, len: 0.4, wid: 0.5, l: 0 }, { n: 5, at: 0.05, len: 0.32, wid: 0.46, l: 4 },
    { n: 5, at: 0.04, len: 0.24, wid: 0.4, l: 8 }, { n: 4, at: 0.03, len: 0.17, wid: 0.34, l: 12 },
  ];
  layers.forEach((ly, k) => {
    for (let i = 0; i < ly.n; i++) {
      const a = (i / ly.n) * Math.PI * 2 + k * 0.7 + r() * 0.3;
      ctx.save();
      ctx.rotate(a); ctx.translate(0, -ly.at * S);
      const j = 0.92 + r() * 0.16;
      paintPetal(ctx, ly.len * S * j, ly.wid * S * j, {
        base: [hue, 78, light - 14 + ly.l * 0.5], rim: [hue + 4, 70, light + 14 + ly.l], tip: 0, notch: 0.05, veins: 0.045, edge: 0.3, shine: 0.34,
      });
      // a light rim catches the top edge of the petal
      petalPath(ctx, ly.len * S * j, ly.wid * S * j, 0, 0.05);
      ctx.strokeStyle = hsl([hue + 6, 80, light + 30], 0.35); ctx.lineWidth = 1.1; ctx.stroke();
      ctx.restore();
    }
  });
  // the closed bud in the middle: a spiral of tightly wrapped petals
  ctx.strokeStyle = hsl([hue, 80, light - 22], 0.7); ctx.lineWidth = 1.6; ctx.lineCap = "round";
  ctx.beginPath();
  for (let t = 0; t < 11; t += 0.18) { const rr = 1.2 + t * 1.45; const x = Math.cos(t) * rr, y = Math.sin(t) * rr * 0.92; if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke();
  const glow = ctx.createRadialGradient(-3, -3, 0, 0, 0, 14);
  glow.addColorStop(0, hsl([hue + 4, 75, light + 16], 0.5)); glow.addColorStop(1, hsl([hue, 78, light], 0));
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
  return { canvas, kind: "head" };
}

/** Jasmine: a small star of slender white petals with a pale yellow-green throat. */
function jasmine(seed: number): Sprite {
  const r = seeded(seed), { canvas, ctx } = blank();
  ctx.translate(S / 2, S / 2);
  const rings = [{ n: 5, len: 0.48, wid: 0.27, off: 0 }, { n: 5, len: 0.4, wid: 0.25, off: Math.PI / 5 }];
  rings.forEach((ring) => {
    for (let i = 0; i < ring.n; i++) {
      ctx.save();
      ctx.rotate((i / ring.n) * Math.PI * 2 + ring.off + r() * 0.12);
      const j = 0.94 + r() * 0.1;
      paintPetal(ctx, ring.len * S * j, ring.wid * S * j, { base: [62, 38, 86], rim: [48, 22, 99], tip: 0.7, veins: 0.07, edge: 0.2, shine: 0.45 });
      ctx.restore();
    }
  });
  const throat = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 0.1);
  throat.addColorStop(0, "rgba(235,215,120,.95)"); throat.addColorStop(1, "rgba(235,225,150,0)");
  ctx.fillStyle = throat; ctx.beginPath(); ctx.arc(0, 0, S * 0.1, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(170,120,20,.8)";
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; ctx.beginPath(); ctx.arc(Math.cos(a) * S * 0.04, Math.sin(a) * S * 0.04, 1.4, 0, Math.PI * 2); ctx.fill(); }
  return { canvas, kind: "head" };
}

/** A single loose petal, centred in its sprite, long axis vertical. */
function loosePetal(seed: number, base: HSL, rim: HSL, len: number, wid: number, tip: number, notch = 0): Sprite {
  const r = seeded(seed), { canvas, ctx } = blank();
  ctx.translate(S / 2, S / 2 + len * S * 0.5);
  ctx.rotate((r() - 0.5) * 0.25);
  paintPetal(ctx, len * S, wid * S, { base, rim, tip, notch, veins: 0.12, edge: 0.24, shine: 0.38 });
  return { canvas, kind: "petal" };
}

function leaf(seed: number, hue: number): Sprite {
  const r = seeded(seed), { canvas, ctx } = blank();
  const len = (0.74 + r() * 0.1) * S;
  ctx.translate(S / 2, S / 2 + len * 0.5);
  ctx.rotate((r() - 0.5) * 0.3);
  paintPetal(ctx, len, 0.5 * S, { base: [hue, 52, 20], rim: [hue - 6, 52, 38], tip: 0.85, veins: 0, edge: 0.3, shine: 0.22 });
  ctx.strokeStyle = "rgba(210,235,160,.55)"; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -len * 0.94); ctx.stroke();            // midrib
  ctx.strokeStyle = "rgba(210,235,160,.3)"; ctx.lineWidth = 1;
  for (let k = 1; k <= 5; k++) {                                                          // side veins
    const y = -len * (0.12 + k * 0.15);
    for (const sgn of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, y); ctx.quadraticCurveTo(sgn * S * 0.12, y - len * 0.04, sgn * S * (0.2 - k * 0.018), y - len * 0.11); ctx.stroke(); }
  }
  return { canvas, kind: "leaf" };
}

export type SpriteSet = { weight: number; sprites: Sprite[] }[];

/** Builds every variant once. Weights say how often each family turns up in the shower. */
export function buildSprites(): SpriteSet {
  return [
    { weight: 24, sprites: [marigold(11), marigold(23), marigold(37), marigold(51)] },
    { weight: 15, sprites: [rose(5, 350, 40), rose(9, 348, 46), rose(14, 340, 58), rose(18, 355, 36)] },
    { weight: 14, sprites: [jasmine(3), jasmine(8), jasmine(13)] },
    { weight: 20, sprites: [
      loosePetal(2, [346, 72, 40], [348, 80, 62], 0.5, 0.46, 0.1, 0.06), loosePetal(6, [340, 74, 48], [342, 82, 72], 0.46, 0.44, 0.08, 0.05),
      loosePetal(10, [352, 70, 34], [350, 74, 52], 0.5, 0.48, 0.1, 0.07), loosePetal(15, [336, 70, 62], [336, 76, 84], 0.48, 0.44, 0.1, 0.05),
    ] },
    { weight: 8, sprites: [loosePetal(4, [26, 95, 40], [38, 98, 58], 0.34, 0.26, 0.1, 0.07), loosePetal(7, [34, 95, 44], [45, 98, 62], 0.34, 0.26, 0.1, 0.07)] },
    { weight: 6, sprites: [loosePetal(12, [335, 40, 92], [328, 62, 72], 0.62, 0.3, 0.7), loosePetal(17, [338, 38, 94], [330, 60, 76], 0.6, 0.3, 0.7)] },
    { weight: 8, sprites: [leaf(21, 112), leaf(33, 100)] },
  ];
}
