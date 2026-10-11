"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import ScratchDate from "@/components/ScratchDate";
import Carousel from "@/components/Carousel";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import Venue from "@/components/Venue";
import DressCode from "@/components/DressCode";
import PreWedding from "@/components/PreWedding";
import Logistics from "@/components/Logistics";
import Rsvp from "@/components/Rsvp";

export default function Page() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="min-h-screen flex justify-center">
      {/* phone-sized column */}
      <div className="relative w-full max-w-[480px] min-h-screen bg-cream shadow-2xl overflow-x-hidden">
        <AnimatePresence>{!opened && <Envelope onOpen={() => setOpened(true)} />}</AnimatePresence>

        {opened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <Hero />
            <Welcome />
            <ScratchDate />
            <Carousel />
            <Countdown />
            <Timeline />
            <Venue />
            <DressCode />
            <PreWedding />
            <Logistics />
            <Rsvp />
            <footer className="py-10 text-center bg-sage-600 text-cream">
              <p className="font-script text-4xl">Zayn &amp; Nora</p>
              <p className="mt-2 text-xs tracking-[.3em] uppercase opacity-80">With love, always</p>
            </footer>
          </motion.div>
        )}
      </div>
    </main>
  );
}
