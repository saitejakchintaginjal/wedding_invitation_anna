"use client";

import { useEffect } from "react";

const DWELL_MS = 4000;       // stay still this long at each section
const IDLE_MS = 3500;        // after a touch / tap / scroll, wait this long before carrying on
const SPEED = 70;            // glide speed, in pixels per second
const MIN_GLIDE_MS = 2500;   // never glide faster than this, even over a short distance
const MAX_GLIDE_MS = 16000;

/** Pages through the invitation on its own: rest at each section, glide slowly to the next, repeat. Any touch, tap, wheel or
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

    /** Every place worth resting at: the top of each section, plus extra stops inside sections taller than the screen. */
    const stops = () => {
      const vh = window.innerHeight, top = window.scrollY, limit = maxY();
      const blocks = Array.from(document.querySelectorAll<HTMLElement>("main section, main footer")).filter((el) => !el.querySelector("section") && !el.hasAttribute("data-autoscroll-skip")); // sections marked data-autoscroll-skip are scrolled past, never rested at
      // places a section asks for explicitly (data-autoscroll-stop), e.g. a photo that should get its own pause
      // the value is how far above the element to rest, as a fraction of the screen height (empty = 40px)
      const marked = Array.from(document.querySelectorAll<HTMLElement>("[data-autoscroll-stop]")).map((el) => {
        const f = parseFloat(el.dataset.autoscrollStop || "");
        const elTop = el.getBoundingClientRect().top + top;
        let y = elTop - (f > 0 ? f * vh : 40);
        // data-autoscroll-until="#id": also bring the bottom of that element into view, scrolling further if the screen is short
        // (but never so far that more than 120px of the top of this element is cut off)
        const end = el.dataset.autoscrollUntil ? document.querySelector(el.dataset.autoscrollUntil) : null;
        if (end) y = Math.min(Math.max(y, end.getBoundingClientRect().bottom + top - vh + 16), elTop + 120);
        return y;
      });
      const ys: number[] = [0, ...marked];
      blocks.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const y0 = r.top + top - 14, h = r.height;
        ys.push(y0);
        // a long section is shown in screen-sized steps so none of it goes by unseen (skipping any step that lands next to a marked stop)
        for (let y = y0 + vh * 0.82; y < y0 + h - vh * 0.45; y += vh * 0.82) if (marked.every((m) => Math.abs(m - y) > vh * 0.4)) ys.push(y);
        if (i === blocks.length - 1) ys.push(limit);
      });
      const out: number[] = [];
      ys.map((y) => Math.min(limit, Math.max(0, Math.round(y)))).sort((a, b) => a - b).forEach((y) => {
        if (!out.length || y - out[out.length - 1] > 80) out.push(y);
      });
      return out;
    };

    const ease = (p: number) => 0.5 - 0.5 * Math.cos(Math.PI * p);

    const later = (fn: () => void, ms: number) => { clearTimeout(timer); timer = setTimeout(fn, ms); };

    const stopGlide = () => { cancelAnimationFrame(raf); gliding = false; clearIntroWait(); };

    let onIntroEnd: (() => void) | null = null;
    const clearIntroWait = () => { if (onIntroEnd) { window.removeEventListener("invitation:intro-end", onIntroEnd); onIntroEnd = null; } };

    const goNext = () => {
      if (!ready || document.hidden) return;
      // the opening music is still playing: stay on this page until it has finished
      if (document.documentElement.dataset.intro === "playing") {
        clearIntroWait();
        onIntroEnd = () => { onIntroEnd = null; later(goNext, 600); };
        window.addEventListener("invitation:intro-end", onIntroEnd, { once: true });
        later(goNext, 20000);                           // safety net: never wait more than 20s
        return;
      }
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

    /** The guest touched the page: stop right now and wait for them to leave it alone. */
    const interrupted = () => {
      if (!ready) return;
      stopGlide();
      later(goNext, IDLE_MS);
    };

    // a scroll we did not cause (finger drag, fling, scrollbar, keyboard) counts as interaction too
    const onScroll = () => {
      if (!ready) return;
      if (Math.abs(window.scrollY - lastSet) < 2.5) return;
      interrupted();
    };
    const onVisibility = () => {
      if (!ready) return;
      if (document.hidden) { stopGlide(); clearTimeout(timer); } else later(goNext, IDLE_MS);
    };

    const begin = () => { if (ready) return; ready = true; later(goNext, DWELL_MS); };
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
