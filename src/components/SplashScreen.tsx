"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-[#FAF9F6] pointer-events-none"
        >
          <Image 
            src="/assets/images/logo_light.jpg" 
            alt="RAMTA" 
            fill
            priority
            className="object-cover object-center w-full h-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
