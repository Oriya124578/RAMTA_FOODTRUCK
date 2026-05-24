"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <Image
          src="/assets/images/scenic_view.jpg"
          alt="RAMTA Foodtruck Scenic View"
          fill
          priority
          className="object-cover opacity-40 mix-blend-overlay"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ramta-dark/80 via-ramta-dark/60 to-ramta-dark z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8 relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-ramta-wood shadow-[0_0_40px_rgba(193,154,107,0.3)]"
        >
          <Image
            src="/assets/images/ramta_logo.jpg"
            alt="רמתא - חוויה קולינרית"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl font-black text-ramta-text mb-4 tracking-tight drop-shadow-lg"
        >
          קולינריית בשרים ניידת
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-2xl text-ramta-muted mb-10 font-light"
        >
          חווית קרניבורים ללא פשרות, מול הנוף הפתוח.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/menu">
            <MagneticButton className="px-8 py-4 bg-ramta-wood hover:bg-ramta-gold text-ramta-darker font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(193,154,107,0.4)]">
              הזמן עכשיו (Takeaway)
            </MagneticButton>
          </Link>
          <Link href="/#location">
            <MagneticButton className="px-8 py-4 bg-transparent border-2 border-ramta-wood hover:bg-ramta-wood/10 text-ramta-wood font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
              איך מגיעים אלינו?
            </MagneticButton>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
