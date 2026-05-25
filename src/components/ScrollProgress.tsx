"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "right" }}
      className="fixed top-0 inset-x-0 h-[2px] z-[70] bg-gradient-to-l from-ramta-copper via-ramta-gold to-ramta-wood"
      aria-hidden="true"
    />
  );
}
