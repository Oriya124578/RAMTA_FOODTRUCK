"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import SectionReveal from "./SectionReveal";

export default function OurStory() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const rotateBg = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="py-28 md:py-36 bg-ramta-darker relative overflow-hidden"
    >
      {/* Floating decorative ornament */}
      <motion.div
        style={{ rotate: rotateBg }}
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-ramta-bronze/[0.06] blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Images */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, x: 60, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedImage("/assets/images/construction_crane.jpg")}
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl mt-8 cursor-pointer group glow-bronze"
            >
              <Image
                src="/assets/images/construction_crane.jpg"
                alt="הקמת הפודטראק"
                fill
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ramta-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-ramta-bronze/0 group-hover:bg-ramta-bronze/10 transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-ramta-text text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span>הגדל</span>
                <span className="w-8 h-px bg-ramta-wood" />
              </div>
            </motion.div>
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 60, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedImage("/assets/images/pergola_construction.jpg")}
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group glow-bronze"
            >
              <Image
                src="/assets/images/pergola_construction.jpg"
                alt="בניית הפרגולה"
                fill
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ramta-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-ramta-bronze/0 group-hover:bg-ramta-bronze/10 transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-ramta-text text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span>הגדל</span>
                <span className="w-8 h-px bg-ramta-wood" />
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[100] bg-ramta-ink/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-8 right-8 text-ramta-text hover:text-ramta-wood transition-colors z-[110]"
                  aria-label="סגור"
                >
                  <X className="w-8 h-8" />
                </button>
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                  className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl cursor-default border border-ramta-wood/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image src={selectedImage} alt="" fill className="object-contain" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <SectionReveal>
              <span className="block text-xs md:text-sm font-bold text-ramta-wood uppercase tracking-[0.4em] mb-4">
                הסיפור שלנו
              </span>
              <h3 className="text-4xl md:text-6xl font-frank-ruhl font-black text-ramta-text mb-8 leading-[1.1]">
                לא סתם אוכל רחוב.
                <br />
                <span className="gold-shimmer">מסעדת שף מול הנוף.</span>
              </h3>
              <p className="text-ramta-muted text-lg mb-6 leading-relaxed">
                רמתא נולדה מתוך תשוקה לאיכות ללא פשרות. לקחנו את חומרי הגלם הטובים ביותר,
                יישון מוקפד וטכניקות צלייה ועישון מסורתיות, והבאנו אותם אל לב הטבע הפתוח.
              </p>
              <p className="text-ramta-muted text-lg leading-relaxed mb-10">
                כל נתח נבחר בקפידה, כל רוטב נרקח בעבודת יד, וכל מנה שיוצאת מהחלון שלנו נועדה
                לספק חוויה קולינרית בלתי נשכחת. זה המקום שבו הפרימיום פוגש את השטח.
              </p>

              <div className="flex items-center gap-8">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex flex-col"
                >
                  <span className="text-4xl font-frank-ruhl font-black text-ramta-gold tabular-nums">
                    100%
                  </span>
                  <span className="text-sm text-ramta-muted mt-1">נתחי פרימיום מובחרים</span>
                </motion.div>
                <div className="w-px h-14 bg-gradient-to-b from-transparent via-ramta-wood/50 to-transparent" />
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex flex-col"
                >
                  <span className="text-4xl font-frank-ruhl font-black text-ramta-gold tabular-nums">
                    12+
                  </span>
                  <span className="text-sm text-ramta-muted mt-1">שעות עישון איטי</span>
                </motion.div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
