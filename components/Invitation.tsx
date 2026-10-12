import Fireworks from "./Fireworks";
import CapName from "./CapName";
import FlipWord from "./FlipWord";
import ScrollReveal from "./ScrollReveal";
import ScratchCard from "./ScratchCard";
import { SectionTitle } from "./Reveal";
import { events, photos, wedding } from "@/lib/config";

const initials = `${wedding.groom[0]} & ${wedding.bride[0]}`;

function Hero() {
  const name = "font-script text-maroon-deep drop-shadow-[0_0_10px_rgba(255,247,234,.95)]";
  // only the empty sky at the top of the photo dissolves into the page; the temple and couple stay untouched
  const fade = "linear-gradient(to bottom, transparent 0%, #000 24%, #000 92%, transparent 100%)";
  // sunrise colour splashed over the sky: soft blobs that burst open one after another (multiply keeps them pastel on the pale sky)
  const splashes = [
    { l: -12, t: -22, w: 74, h: 84, c: "rgba(190,160,238,.95)" },
    { l: 34, t: -18, w: 78, h: 76, c: "rgba(255,148,184,.95)" },
    { l: 58, t: 22, w: 62, h: 74, c: "rgba(255,176,106,.9)" },
    { l: -10, t: 28, w: 62, h: 74, c: "rgba(255,138,138,.85)" },
    { l: 24, t: 48, w: 66, h: 62, c: "rgba(255,214,118,.85)" },
    { l: 66, t: -14, w: 48, h: 56, c: "rgba(232,140,222,.85)" },
  ];
  return (
    <section className="relative overflow-hidden bg-ivory pt-8 text-center">
      {/* the names rise from behind the mandap (see .seq-names in globals.css) */}
      <div className="seq-names relative z-10 flex flex-col items-center px-4">
        <div className="mb-3 space-y-0.5 font-serif text-[12.5px] font-semibold leading-snug tracking-[.06em] text-maroon">
          <p>|| Shree Venkateshwara Swamy Prasanna ||</p>
          <p>|| Shree Banashankari Devi Prasanna ||</p>
          <p>|| Shree Yelumakkala Tayi Prasanna ||</p>
        </div>
        <div className="flex items-baseline justify-center gap-2 whitespace-nowrap pl-3 text-[clamp(28px,8.8vw,40px)] leading-none">
          <CapName className={name}>{wedding.groom}</CapName>
          <FlipWord className="font-script text-[.95em] text-ruby drop-shadow-[0_0_8px_rgba(255,247,234,.95)]" />
          <CapName className={name}>{wedding.bride}</CapName>
        </div>
      </div>

      {/* the scene is two layers (setting + couple) that fade in together */}
      <div className="relative z-[1] -mt-6" style={{ WebkitMaskImage: fade, maskImage: fade }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-bg.jpg" alt="" className="seq-bg block h-auto w-full" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[48%] [mix-blend-mode:multiply]" aria-hidden>
          {splashes.map((b, i) => (
            <span
              key={i}
              className="splash absolute"
              style={{ left: `${b.l}%`, top: `${b.t}%`, width: `${b.w}%`, height: `${b.h}%`, background: `radial-gradient(closest-side, ${b.c}, transparent)`, ["--sd" as string]: `${2 + i * 0.22}s`, ["--sdur" as string]: `${4.4 + i * 0.7}s` }}
            />
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-couple.png"
          alt="Sai Kiran and Asha holding hands before the temple mandap"
          className="seq-couple absolute h-auto"
          style={{ left: "35.84%", top: "31.67%", width: "35.64%" }}
        />
        <div className="seq-fx absolute inset-0"><Fireworks light /></div>
      </div>
      <div className="pb-3" />
    </section>
  );
}

function Welcome() {
  return (
    <section className="px-8 pt-8">
      <ScrollReveal className="rounded-3xl border border-gold/20 bg-gradient-to-b from-white/25 to-white/45 px-5 py-5 text-center shadow-[0_10px_40px_rgba(212,164,57,.14)] backdrop-blur-[2px]">
        <div className="mx-auto flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-full border border-gold-dark/70 font-script text-sm text-gold-dark">
          {initials}
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
                <h3 className="gold-text font-script text-3xl leading-tight">{e.name}</h3>
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
          <img src="/couple.png" alt="Sai Kiran and Asha" className="h-full w-full object-cover object-[50%_50%] [filter:brightness(1.22)_contrast(.96)_saturate(1.08)]" />
        </div>
      </ScrollReveal>
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

const ROT = [-3, 3, 3, -3];

function Gallery() {
  return (
    <section className="px-5 pt-12">
      <SectionTitle eyebrow="Our story, so far" title="Moments" />
      <div className="grid grid-cols-2 gap-5">
        {photos.map((ph, i) => (
          <ScrollReveal key={ph.src} delay={(i % 2) * 0.12}>
          <figure
            className="relative bg-ivory p-2 pb-8 shadow-[0_14px_28px_rgba(90,30,20,.3)] transition-transform duration-300 [transform:rotate(var(--r))] hover:z-10 hover:[transform:rotate(0deg)_scale(1.06)] active:[transform:rotate(0deg)_scale(1.06)]"
            style={{ ["--r" as string]: `${ROT[i % ROT.length]}deg` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ph.src} alt={ph.caption} className="aspect-[4/5] w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-1 text-center font-script text-xl text-maroon">{ph.caption}</figcaption>
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
      <Hero />
      <Welcome />
      <ScratchCard />
      <Celebrations />
      <MeetCouple />
      <Gallery />
    </>
  );
}
