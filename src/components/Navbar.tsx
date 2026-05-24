"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const { totalItems, setIsCartOpen } = useCart();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.95)"]
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 w-full z-50 border-b border-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-bold text-5xl md:text-6xl text-ramta-wood tracking-wider font-frank-ruhl">
            רַמְתָּא
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 space-x-reverse items-center">
            <Link href="/#story" className="text-ramta-text hover:text-ramta-wood transition-colors font-medium">הסיפור שלנו</Link>
            <Link href="/menu" className="text-ramta-text hover:text-ramta-wood transition-colors font-medium">תפריט והזמנות</Link>
            <Link href="/events" className="text-ramta-text hover:text-ramta-wood transition-colors font-medium">אירועים וקייטרינג</Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-ramta-text hover:text-ramta-wood transition-colors flex items-center"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-ramta-gold text-ramta-darker rounded-full text-xs font-bold flex items-center justify-center -mt-1 -mr-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-ramta-text hover:text-ramta-wood transition-colors flex items-center"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-ramta-gold text-ramta-darker rounded-full text-xs font-bold flex items-center justify-center -mt-1 -mr-1">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ramta-text p-2 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-ramta-darker border-t border-ramta-border"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/#story" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-ramta-text hover:text-ramta-wood hover:bg-ramta-dark rounded-md font-medium">הסיפור שלנו</Link>
            <Link href="/menu" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-ramta-text hover:text-ramta-wood hover:bg-ramta-dark rounded-md font-medium">תפריט והזמנות</Link>
            <Link href="/events" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-ramta-text hover:text-ramta-wood hover:bg-ramta-dark rounded-md font-medium">אירועים וקייטרינג</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
