"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";

export default function Location() {
  return (
    <section className="py-24 bg-ramta-darker relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ramta-border to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold text-ramta-wood uppercase tracking-[0.2em] mb-3" id="location">
                איך מגיעים?
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-ramta-text mb-6">
                הבית של רמתא.<br/>תמיד טרי.
              </h3>
              <p className="text-ramta-muted text-lg mb-10">
                המשאית שלנו ממוקמת באופן קבוע בנקודת תצפית מושלמת ב-רמתא ברוכין. אנחנו מזמינים אתכם להגיע, להתרווח מול הנוף הפתוח וליהנות מחוויית בשרים ללא פשרות.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-ramta-dark border border-ramta-border hover:border-ramta-wood/50 transition-colors">
                  <div className="bg-ramta-wood/10 p-3 rounded-full text-ramta-gold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ramta-text text-xl mb-1">המיקום שלנו:</h4>
                    <p className="text-3xl md:text-4xl font-black text-ramta-wood mt-2 mb-3 tracking-tight font-frank-ruhl">רמתא ברוכין</p>
                    <a href="https://waze.com/ul/hsv8yw8hwu" target="_blank" rel="noopener noreferrer" className="text-lg text-white font-medium hover:text-ramta-gold transition-colors inline-flex items-center gap-2">נווט בוויז ➔</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-ramta-dark border border-ramta-border hover:border-ramta-wood/50 transition-colors">
                  <div className="bg-ramta-wood/10 p-3 rounded-full text-ramta-gold">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ramta-text text-lg mb-1">לוח זמנים שבועי</h4>
                    <ul className="text-ramta-muted text-sm space-y-2">
                      <li><span className="text-ramta-text font-medium text-base">ראשון - חמישי:</span> 12:00 - 23:00</li>
                      <li><span className="text-ramta-text font-medium text-base">שישי:</span> עד הצהריים (09:00 - 14:00)</li>
                      <li><span className="text-ramta-text font-medium text-base">מוצאי שבת:</span> 21:00 - 01:00</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map placeholder */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[400px] md:h-[500px] bg-ramta-dark rounded-xl border-2 border-ramta-border overflow-hidden group"
            >
              {/* Interactive Map */}
              <iframe
                src="https://maps.google.com/maps?q=32.081258,35.096705&t=m&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                <a href="https://waze.com/ul/hsv8yw8hwu" target="_blank" rel="noopener noreferrer" className="pointer-events-auto px-6 py-3 bg-ramta-darker border-2 border-ramta-wood text-ramta-wood rounded-lg hover:bg-ramta-wood hover:text-ramta-darker transition-colors font-bold shadow-2xl flex items-center gap-2 shadow-[0_0_20px_rgba(193,154,107,0.3)]">
                  <MapPin className="w-5 h-5" />
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
