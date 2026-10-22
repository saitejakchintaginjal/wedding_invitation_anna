"use client";

import { useEffect, useRef, useState } from "react";

/** Plays once, right after the entrance is tapped, then melts into the main track. */
const INTRO_SRC = "/music/Soulful_Contemporary_Intro.mp3";
/** The regular wedding music; loops for as long as the page is open. */
const MAIN_SRC = "/music/Under_the_Marigold_Canopy.mp3";

const VOLUME = 0.55;        // overall loudness (0 to 1)
const START_FADE = 1.2;     // seconds to fade the very first sound in
const CROSSFADE = 4.5;      // seconds over which the intro hands over to the main track
const MUTE_FADE = 0.6;      // seconds for the mute button to fade out / in

/** Wedding music. Phones only allow sound after a tap, so it starts when the entrance is tapped (Gate fires the
 *  "invitation:open" event). The intro and main tracks are blended with an equal-power crossfade, driven every frame from
 *  the intro's own clock so the handover stays smooth. A round button lets guests mute it. */
export default function MusicPlayer() {
  const intro = useRef<HTMLAudioElement>(null);
  const main = useRef<HTMLAudioElement>(null);
  const [introOk, setIntroOk] = useState(true);
  const [mainOk, setMainOk] = useState(true);
  const [playing, setPlaying] = useState(false);

  const phase = useRef<"idle" | "intro" | "main">("idle");
  const master = useRef({ level: 0, target: 0 });   // mute / unmute fade
  const raf = useRef(0);
  const last = useRef(0);
  const wantPlay = useRef(false);

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  // Sets both volumes for this frame.
  const tick = (now: number) => {
    raf.current = requestAnimationFrame(tick);
    const dt = Math.min(0.1, (now - last.current) / 1000); last.current = now;
    const m = master.current;
    m.level += Math.sign(m.target - m.level) * Math.min(Math.abs(m.target - m.level), dt / MUTE_FADE);

    const a = intro.current, b = main.current;
    let iv = 0, mv = 0;
    if (phase.current === "intro" && a) {
      const t = a.currentTime, d = a.duration || 0;
      const cs = Math.max(START_FADE, d - CROSSFADE);
      if (t < cs) {
        iv = clamp(t / START_FADE);
      } else {
        const p = clamp((t - cs) / (d - cs));
        iv = Math.cos(p * Math.PI / 2);   // equal-power curves keep the loudness steady through the blend
        mv = Math.sin(p * Math.PI / 2);
        if (b && b.paused && wantPlay.current && m.target > 0) b.play().catch(() => {});
      }
      if (a.ended || (d && t >= d - 0.02)) phase.current = "main";
    } else if (phase.current === "main" && b) {
      mv = 1;
    }
    if (a) a.volume = clamp(iv * VOLUME * m.level);
    if (b) b.volume = clamp(mv * VOLUME * m.level);

    // fully muted: stop the clocks so nothing keeps running in the background
    if (m.target === 0 && m.level === 0) {
      a?.pause(); b?.pause();
      cancelAnimationFrame(raf.current); raf.current = 0;
    }
  };

  const loop = () => { if (!raf.current) { last.current = performance.now(); raf.current = requestAnimationFrame(tick); } };

  const play = () => {
    const a = intro.current, b = main.current;
    wantPlay.current = true;
    master.current.target = 1;
    const resume = phase.current !== "idle";
    // start (or resume) whichever track is current
    if (!resume) phase.current = introOk && a ? "intro" : "main";
    const cur = phase.current === "intro" ? a : b;
    if (!cur) return;
    cur.volume = 0;
    cur.play()
      .then(() => { setPlaying(true); loop(); })
      .catch(() => {
        // intro could not play: fall straight through to the main track
        if (phase.current === "intro") { setIntroOk(false); phase.current = "main"; b?.play().then(() => { setPlaying(true); loop(); }).catch(() => { wantPlay.current = false; setPlaying(false); }); }
        else { wantPlay.current = false; setPlaying(false); }
      });
    // when the main track has already begun blending, resume it too
    if (phase.current === "intro" && a && b && a.currentTime >= Math.max(START_FADE, (a.duration || 0) - CROSSFADE)) b.play().catch(() => {});
  };

  const pause = () => { wantPlay.current = false; master.current.target = 0; loop(); setPlaying(false); };

  useEffect(() => {
    // the load can fail before React attaches onError, so also ask the elements directly
    const check = () => {
      const a = intro.current, b = main.current;
      if (a && (a.error || a.networkState === a.NETWORK_NO_SOURCE)) setIntroOk(false);
      if (b && (b.error || b.networkState === b.NETWORK_NO_SOURCE)) setMainOk(false);
    };
    const t = setTimeout(check, 1500);
    const onOpen = () => play();
    window.addEventListener("invitation:open", onOpen);
    // pause when the page is hidden (switching apps / locking the phone) and carry on when it returns
    const onVis = () => {
      if (document.hidden) { intro.current?.pause(); main.current?.pause(); }
      else if (wantPlay.current) {
        const cur = phase.current === "intro" ? intro.current : main.current;
        cur?.play().catch(() => {});
        if (phase.current === "intro" && main.current && main.current.currentTime > 0) main.current.play().catch(() => {}); // mid-crossfade
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => { clearTimeout(t); window.removeEventListener("invitation:open", onOpen); document.removeEventListener("visibilitychange", onVis); cancelAnimationFrame(raf.current); raf.current = 0; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const anyTrack = introOk || mainOk;

  return (
    <>
      <audio ref={intro} src={INTRO_SRC} preload="auto" onError={() => setIntroOk(false)} />
      <audio ref={main} src={MAIN_SRC} loop preload="auto" onError={() => setMainOk(false)} />
      {anyTrack && (
        <button
          type="button"
          onClick={() => (playing ? pause() : play())}
          aria-label={playing ? "Mute the music" : "Play the music"}
          className="fixed bottom-4 right-4 z-[45] flex h-11 w-11 items-center justify-center rounded-full border border-gold-dark/60 bg-ivory/90 text-maroon shadow-[0_4px_14px_rgba(90,30,20,.35)] backdrop-blur"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" />
              <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" />
              <path d="M16 9.5l5 5M21 9.5l-5 5" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
