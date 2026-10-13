import ScrollReveal from "./ScrollReveal";
import { SectionTitle } from "./Reveal";
import { events } from "@/lib/config";

export default function Celebrations() {
  return (
    <section>
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
