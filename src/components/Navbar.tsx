"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Clock } from "lucide-react";

const LINKS = [
  { href: "/#story", label: "הסיפור שלנו" },
  { href: "/menu", label: "תפריט והזמנות" },
  { href: "/events", label: "אירועים וקייטרינג" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const { totalItems, setIsCartOpen, activeOrderId } = useCart();
  const backgroundColor = useTransform(
    scrollY,
    [0, 120],
    ["rgba(10, 8, 7, 0)", "rgba(10, 8, 7, 0.85)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(14px)"]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 120], [1, 0.88]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 w-full z-50 transition-colors duration-300"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-ramta-wood/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo — keeps original Frank Ruhl font, only scales with scroll */}
          <Link
            href="/"
            className="flex-shrink-0 font-bold text-3xl sm:text-4xl md:text-5xl text-ramta-wood tracking-wider font-frank-ruhl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ramta-wood/50 rounded-md"
            aria-label="רמתא — דף הבית"
          >
            <motion.span
              style={{ scale: logoScale, transformOrigin: "right center", display: "inline-block" }}
              whileHover={{ letterSpacing: "0.12em" }}
              transition={{ duration: 0.4 }}
            >
              רַמְתָּא
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm tracking-wide text-ramta-text/85 hover:text-ramta-wood transition-colors font-medium underline-grow"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {activeOrderId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Link
                  href={`/order/status/${activeOrderId}`}
                  className="flex items-center gap-2 text-sm tracking-wide bg-ramta-wood/10 border border-ramta-wood text-ramta-gold px-3 py-1.5 rounded-full hover:bg-ramta-wood hover:text-ramta-ink transition-colors font-bold"
                >
                  <Clock className="w-4 h-4" />
                  מעקב הזמנה
                </Link>
              </motion.div>
            )}

            <motion.button
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="relative p-2 text-ramta-text hover:text-ramta-wood transition-colors"
              aria-label="עגלת קניות"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-ramta-gold text-ramta-ink rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3">
            {activeOrderId && (
              <Link
                href={`/order/status/${activeOrderId}`}
                className="text-ramta-gold border border-ramta-wood bg-ramta-wood/10 rounded-full p-2 hover:bg-ramta-wood hover:text-ramta-ink transition-colors"
                aria-label="מעקב הזמנה"
              >
                <Clock className="w-5 h-5" />
              </Link>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-ramta-text hover:text-ramta-wood transition-colors"
              aria-label="עגלת קניות"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-ramta-gold text-ramta-ink rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ramta-text p-2"
              aria-label="תפריט"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-ramta-ink/95 backdrop-blur-xl border-t border-ramta-border"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {activeOrderId && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Link
                    href={`/order/status/${activeOrderId}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-4 text-ramta-gold hover:text-ramta-ink hover:bg-ramta-wood rounded-md font-bold border-b border-ramta-wood/40 bg-ramta-wood/10"
                  >
                    <Clock className="w-5 h-5" />
                    מעקב הזמנה פעילה
                  </Link>
                </motion.div>
              )}
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 text-ramta-text hover:text-ramta-wood hover:bg-ramta-char rounded-md font-medium border-b border-ramta-border/40"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
