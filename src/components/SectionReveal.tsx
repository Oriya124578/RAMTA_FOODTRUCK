"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const reduced = useReducedMotion();
  const offset = 32;
  const initial = reduced
    ? { opacity: 0 }
    : direction === "up"
    ? { opacity: 0, y: offset, clipPath: "inset(0 0 100% 0)" }
    : direction === "down"
    ? { opacity: 0, y: -offset, clipPath: "inset(100% 0 0 0)" }
    : direction === "left"
    ? { opacity: 0, x: offset, clipPath: "inset(0 0 0 100%)" }
    : { opacity: 0, x: -offset, clipPath: "inset(0 100% 0 0)" };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
