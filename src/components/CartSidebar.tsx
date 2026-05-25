"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import { createOrder, updatePaymentStatus } from "@/lib/orders";
import { getPaymentProvider } from "@/lib/payments";
import { isFirebaseConfigured } from "@/lib/firebase";
import toast from "react-hot-toast";

type Step = "cart" | "details" | "paying";

export default function CartSidebar() {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    totalPrice,
    customer,
    setCustomer,
    clearCart,
    setActiveOrderId,
  } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [paymentMethod, setPaymentMethod] = useState<"counter" | "online">("counter");

  const close = () => {
    setIsCartOpen(false);
    setTimeout(() => setStep("cart"), 300);
  };

  const goToDetails = () => {
    if (items.length === 0) return;
    setStep("details");
  };

  const handleCheckout = async () => {
    if (!customer.name.trim() || customer.name.trim().length < 2) {
      toast.error("נא להזין שם");
      return;
    }
    if (!customer.phone.trim() || customer.phone.trim().length < 9) {
      toast.error("נא להזין טלפון תקין");
      return;
    }

    setStep("paying");

    try {
      if (!isFirebaseConfigured) {
        await new Promise((r) => setTimeout(r, 1200));
        toast.success("הזמנה נשלחה (מצב הדגמה — Firebase לא מחובר)");
        clearCart();
        close();
        return;
      }

      const subtotal = totalPrice;
      const total = subtotal;

      const { id: orderId } = await createOrder({
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        subtotal,
        total,
        customerName: customer.name.trim(),
        customerPhone: customer.phone.trim(),
        notes: customer.notes.trim() || undefined,
        paymentProvider: process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || "mock",
      });

      const provider = getPaymentProvider();
      const payment = await provider.init({
        orderId,
        amount: total,
        currency: "ILS",
        customerName: customer.name,
        customerPhone: customer.phone,
        successUrl: `${window.location.origin}/order/status/${orderId}`,
        cancelUrl: window.location.href,
      });

      if (paymentMethod === "online" && payment.redirectUrl) {
        // External gateway flow — gateway will redirect back to successUrl
        // and a webhook (future) will mark the order as paid.
        clearCart();
        setActiveOrderId(orderId);
        close();
        window.location.href = payment.redirectUrl;
        return;
      }

      // Mock / instant-approve flow — mark as paid immediately so admin sees
      // the correct paymentStatus (or pending if pay_at_counter).
      try {
        const finalStatus = paymentMethod === "counter" ? "pending" : "paid";
        await updatePaymentStatus(orderId, finalStatus, payment.transactionId);
      } catch (updErr) {
        console.error("updatePaymentStatus failed (non-fatal):", updErr);
      }

      clearCart();
      setActiveOrderId(orderId);
      close();
      toast.success(paymentMethod === "counter" ? "הזמנה נשלחה בהצלחה!" : "התשלום עבר בהצלחה!");
      router.push(`/order/status/${orderId}`);
    } catch (err) {
      console.error("Checkout failed:", err);
      const msg =
        err instanceof Error
          ? err.message.includes("permission")
            ? "הרשאה נדחתה — בדוק את חוקי Firestore"
            : err.message.includes("undefined")
              ? "שגיאת תקינות נתונים. בדוק את הקונסול."
              : err.message.slice(0, 120)
          : "אירעה שגיאה. נסה שוב.";
      toast.error(msg, { duration: 6000 });
      setStep("details");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-ramta-ink/70 backdrop-blur-md z-[60]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-ramta-char border-l border-ramta-border z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-ramta-border bg-ramta-ink">
              <div className="flex items-center gap-3">
                {step !== "cart" && (
                  <button
                    onClick={() => setStep("cart")}
                    className="p-1 text-ramta-muted hover:text-ramta-text transition-colors"
                    aria-label="חזור"
                  >
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                )}
                <ShoppingBag className="text-ramta-wood w-5 h-5" />
                <h2 className="text-xl font-frank-ruhl font-bold text-ramta-text">
                  {step === "cart" ? "ההזמנה שלי" : step === "details" ? "פרטים" : "מעבד תשלום"}
                </h2>
              </div>
              <button
                onClick={close}
                className="p-2 hover:bg-ramta-border rounded-full transition-colors text-ramta-muted hover:text-ramta-text"
                aria-label="סגור"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {step === "cart" && (
                <>
                  {items.length === 0 ? (
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-ramta-muted">
                      <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                      <p className="text-lg">הסל שלך ריק</p>
                      <button
                        onClick={close}
                        className="mt-6 px-6 py-2 border border-ramta-wood text-ramta-wood rounded-full hover:bg-ramta-wood hover:text-ramta-ink transition-colors"
                      >
                        חזרה לתפריט
                      </button>
                    </div>
                  ) : (
                    items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="border-b border-ramta-border/50 pb-4"
                      >
                        <div className="flex justify-between mb-3">
                          <h4 className="font-bold text-ramta-text">{item.name}</h4>
                          <span className="font-bold text-ramta-gold tabular-nums shrink-0">
                            {item.price * item.quantity} ₪
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-ramta-ink rounded-full p-1 border border-ramta-border">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-ramta-border rounded-full text-ramta-text transition-colors"
                              aria-label="הפחת"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center font-bold text-sm tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-ramta-border rounded-full text-ramta-text transition-colors"
                              aria-label="הוסף"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-ramta-muted hover:text-red-400 transition-colors underline-grow"
                          >
                            הסר
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </>
              )}

              {step === "details" && (
                <div className="space-y-5">
                  <p className="text-sm text-ramta-muted">
                    כמעט סיימנו. נצטרך שם וטלפון כדי לקרוא לך כשההזמנה מוכנה.
                  </p>

                  <Field
                    label="שם מלא"
                    placeholder="הישראלי הראשון"
                    value={customer.name}
                    onChange={(v) => setCustomer({ ...customer, name: v })}
                  />
                  <Field
                    label="טלפון"
                    placeholder="050-0000000"
                    value={customer.phone}
                    onChange={(v) => setCustomer({ ...customer, phone: v })}
                    inputMode="tel"
                    type="tel"
                  />
                  <Field
                    label="הערות (אופציונלי)"
                    placeholder="ללא בצל, מדיום-וול וכו׳"
                    value={customer.notes}
                    onChange={(v) => setCustomer({ ...customer, notes: v })}
                    multiline
                  />

                  <div className="pt-4 border-t border-ramta-border/50 space-y-3">
                    <span className="block text-xs text-ramta-wood uppercase tracking-widest">אמצעי תשלום</span>
                    <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors border-ramta-wood bg-ramta-wood/10">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="counter" 
                        checked={paymentMethod === "counter"} 
                        onChange={() => setPaymentMethod("counter")}
                        className="w-4 h-4 accent-ramta-wood"
                      />
                      <span className="text-ramta-text text-sm">תשלום בקופה בעת האיסוף (אשראי/מזומן/ביט)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl border cursor-not-allowed opacity-50 border-ramta-border bg-ramta-ink">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="online" 
                        checked={paymentMethod === "online"} 
                        disabled
                        className="w-4 h-4 accent-ramta-wood"
                      />
                      <span className="text-ramta-text text-sm flex-1">תשלום באשראי באתר</span>
                      <span className="text-[10px] bg-ramta-border text-ramta-muted px-2 py-0.5 rounded-full">בקרוב</span>
                    </label>
                  </div>
                </div>
              )}

              {step === "paying" && (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-ramta-muted gap-4">
                  <Loader2 className="w-10 h-10 text-ramta-wood animate-spin" />
                  <p className="text-lg">מעבד תשלום…</p>
                </div>
              )}
            </div>

            {items.length > 0 && step !== "paying" && (
              <div className="p-6 bg-ramta-ink border-t border-ramta-border">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm text-ramta-muted">סה״כ לתשלום</span>
                  <span className="text-3xl font-frank-ruhl font-black text-ramta-gold tabular-nums">
                    {totalPrice} ₪
                  </span>
                </div>
                {step === "cart" ? (
                  <button
                    onClick={goToDetails}
                    className="w-full py-4 bg-ramta-wood text-ramta-ink font-black text-lg rounded-full hover:bg-ramta-gold transition-colors glow-bronze"
                  >
                    המשך לפרטים
                  </button>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-ramta-wood text-ramta-ink font-black text-lg rounded-full hover:bg-ramta-gold transition-colors glow-bronze"
                  >
                    {paymentMethod === "counter" ? "שלח הזמנה למטבח" : `שלם ${totalPrice} ₪`}
                  </button>
                )}
                {!isFirebaseConfigured && (
                  <p className="text-[10px] text-ramta-muted mt-3 text-center">
                    מצב הדגמה — Firebase לא מחובר
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "numeric" | "email";
  multiline?: boolean;
}) {
  const cls =
    "w-full px-4 py-3 bg-ramta-ink border border-ramta-border focus:border-ramta-wood text-ramta-text placeholder:text-ramta-muted/50 rounded-xl outline-none transition-colors";
  return (
    <label className="block">
      <span className="block text-xs text-ramta-wood uppercase tracking-widest mb-2">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}
