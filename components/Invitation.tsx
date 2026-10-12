import Fireworks from "./Fireworks";
import CapName from "./CapName";
import FlipWord from "./FlipWord";
import { SectionTitle } from "./Reveal";
import { couple, events, photos, wedding } from "@/lib/config";

const initials = `${wedding.groom[0]} & ${wedding.bride[0]}`;

function Hero() {
  const name = "font-script text-maroon-deep drop-shadow-[0_0_10px_rgba(255,247,234,.95)]";
  // only the empty sky at the top of the photo dissolves into the page; the temple and couple stay untouched
  const fade = "linear-gradient(to bottom, transparent 0%, #000 24%, #000 92%, transparent 100%)";
  return (
    <section className="relative overflow-hidden bg-ivory pt-8 text-center">
      <div className="relative z-10 flex flex-col items-center px-4">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[.4em] text-maroon">With Bappa&apos;s Blessings</p>
        <div className="flex items-baseline justify-center gap-2 whitespace-nowrap pl-3 text-[clamp(28px,8.8vw,40px)] leading-none">
          <CapName className={name}>{wedding.groom}</CapName>
          <FlipWord className="font-script text-[.95em] text-ruby drop-shadow-[0_0_8px_rgba(255,247,234,.95)]" />
          <CapName className={name}>{wedding.bride}</CapName>
        </div>
      </div>

      <div className="relative -mt-6" style={{ WebkitMaskImage: fade, maskImage: fade }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/home.jpg" alt="Sai Kiran and Asha holding hands before the temple mandap" className="block h-auto w-full" />
        <div className="absolute inset-0"><Fireworks light /></div>
      </div>
      <p className="pb-3 pt-1 text-[10px] uppercase tracking-[.4em] text-maroon/70">Scroll ⌄</p>
    </section>
  );
}

function Welcome() {
  return (
    <section className="px-5 pt-12">
      <div className="glass rounded-[2rem] px-6 py-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center whitespace-nowrap rounded-full border border-gold-dark/70 font-script text-lg text-gold-dark">
          {initials}
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[.35em] text-gold-dark">Together with their families</p>
        <h2 className="gold-text mt-1 font-script text-6xl">Welcome</h2>
        <p className="mt-3 font-serif text-lg leading-relaxed text-maroon-deep">
          With the blessings of Lord Ganesha and our elders, we joyfully invite you to share in the wedding of our children.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gold/30 pt-4 text-sm">
          <div><p className="text-[10px] uppercase tracking-[.2em] text-gold-dark">Groom&apos;s family</p><p className="mt-1 font-serif text-maroon-deep">{wedding.groomParents}</p></div>
          <div><p className="text-[10px] uppercase tracking-[.2em] text-gold-dark">Bride&apos;s family</p><p className="mt-1 font-serif text-maroon-deep">{wedding.brideParents}</p></div>
        </div>
      </div>
    </section>
  );
}

function Celebrations() {
  return (
    <section className="px-5 pt-12">
      <SectionTitle eyebrow="Save the dates" title="The Celebrations" />
      <div className="space-y-4">
        {events.map((e) => {
          const featured = "featured" in e && e.featured;
          const [day, month, year] = e.date.split(" ");
          return (
            <article
              key={e.name}
              className={`glass relative flex items-center gap-4 rounded-3xl p-4 ${featured ? "!border-gold-dark/80 bg-gradient-to-br from-ruby/15 to-saffron/20" : ""}`}
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
                <p className="mt-0.5 inline-block rounded-full border border-gold-dark/40 px-3 py-0.5 text-[11px] uppercase tracking-[.2em] text-gold-dark">{e.time}</p>
                <p className="mt-1.5 text-xs text-maroon/90">📍 {e.venue}</p>
              </div>
            </article>
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
      <div className="ornate-frame mx-auto aspect-[2/3] w-[76%] overflow-hidden rounded-t-[999px] bg-night shadow-[0_18px_40px_rgba(90,30,20,.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/couple.png" alt="Sai Kiran and Asha" className="h-full w-full object-cover object-[50%_50%] [filter:brightness(1.22)_contrast(.96)_saturate(1.08)]" />
      </div>
      <div className="mt-6 space-y-4">
        <div className={block}>
          <p className="text-[10px] uppercase tracking-[.3em] text-gold-dark">The groom</p>
          <h3 className="font-serif text-3xl font-semibold text-maroon-deep">{wedding.groom}</h3>
          <p className="mt-1 font-serif text-base leading-relaxed text-maroon/90">{couple.groom}</p>
        </div>
        <div className={`${block} text-right`}>
          <p className="text-[10px] uppercase tracking-[.3em] text-gold-dark">The bride</p>
          <h3 className="font-serif text-3xl font-semibold text-maroon-deep">{wedding.bride}</h3>
          <p className="mt-1 font-serif text-base leading-relaxed text-maroon/90">{couple.bride}</p>
        </div>
      </div>
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
          <figure key={ph.src} className="relative bg-ivory p-2 pb-8 shadow-[0_14px_28px_rgba(90,30,20,.3)]" style={{ transform: `rotate(${ROT[i % ROT.length]}deg)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ph.src} alt={ph.caption} className="aspect-[4/5] w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-1 text-center font-script text-xl text-maroon">{ph.caption}</figcaption>
          </figure>
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
      <Celebrations />
      <MeetCouple />
      <Gallery />
    </>
  );
}
