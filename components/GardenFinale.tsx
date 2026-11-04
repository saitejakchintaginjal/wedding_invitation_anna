"use client";

import CapName from "./CapName";
import Celebrations from "./Celebrations";
import Countdown from "./Countdown";
import Slide from "./Slide";
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
  const btn = "rounded-full px-u22 py-u13 text-u12 font-medium";

  return (
    <>
      <Countdown />

      <Celebrations />

      <Slide tone="blush">
        <SectionTitle eyebrow="Where" title="The Venues" />
        <div className="w-full space-y-u18">
          {venues.map((v) => {
            const vq = encodeURIComponent(v.query);
            return (
              <div key={v.query} className="glass overflow-hidden rounded-u26 p-u14 text-center">
                <p className="text-u10 uppercase tracking-[.3em] text-gold-dark">{v.event}</p>
                <p className="font-serif text-u23 leading-tight text-maroon-deep">{v.name}</p>
                <p className="mb-u10 text-u14 text-maroon/80">{v.address}</p>
                <iframe
                  title={`Map of ${v.name}`}
                  src={`https://www.google.com/maps?q=${vq}&output=embed`}
                  className="h-u150 w-full rounded-u16 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
                <a href={`https://www.google.com/maps/search/?api=1&query=${vq}`} target="_blank" rel="noopener noreferrer" className="gold-btn mt-u12 inline-block rounded-full px-u20 py-u10 text-u12 font-medium">OPEN IN GOOGLE MAPS</a>
              </div>
            );
          })}
        </div>
      </Slide>

      <Slide tone="sand" mandala>
        <SectionTitle eyebrow="Keep it close" title="Save & Share" />
        <div className="glass w-full rounded-u30 p-u28 text-center">
          <p className="font-serif text-u22 text-maroon-deep">{events.map((e) => e.name).join(" · ")}</p>
          <p className="mt-u8 text-u15 leading-snug text-maroon/80">Tell family and friends, and add the dates to your calendar.</p>
          <div className="mt-u18 flex flex-wrap justify-center gap-u12">
            <a href={calendarHref()} download="wedding.ics" className={`gold-btn ${btn}`}>ADD TO CALENDAR</a>
            <button type="button" onClick={share} className={`${btn} border border-gold-dark/70 tracking-[.2em] text-maroon-deep`}>SHARE INVITE</button>
          </div>
        </div>

        <footer className="mt-u44 text-center">
          <p className="flex items-center justify-center gap-u6 whitespace-nowrap pt-u4 font-script text-u42 leading-[1.5]">
            <span className="gold-text px-u4 pt-u8"><CapName>{wedding.groom}</CapName></span>
            <span className="text-[.7em] text-ruby drop-shadow-[0_2px_4px_rgba(179,18,46,.35)]" aria-label="and">♥</span>
            <span className="gold-text px-u4 pt-u8"><CapName>{wedding.bride}</CapName></span>
          </p>
          <p className="mt-u6 text-u12 font-medium uppercase tracking-[.3em] text-maroon">With love, always</p>
        </footer>
      </Slide>
    </>
  );
}
