"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-ramta-darker border-l border-ramta-border z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-ramta-border bg-ramta-dark">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-ramta-wood w-6 h-6" />
                <h2 className="text-2xl font-bold text-ramta-text">ההזמנה שלי</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-ramta-border rounded-full transition-colors text-ramta-muted hover:text-ramta-text"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-ramta-muted">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">הסל שלך ריק כרגע</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2 border border-ramta-wood text-ramta-wood rounded hover:bg-ramta-wood hover:text-ramta-darker transition-colors"
                  >
                    חזרה לתפריט
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-ramta-border/50 pb-6">
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-bold text-ramta-text">{item.name}</h4>
                        <span className="font-bold text-ramta-gold">{item.price * item.quantity} ₪</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-ramta-dark rounded-lg p-1 border border-ramta-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-ramta-border rounded text-ramta-text transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-ramta-border rounded text-ramta-text transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-500 hover:text-red-400 transition-colors"
                        >
                          הסר
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-ramta-dark border-t border-ramta-border">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg text-ramta-muted">סה״כ לתשלום:</span>
                  <span className="text-3xl font-black text-ramta-gold">{totalPrice} ₪</span>
                </div>
                <button 
                  className="w-full py-4 bg-ramta-wood text-ramta-darker font-black text-lg rounded-xl hover:bg-ramta-gold transition-colors shadow-[0_0_20px_rgba(193,154,107,0.3)]"
                  onClick={() => alert("זוהי גרסת תצוגה בלבד - סליקה אמיתית תחובר בהמשך")}
                >
                  מעבר לתשלום (Dummy)
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
