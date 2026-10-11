"use client";

import Countdown from "./Countdown";
import { SectionTitle } from "./Reveal";
import { events, wedding } from "@/lib/config";

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
  const q = encodeURIComponent(wedding.mapsQuery);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const btn = "rounded-full px-6 py-3.5 text-xs font-medium";

  return (
    <section className="space-y-12 px-5 pb-12 pt-12">
      <Countdown />

      <section>
        <SectionTitle eyebrow="Where" title="The Venue" />
        <div className="glass overflow-hidden rounded-3xl p-3 text-center">
          <p className="mt-2 font-serif text-2xl text-maroon-deep">{wedding.venue}</p>
          <p className="mb-3 mt-1 text-sm text-maroon/80">{wedding.address}</p>
          <iframe
            title={`Map of ${wedding.venue}`}
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            className="h-52 w-full rounded-2xl border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
          <a href={mapHref} target="_blank" rel="noopener noreferrer" className={`gold-btn mb-2 mt-4 inline-block ${btn}`}>OPEN IN GOOGLE MAPS</a>
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
        <p className="gold-text font-script text-5xl">{wedding.groom} &amp; {wedding.bride}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[.3em] text-maroon">With love, always</p>
      </footer>
    </section>
  );
}
