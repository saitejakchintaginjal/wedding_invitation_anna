"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal, { SectionTitle } from "./Reveal";

const field =
  "w-full rounded-xl border border-sage-200 bg-cream px-4 py-3 text-sage-800 placeholder:text-sage-400 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

export default function Rsvp() {
  const [sent, setSent] = useState(false);
  const [attending, setAttending] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("RSVP", data); // TODO: POST to your API / form service
    setSent(true);
  };

  return (
    <section className="bg-sage-100 px-6 py-16">
      <SectionTitle eyebrow="Kindly reply" title="RSVP" />
      <Reveal>
        <div className="rounded-2xl border border-gold/50 bg-cream p-6 shadow-lg">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                <p className="text-4xl">💌</p>
                <p className="font-script text-4xl gold-text mt-3">Thank you!</p>
                <p className="mt-2 text-sm text-sage-800/80">
                  {attending === "no" ? "We'll miss you, and appreciate you letting us know." : "We can't wait to celebrate with you."}
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="space-y-4">
                <label className="block">
                  <span className="mb-1 block text-[11px] tracking-[.25em] uppercase text-gold-dark">Guest name(s)</span>
                  <input name="name" required placeholder="e.g. Sara & Omar Khan" className={field} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] tracking-[.25em] uppercase text-gold-dark">Email</span>
                  <input name="email" type="email" required placeholder="you@example.com" className={field} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] tracking-[.25em] uppercase text-gold-dark">Will you be attending?</span>
                  <select name="attending" required value={attending} onChange={(e) => setAttending(e.target.value)} className={field}>
                    <option value="" disabled>Select…</option>
                    <option value="yes">Yes, with pleasure</option>
                    <option value="no">Regretfully, no</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] tracking-[.25em] uppercase text-gold-dark">Message</span>
                  <textarea name="message" rows={4} placeholder="Share your wishes for the couple…" className={`${field} resize-none`} />
                </label>
                <motion.button whileTap={{ scale: 0.97 }} type="submit"
                  className="gold-btn w-full rounded-full py-4 text-xs font-medium">
                  SEND RSVP
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
