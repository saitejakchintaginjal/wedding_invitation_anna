"use client";

import { useEffect } from "react";

const DWELL_MS = 4000;       // stay still this long at each slide
const FIRST_MS = 2200;       // first page: ready fires at 7s, the names appear at ~8.2s, so start gliding ~1s after they show
const IDLE_MS = 3500;        // after a touch / tap / scroll, wait this long before carrying on
const SPEED = 70;            // glide speed, in pixels per second
const MIN_GLIDE_MS = 2500;   // never glide faster than this, even over a short distance
const MAX_GLIDE_MS = 16000;
const MAX_STOPS = 3;         // after the guest has stopped it this many times, it stays off for good

/** Pages through the invitation on its own: rest at each slide, glide slowly to the next, repeat. Any touch, tap, wheel or
 *  key press stops it at once; it carries on from where the guest left off after IDLE_MS with no interaction. Starts when the
 *  entrance doors have cleared (the Gate fires "invitation:ready"). */
export default function AutoScroll() {
  useEffect(() => {
    let ready = false;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let gliding = false;
    let lastSet = -1;   // where our own last scroll put the page, so we can tell our scrolling from the guest's

    const maxY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    /** Every place worth resting at: the top of each slide (so only that slide is on screen), plus screen-sized steps inside a slide
     *  that is taller than the screen (a phone turned sideways, for instance), and the very bottom of the page. */
    const stops = () => {
      const vh = window.innerHeight, top = window.scrollY, limit = maxY();
      const slides = Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));
      const ys: number[] = [0];
      slides.forEach((el) => {
        const r = el.getBoundingClientRect();
        const y0 = r.top + top;
        ys.push(y0);
        for (let y = y0 + vh * 0.85; y < y0 + r.height - vh * 0.35; y += vh * 0.85) ys.push(y);
      });
      ys.push(limit);
      const out: number[] = [];
      ys.map((y) => Math.min(limit, Math.max(0, Math.round(y)))).sort((a, b) => a - b).forEach((y) => {
        if (!out.length || y - out[out.length - 1] > 60) out.push(y);
      });
      return out;
    };

    const ease = (p: number) => 0.5 - 0.5 * Math.cos(Math.PI * p);

    const later = (fn: () => void, ms: number) => { clearTimeout(timer); timer = setTimeout(fn, ms); };

    const stopGlide = () => { cancelAnimationFrame(raf); gliding = false; clearIntroWait(); };

    let onIntroEnd: (() => void) | null = null;
    const clearIntroWait = () => { if (onIntroEnd) { window.removeEventListener("invitation:intro-end", onIntroEnd); onIntroEnd = null; } };

    const goNext = () => {
      if (!ready || off || document.hidden) return;
      const from = window.scrollY;
      const target = stops().find((y) => y > from + 24);
      if (target == null) return;                       // already at the end
      const dist = target - from;
      const ms = Math.min(MAX_GLIDE_MS, Math.max(MIN_GLIDE_MS, (dist / SPEED) * 1000));
      const t0 = performance.now();
      gliding = true;
      const step = (now: number) => {
        if (!gliding) return;
        const p = Math.min(1, (now - t0) / ms);
        lastSet = from + dist * ease(p);
        window.scrollTo({ top: lastSet, behavior: "instant" as ScrollBehavior });
        if (p < 1) { raf = requestAnimationFrame(step); return; }
        gliding = false;
        later(goNext, DWELL_MS);                        // rest here before moving on
      };
      raf = requestAnimationFrame(step);
    };

    // each time the guest stops the auto-scroll counts once (a tap fires several events, so only count while it was running);
    // after MAX_STOPS stops they clearly want to scroll themselves, so it never starts again
    let stops_ = 0, paused = false, off = false;
    const resume = () => { paused = false; goNext(); };

    /** The guest touched the page: stop right now and wait for them to leave it alone. */
    const interrupted = () => {
      if (!ready || off) return;
      if (!paused) {
        paused = true;
        if (++stops_ >= MAX_STOPS) { off = true; stopGlide(); clearTimeout(timer); return; }
      }
      stopGlide();
      later(resume, IDLE_MS);
    };

    // a scroll we did not cause (finger drag, fling, scrollbar, keyboard) counts as interaction too
    const onScroll = () => {
      if (!ready || off) return;
      if (Math.abs(window.scrollY - lastSet) < 2.5) return;
      interrupted();
    };
    const onVisibility = () => {
      if (!ready) return;
      if (off) return;
      if (document.hidden) { stopGlide(); clearTimeout(timer); } else later(resume, IDLE_MS);
    };

    const begin = () => { if (ready) return; ready = true; later(goNext, FIRST_MS); };
    // (goNext itself ignores calls once the guest has switched auto-scrolling off)
    if (document.documentElement.classList.contains("gate-done")) begin();
    window.addEventListener("invitation:ready", begin);

    const events: [string, EventListener][] = [
      ["touchstart", interrupted], ["touchend", interrupted], ["touchcancel", interrupted], ["pointerdown", interrupted], ["pointerup", interrupted],
      ["mousedown", interrupted], ["wheel", interrupted], ["keydown", interrupted],
    ];
    events.forEach(([e, fn]) => window.addEventListener(e, fn, { passive: true, capture: true }));
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopGlide(); clearTimeout(timer);
      window.removeEventListener("invitation:ready", begin);
      events.forEach(([e, fn]) => window.removeEventListener(e, fn, { capture: true }));
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
