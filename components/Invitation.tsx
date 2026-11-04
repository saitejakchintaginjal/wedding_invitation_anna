import Garland from "./Garland";
import Fireworks from "./Fireworks";
import CapName from "./CapName";
import FlipWord from "./FlipWord";
import ScrollReveal from "./ScrollReveal";
import ScratchCard from "./ScratchCard";
import Slide from "./Slide";
import { SectionTitle } from "./Reveal";
import { photos, wedding } from "@/lib/config";

// Bells are cut out of the illustration (see public/bells) and swung from the point they hang. x/y/w/h/px/py are in the
// illustration's own pixels (765 x 1024); px/py is the pivot inside each bell sprite.
const BELLS = [
  { id: "a", x: 50, y: 170, w: 48, h: 86, px: 28, py: 2, amp: 5.5, dur: 3.6, delay: 0 },
  { id: "b", x: 98, y: 262, w: 48, h: 52, px: 24, py: 4, amp: 8, dur: 2.7, delay: 0.4 },
  { id: "c", x: 594, y: 266, w: 49, h: 56, px: 24, py: 4, amp: 8, dur: 3.1, delay: 0.9 },
  { id: "d", x: 646, y: 160, w: 44, h: 98, px: 21, py: 2, amp: 5.5, dur: 3.9, delay: 0.2 },
];

