"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

const MENU_ITEMS = [
  {
    title: "המבורגר רמתא קלאסי",
    description: "קציצת בקר מובחרת 220 גרם (תערובת סודית), איולי כמהין, רוקט, קורנישונים, ובצל מקורמל בבישול איטי.",
    price: "72 ₪",
  },
  {
    title: "כריך בריסקט מפורק",
    description: "בריסקט בעישון עמוק של 14 שעות בעצי פקאן, מפורק ומוגש בלחמניית חלה רכה עם ברביקיו ביתי וסלאו תפוחים קריספי.",
    price: "85 ₪",
  },
  {
    title: "טורטיית אנטריקוט פרימיום",
    description: "נתחי אנטריקוט דקים צרובים על הפלנצ'ה, איולי צ'יפוטלה מעושן, עגבניות צלויות ובצל סגול כבוש.",
    price: "78 ₪",
  },
  {
    title: "צ'יפס כמהין ופרמז'ן (טבעוני)",
    description: "תפוחי אדמה פריכים במיוחד, מתובלים בשמן כמהין איכותי, מלח ים אטלנטי ושום קונפי.",
    price: "35 ₪",
  },
];

export default function MenuPreview() {
  return (
    <section className="py-24 bg-ramta-dark relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ramta-wood/50 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-ramta-wood uppercase tracking-[0.2em] mb-3">
            התפריט שלנו
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-ramta-text">
            קולינריה ברמת שף
          </h3>
          <div className="mt-6 w-24 h-1 bg-ramta-wood mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {MENU_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer p-6 rounded-xl border border-transparent hover:border-ramta-border hover:bg-ramta-darker transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2 border-b border-ramta-border/50 pb-2 group-hover:border-ramta-wood/30 transition-colors">
                <h4 className="text-xl font-bold text-ramta-text group-hover:text-ramta-wood transition-colors">
                  {item.title}
                </h4>
                <span className="text-xl font-bold text-ramta-gold">{item.price}</span>
              </div>
              <p className="text-ramta-muted text-sm leading-relaxed mt-4">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link href="/menu">
            <MagneticButton className="px-10 py-4 bg-transparent border border-ramta-wood text-ramta-wood hover:bg-ramta-wood hover:text-ramta-darker font-bold rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(193,154,107,0.1)] hover:shadow-[0_0_25px_rgba(193,154,107,0.4)]">
              צפה בתפריט המלא והזמן
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
