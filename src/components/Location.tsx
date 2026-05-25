"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import SectionReveal from "./SectionReveal";

export default function Location() {
  return (
    <section className="py-28 md:py-36 bg-ramta-dark relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ramta-wood/30 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-1/3 w-[450px] h-[450px] rounded-full bg-ramta-copper/[0.05] blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <SectionReveal>
              <span className="block text-xs md:text-sm font-bold text-ramta-wood uppercase tracking-[0.4em] mb-4" id="location">
                איך מגיעים?
              </span>
              <h3 className="text-4xl md:text-6xl font-frank-ruhl font-black text-ramta-text mb-8 leading-[1.1]">
                הבית של רמתא.
                <br />
                <span className="gold-shimmer">תמיד טרי.</span>
              </h3>
              <p className="text-ramta-muted text-lg mb-12 leading-relaxed">
                המשאית שלנו ממוקמת באופן קבוע בנקודת תצפית מושלמת ב-רמתא ברוכין. אנחנו מזמינים
                אתכם להגיע, להתרווח מול הנוף הפתוח וליהנות מחוויית בשרים ללא פשרות.
              </p>

              <div className="space-y-5">
                <motion.div
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-start gap-5 p-5 rounded-2xl bg-ramta-char border border-ramta-border hover:border-ramta-wood/50 transition-colors duration-300"
                >
                  <div className="bg-ramta-wood/10 p-3 rounded-full text-ramta-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-ramta-text text-xl mb-1">המיקום שלנו</h4>
                    <p className="text-3xl md:text-4xl font-black text-ramta-wood mt-2 mb-3 tracking-tight font-frank-ruhl">
                      רמתא ברוכין
                    </p>
                    <a
                      href="https://waze.com/ul/hsv8yw8hwu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-ramta-text font-medium hover:text-ramta-gold transition-colors inline-flex items-center gap-2 underline-grow"
                    >
                      נווט בוויז ➔
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-start gap-5 p-5 rounded-2xl bg-ramta-char border border-ramta-border hover:border-ramta-wood/50 transition-colors duration-300"
                >
                  <div className="bg-ramta-wood/10 p-3 rounded-full text-ramta-gold shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ramta-text text-lg mb-3">לוח זמנים שבועי</h4>
                    <ul className="text-ramta-muted text-sm space-y-2">
                      <li>
                        <span className="text-ramta-text font-medium text-base">ראשון - חמישי:</span>{" "}
                        <span className="tabular-nums">12:00 - 23:00</span>
                      </li>
                      <li>
                        <span className="text-ramta-text font-medium text-base">שישי:</span> עד הצהריים{" "}
                        <span className="tabular-nums">(09:00 - 14:00)</span>
                      </li>
                      <li>
                        <span className="text-ramta-text font-medium text-base">מוצאי שבת:</span>{" "}
                        <span className="tabular-nums">21:00 - 01:00</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </SectionReveal>
          </div>

          {/* Map */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[400px] md:h-[520px] bg-ramta-char rounded-2xl border border-ramta-border overflow-hidden group glow-bronze"
            >
              <iframe
                src="https://maps.google.com/maps?q=32.081258,35.096705&t=m&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="מפת מיקום רמתא"
                className="absolute inset-0 grayscale contrast-125 opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ramta-wood/20 rounded-2xl" />
              <div className="absolute bottom-6 left-6 z-10">
                <a
                  href="https://waze.com/ul/hsv8yw8hwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-ramta-ink/90 backdrop-blur-md border border-ramta-wood text-ramta-wood rounded-full hover:bg-ramta-wood hover:text-ramta-ink transition-colors font-bold inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  נווט בוויז עכשיו
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
