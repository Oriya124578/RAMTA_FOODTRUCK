"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import AppEntry from "./AppEntry";
import { ChevronDown } from "lucide-react";

const HEADING = "קולינריית בשרים מעושנים";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Stagger letter-by-letter reveal (Hebrew works fine as plain string split)
  const letters = HEADING.split("");

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-ramta-ink"
    >
      {/* Background image with Ken Burns + parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0 h-[120%] -top-[10%]"
      >
        <div className={`absolute inset-0 ${reduced ? "" : "ken-burns"}`}>
          <Image
            src="/assets/images/scenic_view.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
      </motion.div>

      {/* Smoke gradient layer */}
      <div className="absolute inset-0 z-[1] smoke-bg" aria-hidden="true" />

      {/* Tonal wash — pushes blacks deeper */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-ramta-ink/70 via-ramta-ink/40 to-ramta-ink" />

      {/* Decorative horizontal hairlines */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 z-[3] h-px bg-gradient-to-r from-transparent via-ramta-wood/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-1/4 z-[3] h-px bg-gradient-to-r from-transparent via-ramta-wood/20 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto"
      >
        {/* Logo medallion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 relative"
        >
          <div className="absolute inset-0 -m-4 rounded-full bg-ramta-wood/10 blur-2xl" aria-hidden="true" />
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden ring-1 ring-ramta-wood/40 shadow-[0_30px_80px_-20px_rgba(184,115,51,0.5),inset_0_0_0_1px_rgba(245,235,220,0.08)]">
            <Image
              src="/assets/images/ramta_logo.jpg"
              alt="רמתא"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ramta-ink/40 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs md:text-sm tracking-[0.5em] text-ramta-wood/80 mb-6 uppercase"
        >
          RAMTA · רמתא
        </motion.span>

        {/* Heading with letter stagger */}
        <h1 className="text-4xl md:text-7xl font-frank-ruhl font-black text-ramta-text mb-6 tracking-tight leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
          <span className="inline-block" aria-label={HEADING}>
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + i * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block whitespace-pre"
                aria-hidden="true"
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="text-lg md:text-2xl text-ramta-muted mb-12 font-light max-w-2xl"
        >
          חווית קרניבורים ללא פשרות, מול הנוף הפתוח.
        </motion.p>

        {/* App entry — calori-style: web app / PWA install / stores */}
        <div className="w-full">
          <AppEntry />
        </div>

        {/* Tiny secondary link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2 }}
          className="mt-6"
        >
          <Link
            href="/#location"
            className="text-xs text-ramta-muted hover:text-ramta-wood transition-colors underline-grow tracking-wide"
          >
            איך מגיעים אלינו?
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-ramta-wood/60"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
