/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { fetchMenu } from "@/lib/menu";
import MagneticButton from "@/components/MagneticButton";
import SectionReveal from "@/components/SectionReveal";
import type { MenuCategory, MenuItem } from "@/lib/firestore-types";
import { Loader2 } from "lucide-react";

const TAG_LABELS: Record<string, { label: string; color: string }> = {
  vegan:         { label: "טבעוני",       color: "bg-green-900/30 text-green-300 border-green-800/40" },
  vegetarian:    { label: "צמחוני",       color: "bg-emerald-900/30 text-emerald-300 border-emerald-800/40" },
  spicy:         { label: "חריף",         color: "bg-red-900/30 text-red-300 border-red-800/40" },
  "gluten-free": { label: "ללא גלוטן",     color: "bg-amber-900/30 text-amber-300 border-amber-800/40" },
  signature:     { label: "מנת הבית",     color: "bg-ramta-wood/15 text-ramta-wood border-ramta-wood/30" },
  premium:       { label: "פרימיום",      color: "bg-ramta-gold/15 text-ramta-gold border-ramta-gold/30" },
};

export default function MenuView() {
  const { addItem } = useCart();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"firestore" | "seed">("seed");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchMenu().then((res) => {
      setCategories(res.categories.filter((c) => c.active).sort((a, b) => a.order - b.order));
      setItems(res.items.filter((i) => i.available));
      setSource(res.source);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!activeCategory && categories[0]) setActiveCategory(categories[0].id);
  }, [categories, activeCategory]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-ramta-muted">
        <Loader2 className="w-8 h-8 animate-spin text-ramta-wood" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-frank-ruhl font-black text-ramta-text mb-4">
          התפריט <span className="gold-shimmer">שלנו</span>
        </h1>
        <p className="text-ramta-muted text-lg max-w-2xl mx-auto">
          מנות פרימיום מחומרי הגלם האיכותיים ביותר. הזמן כאן, ואיסוף מהדלפק כשנקרא לך.
        </p>
        {source === "seed" && (
          <p className="text-xs text-ramta-muted/60 mt-3">
            תפריט הדגמה — יוחלף בנתונים חיים מ-Firestore לאחר חיבור.
          </p>
        )}
      </motion.div>

      <div className="sticky top-20 z-30 -mx-4 px-4 mb-12 py-1 backdrop-blur-xl bg-ramta-ink/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
        <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-ramta-wood text-ramta-ink"
                  : "bg-ramta-char text-ramta-muted hover:text-ramta-text border border-ramta-border"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-20">
        {categories.map((category) => {
          const catItems = items.filter((i) => i.categoryId === category.id);
          if (catItems.length === 0) return null;
          return (
            <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-40">
              <SectionReveal>
                <h2 className="text-3xl md:text-5xl font-frank-ruhl font-black text-ramta-text mb-2">
                  {category.name}
                </h2>
                <div className="h-px w-24 bg-gradient-to-l from-ramta-wood to-transparent mb-8" />
              </SectionReveal>

              <div className="grid md:grid-cols-2 gap-6">
                {catItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: idx * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-ramta-char border border-ramta-border rounded-2xl overflow-hidden hover:border-ramta-wood/50 transition-all duration-500 flex flex-col md:flex-row group"
                  >
                    <div className="w-full md:w-2/5 h-44 md:h-auto bg-ramta-ink relative overflow-hidden shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-ramta-muted/40 text-xs">
                          <div className="w-20 h-20 rounded-full border border-ramta-border flex items-center justify-center font-frank-ruhl text-ramta-wood/40 text-2xl">
                            רמתא
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ramta-ink/40 to-transparent" />
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <h3 className="text-xl font-frank-ruhl font-bold text-ramta-text group-hover:text-ramta-wood transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-xl font-black text-ramta-gold tabular-nums shrink-0">
                            {item.price} ₪
                          </span>
                        </div>
                        <p className="text-ramta-muted text-sm leading-relaxed mb-3">
                          {item.description}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => {
                              const meta = TAG_LABELS[tag];
                              if (!meta) return null;
                              return (
                                <span
                                  key={tag}
                                  className={`text-[10px] px-2 py-0.5 rounded-full border ${meta.color}`}
                                >
                                  {meta.label}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <MagneticButton
                        onClick={() =>
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        }
                        className="w-full py-3 bg-transparent border border-ramta-wood text-ramta-wood hover:bg-ramta-wood hover:text-ramta-ink font-bold rounded-full transition-colors"
                      >
                        הוסף להזמנה
                      </MagneticButton>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
