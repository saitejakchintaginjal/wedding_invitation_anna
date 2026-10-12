import Fireworks from "./Fireworks";
import CapName from "./CapName";
import FlipWord from "./FlipWord";
import ScrollReveal from "./ScrollReveal";
import ScratchCard from "./ScratchCard";
import { SectionTitle } from "./Reveal";
import { events, photos, wedding } from "@/lib/config";


// Bells are cut out of the illustration (see public/bells) and swung from the point they hang. x/y/w/h/px/py are in the
// illustration's own pixels (765 x 1024); px/py is the pivot inside each bell sprite.
const BELLS = [
  { id: "a", x: 50, y: 170, w: 48, h: 86, px: 28, py: 2, amp: 5.5, dur: 3.6, delay: 0 },
  { id: "b", x: 98, y: 262, w: 48, h: 52, px: 24, py: 4, amp: 8, dur: 2.7, delay: 0.4 },
  { id: "c", x: 594, y: 266, w: 49, h: 56, px: 24, py: 4, amp: 8, dur: 3.1, delay: 0.9 },
  { id: "d", x: 646, y: 160, w: 44, h: 98, px: 21, py: 2, amp: 5.5, dur: 3.9, delay: 0.2 },
];

function Hero() {
  const name = "font-script text-maroon-deep drop-shadow-[0_0_10px_rgba(255,247,234,.9)]";
  // the illustration shows in full at the top; only its bottom edge dissolves into the ivory page
  const fade = "linear-gradient(to bottom, transparent 0%, #000 1.8%, #000 93%, transparent 100%)";
  return (
    <section className="relative overflow-hidden bg-ivory pt-5 text-center">
      <div className="relative z-10 space-y-0.5 px-4 pb-2 font-serif text-[12.5px] font-semibold leading-snug tracking-[.06em] text-maroon">
        <p>|| Shree Venkateshwara Swamy Prasanna ||</p>
        <p>|| Shree Banashankari Devi Prasanna ||</p>
        <p>|| Shree Yelumakkala Tayi Prasanna ||</p>
      </div>

      <div className="relative" style={{ WebkitMaskImage: fade, maskImage: fade }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-temple.jpg"
          alt="SaiKiran and Asha walking hand in hand towards the temple"
          className="seq-bg block h-auto w-full"
        />
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
        {/* names sit in the clear sky between the hanging garlands, above the temple spire */}
        <div className="seq-names absolute inset-x-0 top-[24%] flex justify-center">
          <div className="flex items-baseline justify-center gap-1.5 whitespace-nowrap text-[clamp(22px,6.8vw,34px)] leading-none">
            <CapName className={name}>{wedding.groom}</CapName>
            <FlipWord className="font-script text-[.95em] text-ruby drop-shadow-[0_0_8px_rgba(255,247,234,.95)]" />
            <CapName className={name}>{wedding.bride}</CapName>
          </div>
        </div>
        <div className="seq-fx absolute inset-0"><Fireworks light startAfter={{ htmlClass: "revealed", ms: 2800 }} /></div>
      </div>
    </section>
  );
}

function Welcome() {
  return (
    <section className="px-8 pt-8">
      <ScrollReveal className="rounded-3xl border border-gold/20 bg-gradient-to-b from-white/25 to-white/45 px-5 py-5 text-center shadow-[0_10px_40px_rgba(212,164,57,.14)] backdrop-blur-[2px]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center whitespace-nowrap rounded-full border border-gold-dark/70 pb-0.5 font-script text-[16px] leading-none tracking-tight text-gold-dark shadow-[inset_0_0_0_3px_rgba(255,247,234,.9),inset_0_0_0_4px_rgba(184,134,11,.35)]">
          <CapName>{wedding.groom[0]}</CapName>
          <span className="mx-0.5 text-[1.15em] text-ruby" aria-label="and">♥</span>
          <CapName>{wedding.bride[0]}</CapName>
        </div>
        <p className="mt-2 text-[9px] uppercase tracking-[.3em] text-gold-dark">Together with their families</p>
        <h2 className="gold-text font-script text-4xl leading-tight">Welcome</h2>
        <p className="mt-1.5 font-serif text-[15px] leading-snug text-maroon-deep">
          With the blessings of Lord Ganesha and our elders, we joyfully invite you to share in the wedding of our children.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gold/30 pt-2.5 text-xs">
          <div><p className="text-[9px] uppercase tracking-[.15em] text-gold-dark">Groom&apos;s family</p><p className="mt-0.5 font-serif text-[13px] leading-snug text-maroon-deep">{wedding.groomParents}</p></div>
          <div><p className="text-[9px] uppercase tracking-[.15em] text-gold-dark">Bride&apos;s family</p><p className="mt-0.5 font-serif text-[13px] leading-snug text-maroon-deep">{wedding.brideParents}</p></div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Celebrations() {
  return (
    <section className="px-5 pt-12">
      <SectionTitle eyebrow="Save the dates" title="The Celebrations" />
      <div className="space-y-4">
        {events.map((e, i) => {
          const featured = "featured" in e && e.featured;
          const [day, month, year] = e.date.split(" ");
          return (
            <ScrollReveal key={e.name} delay={i * 0.12}>
            <article
              className={`glass tap-lift relative flex items-center gap-4 rounded-3xl p-4 ${featured ? "!border-gold-dark/80 bg-gradient-to-br from-ruby/15 to-saffron/20" : ""}`}
            >
              {featured && (
                <span className="gold-btn absolute -top-2.5 right-5 rounded-full px-3 py-1 text-[9px] font-medium">MAIN EVENT</span>
              )}
              <div className="shrink-0 text-center">
                <div className="gold-text font-serif text-5xl font-semibold leading-none">{day}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[.25em] text-maroon/80">{month.slice(0, 3)} {year}</div>
              </div>
              <div className="min-w-0 flex-1 border-l border-gold/40 pl-4">
                <h3 className="gold-text font-script text-[28px] leading-tight">{e.name}</h3>
                {e.timeLabel && <p className="mt-0.5 inline-block rounded-full border border-gold-dark/40 px-3 py-0.5 text-[11px] uppercase tracking-[.2em] text-gold-dark">{e.timeLabel}</p>}
                <p className="mt-1.5 text-xs text-maroon/90">📍 {e.venue}</p>
              </div>
            </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

function MeetCouple() {
  const block = "glass rounded-3xl px-5 py-4";
  return (
    <section className="px-5 pt-12">
      <SectionTitle eyebrow="Meet the" title="Bride & Groom" />
      <ScrollReveal>
        <div className="ornate-frame tap-lift mx-auto aspect-[2/3] w-[76%] overflow-hidden rounded-t-[999px] bg-night shadow-[0_18px_40px_rgba(90,30,20,.35)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/couple.png" alt="SaiKiran and Asha" className="h-full w-full object-cover object-[50%_50%] [filter:brightness(1.22)_contrast(.96)_saturate(1.08)]" />
        </div>
      </ScrollReveal>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { src: "/groom.jpg", name: wedding.groom, role: "The Groom", pos: "50% 12%" },
          { src: "/bride.jpg", name: wedding.bride, role: "The Bride", pos: "62% 12%" },
        ].map((p, i) => (
          <ScrollReveal key={p.role} delay={i * 0.12}>
            <figure className="tap-lift text-center">
              <div className="ornate-frame aspect-[3/4] overflow-hidden rounded-t-[999px] shadow-[0_14px_30px_rgba(90,30,20,.3)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.name} className="h-full w-full object-cover" style={{ objectPosition: p.pos }} />
              </div>
              <figcaption className="mt-2">
                <p className="text-[10px] uppercase tracking-[.3em] text-gold-dark">{p.role}</p>
                <p className="font-script text-3xl leading-tight text-maroon-deep"><CapName>{p.name}</CapName></p>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={0.1}>
        <div className={`${block} tap-lift mt-6 text-center`}>
          <p className="font-script text-4xl leading-tight text-gold-dark">Two hearts, one journey</p>
          <p className="mt-1.5 font-serif text-base leading-relaxed text-maroon/90">
            Two souls, two families, one beautiful beginning. We would be honoured to have you with us as we start a lifetime of love, laughter and togetherness.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Childhood() {
  const kids = [
    { src: "/groom-child.jpg", name: wedding.groom, line: "A little boy with big dreams", pos: "50% 18%", rot: -3 },
    { src: "/bride-child.jpg", name: wedding.bride, line: "A little princess with a big smile", pos: "50% 22%", rot: 3 },
  ];
  return (
    <section className="px-5 pt-12">
      <SectionTitle eyebrow="Where it all began" title="Once Upon a Time" />
      <div className="grid grid-cols-2 gap-5">
        {kids.map((k, i) => (
          <ScrollReveal key={k.name} delay={i * 0.12}>
            <figure className="tap-lift relative bg-ivory p-2 pb-12 shadow-[0_14px_28px_rgba(90,30,20,.3)]" style={{ transform: `rotate(${k.rot}deg)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={k.src} alt={`${k.name} as a child`} className="aspect-[4/5] w-full object-cover" style={{ objectPosition: k.pos }} />
              <figcaption className="absolute inset-x-0 bottom-1.5 text-center font-script text-2xl leading-none text-maroon"><CapName>{k.name}</CapName></figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={0.1}>
        <div className="glass tap-lift mt-7 rounded-3xl px-5 py-4 text-center">
          <p className="font-script text-4xl leading-tight text-gold-dark">Two little stories</p>
          <p className="mt-1.5 font-serif text-base leading-relaxed text-maroon/90">
            Long before they met, two sweet children were growing up under different roofs, never knowing that life was quietly
            writing them into the same story. Today, that story becomes forever.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Gallery() {
  return (
    <section className="px-5 pt-12">
      <SectionTitle eyebrow="Our story, so far" title="Moments" />
      <div className="space-y-8">
        {photos.map((ph, i) => (
          <ScrollReveal key={ph.src}>
            <figure
              className={`relative w-[84%] bg-ivory p-2.5 pb-4 shadow-[0_16px_32px_rgba(90,30,20,.32)] transition-transform duration-300 [transform:rotate(var(--r))] hover:z-10 hover:[transform:rotate(0deg)_scale(1.03)] active:[transform:rotate(0deg)_scale(1.03)] ${i % 2 ? "ml-auto" : ""}`}
              style={{ ["--r" as string]: `${i % 2 ? 2.5 : -2.5}deg` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ph.src} alt={ph.caption} className="aspect-[3/4] w-full object-cover" style={{ objectPosition: ph.pos }} />
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export default function Invitation() {
  return (
    <>
      {/* sacred symbols: transparent cut-out with a soft brown edge so the white Namam shows on ivory */}
      <header className="px-10 pb-0 pt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/symbols.png" alt="Sudarshana Chakra, Namam and Shankha" className="mx-auto block h-auto w-[48%] [filter:drop-shadow(0_0_.6px_#6b4410)_drop-shadow(0_0_.6px_#6b4410)_drop-shadow(0_2px_3px_rgba(90,40,10,.25))]" />
      </header>
      <Hero />
      <Welcome />
      <ScratchCard />
      <Celebrations />
      <MeetCouple />
      <Childhood />
      <Gallery />
    </>
  );
}
