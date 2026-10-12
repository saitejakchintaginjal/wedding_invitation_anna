"use client";

import CapName from "./CapName";
import Countdown from "./Countdown";
import { SectionTitle } from "./Reveal";
import { events, venues, wedding } from "@/lib/config";

const pad = (n: number) => String(n).padStart(2, "0");
const stamp = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

/** .ics for the main ceremony so guests can drop it straight into their calendar. */
function calendarHref() {
  const start = new Date(wedding.date);
  const end = new Date(start.getTime() + 4 * 3600 * 1000);
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding Invitation//EN", "BEGIN:VEVENT",
    `UID:${stamp(start)}@wedding-invitation`, `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
    `SUMMARY:${wedding.groom} weds ${wedding.bride}`,
    `LOCATION:${wedding.venue}\\, ${wedding.address}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;
}

function share() {
  const text = `You're invited to the wedding of ${wedding.groom} & ${wedding.bride}!`;
  if (navigator.share) navigator.share({ title: text, url: location.href }).catch(() => {});
  else window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${location.href}`)}`, "_blank", "noopener");
}

export default function GardenFinale() {
  const btn = "rounded-full px-6 py-3.5 text-xs font-medium";

  return (
    <section className="space-y-12 px-5 pb-12 pt-12">
      <Countdown />

      <section>
        <SectionTitle eyebrow="Where" title="The Venues" />
        <div className="space-y-2.5">
          {venues.map((v) => {
            const vq = encodeURIComponent(v.query);
            return (
              <div key={v.query} className="glass overflow-hidden rounded-2xl p-2 text-center">
                <p className="text-[9px] uppercase tracking-[.3em] text-gold-dark">{v.event}</p>
                <p className="font-serif text-base leading-tight text-maroon-deep">{v.name}</p>
                <p className="mb-1.5 text-[11px] text-maroon/80">{v.address}</p>
                <iframe
                  title={`Map of ${v.name}`}
                  src={`https://www.google.com/maps?q=${vq}&output=embed`}
                  className="h-20 w-full rounded-lg border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
                <a href={`https://www.google.com/maps/search/?api=1&query=${vq}`} target="_blank" rel="noopener noreferrer" className="gold-btn mt-2 inline-block rounded-full px-4 py-1.5 text-[9px] font-medium">OPEN IN GOOGLE MAPS</a>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Keep it close" title="Save & Share" />
        <div className="glass rounded-3xl p-5 text-center">
          <p className="font-serif text-lg text-maroon-deep">{events.map((e) => e.name).join(" · ")}</p>
          <p className="mt-1 text-sm text-maroon/80">Tell family and friends, and add the dates to your calendar.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href={calendarHref()} download="wedding.ics" className={`gold-btn ${btn}`}>ADD TO CALENDAR</a>
            <button type="button" onClick={share} className={`${btn} border border-gold-dark/70 tracking-[.2em] text-maroon-deep`}>SHARE INVITE</button>
          </div>
        </div>
      </section>

      <footer className="text-center">
        <p className="flex items-center justify-center gap-1.5 whitespace-nowrap pt-5 font-script text-[clamp(30px,10.5vw,48px)] leading-[1.5]">
          <span className="gold-text px-1 pt-2"><CapName>{wedding.groom}</CapName></span>
          <span className="text-[.7em] text-ruby drop-shadow-[0_2px_4px_rgba(179,18,46,.35)]" aria-label="and">♥</span>
          <span className="gold-text px-1 pt-2"><CapName>{wedding.bride}</CapName></span>
        </p>
        <p className="mt-2 text-xs font-medium uppercase tracking-[.3em] text-maroon">With love, always</p>
      </footer>
    </section>
  );
}
