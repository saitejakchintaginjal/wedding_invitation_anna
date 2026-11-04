import ScrollReveal from "./ScrollReveal";
import Slide from "./Slide";
import { SectionTitle } from "./Reveal";
import { events } from "@/lib/config";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "26 November 2026" -> "Thursday" */
const weekdayOf = (date: string) => { const [d, m, y] = date.split(" "); return WEEKDAYS[new Date(Number(y), MONTHS.indexOf(m), Number(d)).getDay()]; };

/** The dates: one card per event. */
export default function Celebrations() {
  return (
    <Slide tone="ivory">
      <SectionTitle eyebrow="Save the dates" title="The Celebrations" />
      <div className="w-full space-y-u22">
        {events.map((e, i) => {
          const featured = "featured" in e && e.featured;
          const [day, month, year] = e.date.split(" ");
          return (
            <ScrollReveal key={e.name} delay={i * 0.12}>
              <article
                className={`glass tap-lift relative flex items-center gap-u18 rounded-u30 px-u20 py-u26 ${featured ? "!border-gold-dark/80 bg-gradient-to-br from-ruby/15 to-saffron/20" : ""}`}
              >
                <div className="shrink-0 text-center">
                  <div className="text-u10 font-semibold uppercase tracking-[.22em] text-gold-dark">{weekdayOf(e.date).slice(0, 3)}</div>
                  <div className="gold-text font-serif text-u62 font-semibold leading-none">{day}</div>
                  <div className="mt-u6 text-u12 uppercase tracking-[.22em] text-maroon/80">{month.slice(0, 3)} {year}</div>
                </div>
                <div className="min-w-0 flex-1 border-l border-gold/40 pl-u18">
                  <h3 className="gold-text pb-u2 font-script text-u36 leading-[1.2]">{e.name}</h3>
                  {e.timeLabel && <p className="mt-u2 inline-block rounded-full border border-gold-dark/40 px-u12 py-u3 text-u12 uppercase tracking-[.18em] text-gold-dark">{e.timeLabel}</p>}
                  <p className="mt-u10 text-u14 leading-snug text-maroon/90">📍 {e.venue}</p>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </Slide>
  );
}
