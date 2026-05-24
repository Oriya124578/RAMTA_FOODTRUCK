"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/MagneticButton";

const MENU_CATEGORIES = [
  {
    id: "mains",
    title: "עיקריות פרימיום",
    items: [
      {
        id: "burger-1",
        name: "המבורגר רמתא קלאסי",
        description: "קציצת בקר מובחרת 220 גרם (תערובת סודית), איולי כמהין, רוקט, קורנישונים, ובצל מקורמל בבישול איטי.",
        price: 72,
        image: "/assets/images/gourmet_burger.png",
      },
      {
        id: "brisket-1",
        name: "כריך בריסקט מפורק",
        description: "בריסקט בעישון עמוק של 14 שעות בעצי פקאן, מפורק ומוגש בלחמניית חלה רכה עם ברביקיו ביתי וסלאו תפוחים קריספי.",
        price: 85,
        image: "/assets/images/brisket.png",
      },
      {
        id: "entrecote-1",
        name: "טורטיית אנטריקוט פרימיום",
        description: "נתחי אנטריקוט דקים צרובים על הפלנצ'ה, איולי צ'יפוטלה מעושן, עגבניות צלויות ובצל סגול כבוש.",
        price: 78,
      },
    ],
  },
  {
    id: "sides",
    title: "תוספות",
    items: [
      {
        id: "side-1",
        name: "צ'יפס כמהין ופרמז'ן (טבעוני)",
        description: "תפוחי אדמה פריכים במיוחד, מתובלים בשמן כמהין איכותי, מלח ים אטלנטי ושום קונפי.",
        price: 35,
      },
      {
        id: "side-2",
        name: "טבעות בצל בטמפורה",
        description: "טבעות בצל טריות בבלילת בירה פריכה עם מטבל איולי שום.",
        price: 32,
      },
    ],
  },
];

export default function MenuPage() {
  const { addItem } = useCart();

  return (
    <main className="min-h-screen bg-ramta-dark text-ramta-text font-heebo">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-ramta-wood mb-4">התפריט שלנו</h1>
          <p className="text-ramta-muted text-lg max-w-2xl mx-auto">
            מנות פרימיום מחומרי הגלם האיכותיים ביותר. ניתן להזמין עכשיו ולאסוף ללא המתנה בתור.
          </p>
        </motion.div>

        <div className="space-y-24">
          {MENU_CATEGORIES.map((category, catIndex) => (
            <div key={category.id}>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-ramta-text mb-8 border-b border-ramta-border pb-4"
              >
                {category.title}
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIndex * 0.1 }}
                    className="bg-ramta-darker border border-ramta-border rounded-xl overflow-hidden hover:border-ramta-wood/50 transition-colors flex flex-col md:flex-row h-full group"
                  >
                    {/* Image Area */}
                    <div className="w-full md:w-1/3 h-48 md:h-auto bg-ramta-dark relative overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-ramta-muted text-sm opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                          אין תמונה
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-ramta-text group-hover:text-ramta-wood transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-xl font-black text-ramta-gold">{item.price} ₪</span>
                        </div>
                        <p className="text-ramta-muted text-sm leading-relaxed mb-6">
                          {item.description}
                        </p>
                      </div>
                      
                      <MagneticButton
                        onClick={() => addItem(item)}
                        className="w-full py-3 bg-transparent border-2 border-ramta-wood text-ramta-wood hover:bg-ramta-wood hover:text-ramta-darker font-bold rounded-lg transition-colors mt-auto"
                      >
                        הוסף להזמנה
                      </MagneticButton>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
