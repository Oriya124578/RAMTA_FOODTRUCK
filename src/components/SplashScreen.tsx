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
          className="fixed inset-0 z-[100] bg-[#FAF9F6] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              filter: "blur(0px)",
              transition: { duration: 1, ease: "easeOut" }
            }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)", transition: { duration: 0.8 } }}
            className="relative w-64 h-64 md:w-96 md:h-96"
          >
            {/* We use the light logo as requested by the user, but since the background is dark, we can try to blend it or use it as is. 
                Wait, the light logo has a light background. If we use it on a dark background, it might look like a block. 
                Let's use the dark wood one for the dark splash screen, or keep a light background splash screen for the light logo.
                Let's make the splash screen match the logo's background color (#F6F5EE approximately). */}
            <Image 
              src="/assets/images/logo_light.jpg" 
              alt="RAMTA" 
              fill 
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