/** Slide 1: sacred symbols, the prayer lines and the temple illustration with the names. */
function Hero() {
  const name = "font-script text-maroon-deep drop-shadow-[0_0_10px_rgba(255,247,234,.9)]";
  // the picture dissolves into the ivory slide on all four sides, so it never ends in a hard edge on a wide screen
  const fadeV = "linear-gradient(to bottom, transparent 0%, #000 2%, #000 93%, transparent 100%)";
  const fadeH = "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)";
  return (
    <Slide bare frame={false} tone="ivory" top={<Garland />}>
      <div className="flex w-full flex-col items-center py-u16 text-center">
        {/* sacred symbols: transparent cut-out with a soft brown edge so the white Namam shows on ivory */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/symbols.png" alt="Sudarshana Chakra, Namam and Shankha" className="block h-auto w-u187 [filter:drop-shadow(0_0_.6px_#6b4410)_drop-shadow(0_0_.6px_#6b4410)_drop-shadow(0_2px_3px_rgba(90,40,10,.25))]" />
        <div className="mb-u8 mt-u10 space-y-0.5 px-u16 font-serif text-u13 font-semibold leading-snug tracking-[.06em] text-maroon">
          <p>|| Shree Venkateshwara Swamy Prasanna ||</p>
          <p>|| Shree Banashankari Devi Prasanna ||</p>
          <p>|| Shree Yelumakkala Tayi Prasanna ||</p>
        </div>

        {/* as wide as the slide allows, but never so tall that the slide overflows the screen (1.338 = the picture's height / width) */}
        <div
          className="relative [container-type:inline-size]"
          style={{
            width: "min(100%, calc((100vh - var(--u) * 205) / 1.338))",
            WebkitMaskImage: `${fadeV}, ${fadeH}`, maskImage: `${fadeV}, ${fadeH}`,
            WebkitMaskComposite: "source-in", maskComposite: "intersect",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-temple.jpg" alt="SaiKiran and Asha walking hand in hand towards the temple" className="seq-bg block h-auto w-full" />
          {BELLS.map((b) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={b.id}
              src={`/bells/${b.id}.png`}
              alt=""
              aria-hidden
              className="bell pointer-events-none absolute"
              style={{
                left: `${(b.x / 765) * 100}%`, top: `${(b.y / 1024) * 100}%`, width: `${(b.w / 765) * 100}%`,
                ["--ox" as string]: `${(b.px / b.w) * 100}%`, ["--oy" as string]: `${(b.py / b.h) * 100}%`,
                ["--a" as string]: `${b.amp}deg`, ["--dur" as string]: `${b.dur}s`, ["--bd" as string]: `${b.delay}s`,
              }}
            />
          ))}
          {/* names sit in the clear sky between the hanging garlands, above the temple spire; sized from the picture so they stay in place */}
          <div className="seq-names absolute inset-x-0 top-[24%] flex justify-center">
            <div className="flex items-baseline justify-center gap-[1.2cqw] whitespace-nowrap text-[6.8cqw] leading-none">
              <CapName className={name}>{wedding.groom}</CapName>
              <FlipWord className="font-script text-[.95em] text-ruby drop-shadow-[0_0_8px_rgba(255,247,234,.95)]" />
              <CapName className={name}>{wedding.bride}</CapName>
            </div>
          </div>
          <div className="seq-fx absolute inset-0"><Fireworks light startAfter={{ htmlClass: "revealed", ms: 8000 }} /></div>
        </div>
      </div>
    </Slide>
  );
}

/** Slide 2: the welcome and both families. */
function Welcome() {
  const family = (label: string, names: readonly string[], divider = false) => (
    <div className={divider ? "border-t border-gold/25 pt-u16" : ""}>
      <p className="text-u12 font-bold uppercase tracking-[.16em] text-gold-dark">{label}</p>
      <p className="mt-u4 font-serif text-u17 font-bold leading-snug text-maroon-deep">
        {names.map((n) => <span key={n} className="block whitespace-nowrap">{n}</span>)}
      </p>
    </div>
  );
  return (
    <Slide tone="sand" mandala>
      <ScrollReveal className="w-full">
        <div className="glass rounded-u30 px-u20 py-u34 text-center">
          <div className="mx-auto flex h-u92 w-u92 items-center justify-center whitespace-nowrap rounded-full border border-gold-dark/70 pb-u2 font-script text-u23 leading-none tracking-tight text-gold-dark shadow-[inset_0_0_0_3px_rgba(255,247,234,.9),inset_0_0_0_4px_rgba(184,134,11,.35)]">
            <span className="flex items-center gap-u7">
              <span className="pr-px"><CapName>{wedding.groom[0]}</CapName></span>
              <span className="text-[1.15em] text-ruby" aria-label="and">♥</span>
              <span><CapName>{wedding.bride[0]}</CapName></span>
            </span>
          </div>
          <p className="mt-u16 text-u11 uppercase tracking-[.3em] text-gold-dark">Together with their families</p>
          <h2 className="gold-text pb-u4 font-script text-u64 leading-[1.2]">Welcome</h2>
          <p className="mt-u4 font-serif text-u19 leading-snug text-maroon-deep">
            With the blessings of Lord Ganesha and our elders, we joyfully invite you to share in the wedding of our children.
          </p>
          <div className="mx-auto my-u20 flex items-center justify-center gap-u8 text-gold">
            <span className="h-px w-u60 bg-gradient-to-r from-transparent to-gold" /><span aria-hidden className="text-u10">&#10022;</span><span className="h-px w-u60 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <div className="space-y-u16">
            {family("Groom's family", wedding.groomParents)}
            {family("Bride's family", wedding.brideParents, true)}
          </div>
        </div>
      </ScrollReveal>
    </Slide>
  );
}

/** Slide 4: childhood photos and the story note. */
function MeetCouple() {
  const kids = [
    { src: "/groom-child.jpg", name: wedding.groom, pos: "50% 18%", rot: -3 },
    { src: "/bride-child.jpg", name: wedding.bride, pos: "50% 22%", rot: 3 },
  ];
  return (
    <Slide tone="blush">
      <SectionTitle eyebrow="Meet the" title="Bride & Groom" />
      <div className="grid w-full grid-cols-2 gap-u12">
        {kids.map((k, i) => (
          <ScrollReveal key={k.name} delay={i * 0.12}>
            <figure className="tap-lift relative bg-ivory p-u7 pb-u34 shadow-[0_14px_28px_rgba(90,30,20,.3)]" style={{ transform: `rotate(${k.rot}deg)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={k.src} alt={`${k.name} as a child`} className="aspect-[4/5] w-full object-cover" style={{ objectPosition: k.pos }} />
              <figcaption className="absolute inset-x-0 bottom-u4 text-center font-script text-u24 leading-none text-maroon"><CapName>{k.name}</CapName></figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={0.1} className="w-full">
        <div className="glass tap-lift mt-u20 rounded-u22 px-u16 py-u14 text-center">
          <p className="font-script text-u30 leading-tight text-gold-dark">Two little stories</p>
          <p className="mt-u4 font-serif text-u15 leading-snug text-maroon/90">
            Long before they met, two sweet children were growing up under different roofs, never knowing that life was quietly
            writing them into the same story. Today, that story becomes forever.
          </p>
        </div>
      </ScrollReveal>
    </Slide>
  );
}

/** Two interlocked hearts, drawn in gold and ruby. */
function Hearts() {
  const heart = "M50 88C10 60 0 38 0 24 0 10 10 0 24 0 36 0 46 8 50 18 54 8 64 0 76 0 90 0 100 10 100 24 100 38 90 60 50 88Z";
  return (
    <svg viewBox="-6 -6 124 100" aria-hidden className="h-u56 w-auto" fill="none" strokeLinejoin="round">
      <path d={heart} transform="translate(-4 -2)" stroke="#c9962b" strokeWidth="2.2" fill="rgba(241,217,138,.28)" />
      <path d={heart} transform="translate(16 4)" stroke="#b3122e" strokeWidth="2.2" fill="rgba(179,18,46,.14)" />
    </svg>
  );
}

/** Slide 5: the promise. */
function Promise() {
  const portraits = [
    { src: "/groom.jpg", name: wedding.groom, role: "The Groom", pos: "50% 12%" },
    { src: "/bride.jpg", name: wedding.bride, role: "The Bride", pos: "62% 12%" },
  ];
  return (
    <Slide tone="sand" mandala>
      <ScrollReveal className="flex w-full flex-col items-center text-center">
        <Hearts />
        <h2 className="gold-text mt-u10 pb-u4 font-script text-u46 leading-[1.2]">Two hearts, one journey</h2>
        <div className="my-u12 flex items-center justify-center gap-u8 text-gold">
          <span className="h-px w-u54 bg-gradient-to-r from-transparent to-gold" /><span aria-hidden className="text-u10">&#10022;</span><span className="h-px w-u54 bg-gradient-to-l from-transparent to-gold" />
        </div>
        <p className="max-w-u330 font-serif text-u16 leading-snug text-maroon/90">
          Two souls, two families, one beautiful beginning. We would be honoured to have you with us as we start a lifetime of love, laughter and togetherness.
        </p>
      </ScrollReveal>
      <div className="mt-u20 grid w-full grid-cols-2 gap-u12">
        {portraits.map((p, i) => (
          <ScrollReveal key={p.role} delay={i * 0.12}>
            <figure className="tap-lift text-center">
              <div className="ornate-frame aspect-[3/4] overflow-hidden rounded-t-[999px] shadow-[0_14px_30px_rgba(90,30,20,.3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.name} className="h-full w-full object-cover" style={{ objectPosition: p.pos }} />
              </div>
              <figcaption className="mt-u5">
                <p className="mx-auto inline-block rounded-full border border-gold/60 bg-gold/20 px-u12 py-u3 text-u12 font-bold uppercase tracking-[.24em] text-maroon-deep">{p.role}</p>
                <p className="font-script text-u30 leading-tight text-maroon-deep"><CapName>{p.name}</CapName></p>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </Slide>
  );
}

/** Slide 6: the arch-framed couple photograph with two polaroids tucked in beneath it. */
function Moments() {
  return (
    <Slide tone="ivory">
      <SectionTitle eyebrow="Captured with love" title="Moments Together" />
      <ScrollReveal>
        <div className="ornate-frame tap-lift aspect-[2/3] w-u210 overflow-hidden rounded-t-[999px] bg-night shadow-[0_18px_40px_rgba(90,30,20,.35)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/couple.png" alt="SaiKiran and Asha" className="h-full w-full object-cover object-[50%_50%] [filter:brightness(1.22)_contrast(.96)_saturate(1.08)]" />
        </div>
      </ScrollReveal>
      <div className="-mt-u30 flex w-full justify-between px-u4">
        {photos.map((ph, i) => (
          <ScrollReveal key={ph.src} delay={0.15 + i * 0.12}>
            <figure
              className="relative w-u158 bg-ivory p-u6 pb-u12 shadow-[0_14px_28px_rgba(90,30,20,.32)] transition-transform duration-300 [transform:rotate(var(--r))] active:[transform:rotate(0deg)_scale(1.03)]"
              style={{ ["--r" as string]: `${i % 2 ? 3 : -3}deg` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ph.src} alt={ph.caption} className="aspect-[4/5] w-full object-cover" style={{ objectPosition: ph.pos }} />
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </Slide>
  );
}

export default function Invitation() {
  return (
    <>
      <Hero />
      <Welcome />
      <ScratchCard />
      <MeetCouple />
      <Promise />
      <Moments />
    </>
  );
}
