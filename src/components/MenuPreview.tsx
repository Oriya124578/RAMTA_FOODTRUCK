"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import Link from "next/link";
import SectionReveal from "./SectionReveal";

const MENU_ITEMS = [
  {
    title: "המבורגר רמתא קלאסי",
    description:
      "קציצת בקר מובחרת 220 גרם (תערובת סודית), איולי כמהין, רוקט, קורנישונים, ובצל מקורמל בבישול איטי.",
    price: "72 ₪",
  },
  {
    title: "כריך בריסקט מפורק",
    description:
      "בריסקט בעישון עמוק של 14 שעות בעצי פקאן, מפורק ומוגש בלחמניית חלה רכה עם ברביקיו ביתי וסלאו תפוחים קריספי.",
    price: "85 ₪",
  },
  {
    title: "טורטיית אנטריקוט פרימיום",
    description:
      "נתחי אנטריקוט דקים צרובים על הפלנצ'ה, איולי צ'יפוטלה מעושן, עגבניות צלויות ובצל סגול כבוש.",
    price: "78 ₪",
  },
  {
    title: "צ'יפס כמהין ופרמז'ן (טבעוני)",
    description:
      "תפוחי אדמה פריכים במיוחד, מתובלים בשמן כמהין איכותי, מלח ים אטלנטי ושום קונפי.",
    price: "35 ₪",
  },
];

export default function MenuPreview() {
  return (
    <section className="py-28 md:py-36 bg-ramta-dark relative overflow-hidden">
      {/* Background ornament */}
      <div className="pointer-events-none absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-ramta-bronze/5 blur-3xl" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ramta-wood/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative">
        <SectionReveal className="text-center mb-20">
          <span className="block text-xs md:text-sm font-bold text-ramta-wood uppercase tracking-[0.4em] mb-4">
            התפריט שלנו
          </span>
          <h3 className="text-4xl md:text-6xl font-frank-ruhl font-black text-ramta-text leading-tight">
            קולינריה <span className="gold-shimmer">ברמת שף</span>
          </h3>
          <div className="mt-8 mx-auto w-px h-12 bg-gradient-to-b from-ramta-wood to-transparent" />
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
          {MENU_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: index * 0.08,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer p-6 rounded-2xl border border-ramta-border/60 hover:border-ramta-wood/60 bg-ramta-char/40 hover:bg-ramta-char transition-all duration-500"
            >
              <div className="flex justify-between items-start gap-4 mb-3 pb-3 border-b border-ramta-border/50 group-hover:border-ramta-wood/30 transition-colors">
                <h4 className="text-xl md:text-2xl font-frank-ruhl font-bold text-ramta-text group-hover:text-ramta-wood transition-colors">
                  {item.title}
                </h4>
                <span className="text-xl font-bold text-ramta-gold tabular-nums shrink-0">
                  {item.price}
                </span>
              </div>
              <p className="text-ramta-muted text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="mt-4 h-px bg-gradient-to-l from-ramta-wood/0 via-ramta-wood/30 to-ramta-wood/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right" />
            </motion.div>
          ))}
        </div>

        <SectionReveal delay={0.2} className="mt-20 flex justify-center">
          <Link href="/menu">
            <MagneticButton className="group relative overflow-hidden px-12 py-4 bg-transparent border border-ramta-wood text-ramta-wood hover:text-ramta-ink font-bold rounded-full transition-colors duration-300">
              <span className="relative z-10">צפה בתפריט המלא והזמן</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-ramta-wood translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
              />
            </MagneticButton>
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
