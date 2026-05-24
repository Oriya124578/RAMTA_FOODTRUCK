"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Mail, Phone, Calendar } from "lucide-react";
import { useRef } from "react";

export default function EventsPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <main ref={ref} className="min-h-screen bg-ramta-dark text-ramta-text font-heebo">
      <Navbar />

      <div className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-ramta-wood mb-4">אירועים וקייטרינג</h1>
          <p className="text-ramta-muted text-lg max-w-2xl mx-auto">
            הביאו את החוויה של RAMTA לאירוע שלכם. בין אם זה אירוע חברה בטבע או חגיגה פרטית, אנחנו נדאג לבשר המושלם.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Form Area */}
          <div className="w-full lg:w-1/2 bg-ramta-darker p-8 rounded-2xl border border-ramta-border shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-ramta-text">ספרו לנו על האירוע שלכם</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("פנייתך נשלחה בהצלחה! נחזור אליך בהקדם."); }}>
              <div>
                <label className="block text-sm font-medium text-ramta-muted mb-2">שם מלא</label>
                <input type="text" required className="w-full bg-ramta-dark border border-ramta-border rounded-lg px-4 py-3 text-ramta-text focus:outline-none focus:border-ramta-wood transition-colors" placeholder="הכנס שם מלא" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ramta-muted mb-2">טלפון</label>
                  <input type="tel" required className="w-full bg-ramta-dark border border-ramta-border rounded-lg px-4 py-3 text-ramta-text focus:outline-none focus:border-ramta-wood transition-colors" placeholder="050-0000000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ramta-muted mb-2">תאריך משוער</label>
                  <input type="date" className="w-full bg-ramta-dark border border-ramta-border rounded-lg px-4 py-3 text-ramta-text focus:outline-none focus:border-ramta-wood transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ramta-muted mb-2">סוג האירוע</label>
                <select className="w-full bg-ramta-dark border border-ramta-border rounded-lg px-4 py-3 text-ramta-text focus:outline-none focus:border-ramta-wood transition-colors">
                  <option>אירוע חברה / גיבוש</option>
                  <option>חתונה בטבע</option>
                  <option>יום הולדת / חגיגה פרטית</option>
                  <option>אחר</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ramta-muted mb-2">פרטים נוספים</label>
                <textarea rows={4} className="w-full bg-ramta-dark border border-ramta-border rounded-lg px-4 py-3 text-ramta-text focus:outline-none focus:border-ramta-wood transition-colors resize-none" placeholder="ספר לנו על האווירה, מיקום, מס' מוזמנים..."></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-ramta-wood text-ramta-darker font-bold rounded-lg hover:bg-ramta-gold transition-colors">
                שלח פנייה
              </button>
            </form>
          </div>

          {/* Info Area */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(193,154,107,0.1)] border border-ramta-border group">
              <motion.div
                style={{ y }}
                className="absolute inset-0 h-[130%] -top-[15%]"
              >
                <Image src="/assets/images/scenic_view.jpg" alt="אירוע בטבע" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-ramta-wood">למה לבחור בנו?</h3>
              <p className="text-ramta-muted leading-relaxed">
                רמתא מביאה את סטנדרט מסעדת השף ישירות לשטח. אנחנו דואגים להכל - החל מהבשרים האיכותיים ביותר, המעשנה הניידת שלנו שעובדת כל הלילה, ועד צוות מיומן שנותן שירות עם חיוך.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-ramta-border/50">
                <div className="flex items-center gap-4 text-ramta-text">
                  <div className="p-2 bg-ramta-darker rounded-full border border-ramta-wood/30 text-ramta-wood">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>050-1234567 (זמינים גם בוואטסאפ)</span>
                </div>
                <div className="flex items-center gap-4 text-ramta-text">
                  <div className="p-2 bg-ramta-darker rounded-full border border-ramta-wood/30 text-ramta-wood">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>events@ramta-foodtruck.co.il</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
