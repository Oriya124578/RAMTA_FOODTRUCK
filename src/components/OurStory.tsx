"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";

export default function OurStory() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} className="py-24 bg-ramta-darker relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Images Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              onClick={() => setSelectedImage("/assets/images/construction_crane.jpg")}
              className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl mt-8 cursor-pointer group"
            >
              <Image
                src="/assets/images/construction_crane.jpg"
                alt="הקמת הפודטראק"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-bold uppercase tracking-widest drop-shadow-md">הגדל תמונה</span>
              </div>
            </motion.div>
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onClick={() => setSelectedImage("/assets/images/pergola_construction.jpg")}
              className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
            >
              <Image
                src="/assets/images/pergola_construction.jpg"
                alt="בניית הפרגולה"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-bold uppercase tracking-widest drop-shadow-md">הגדל תמונה</span>
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
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
              >
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-8 right-8 text-white hover:text-ramta-wood transition-colors z-[110]"
                >
                  <X className="w-8 h-8" />
                </button>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden shadow-2xl cursor-default border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={selectedImage}
                    alt="תמונה מוגדלת"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold text-ramta-wood uppercase tracking-[0.2em] mb-3">
                הסיפור שלנו
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-ramta-text mb-6 leading-tight">
                לא סתם אוכל רחוב.<br />
                <span className="text-ramta-wood">מסעדת שף ניידת.</span>
              </h3>
              <p className="text-ramta-muted text-lg mb-6 leading-relaxed">
                רמתא נולדה מתוך תשוקה לאיכות ללא פשרות. לקחנו את חומרי הגלם הטובים ביותר, יישון מוקפד וטכניקות צלייה ועישון מסורתיות, והבאנו אותם אל לב הטבע הפתוח. 
              </p>
              <p className="text-ramta-muted text-lg leading-relaxed mb-8">
                כל נתח נבחר בקפידה, כל רוטב נרקח בעבודת יד, וכל מנה שיוצאת מהחלון שלנו נועדה לספק חוויה קולינרית בלתי נשכחת. זה המקום שבו הפרימיום פוגש את השטח.
              </p>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-ramta-gold">100%</span>
                  <span className="text-sm text-ramta-muted">נתחי פרימיום מובחרים</span>
                </div>
                <div className="w-px h-12 bg-ramta-border"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-ramta-gold">12+</span>
                  <span className="text-sm text-ramta-muted">שעות עישון איטי</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
