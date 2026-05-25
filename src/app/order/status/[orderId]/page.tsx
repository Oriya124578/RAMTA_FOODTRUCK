"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { subscribeToOrder, formatOrderTime } from "@/lib/orders";
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS } from "@/lib/firestore-types";
import type { Order } from "@/lib/firestore-types";
import { isFirebaseConfigured } from "@/lib/firebase";
import { Check, Loader2, Flame, ChefHat, Bell, PackageCheck } from "lucide-react";

const STEP_ICONS: Record<string, React.ElementType> = {
  received:   ChefHat,
  preparing:  Flame,
  ready:      Bell,
  delivered:  PackageCheck,
};

export default function OrderStatusPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsub = subscribeToOrder(orderId, (o) => {
      setOrder(o);
      setLoading(false);
    });
    return unsub;
  }, [orderId]);

  return (
    <main className="min-h-screen bg-ramta-ink text-ramta-text font-heebo">
      <Navbar />

      <div className="pt-32 pb-24 px-4 md:px-8 max-w-3xl mx-auto">
        {loading && (
          <div className="min-h-[40vh] flex items-center justify-center text-ramta-muted">
            <Loader2 className="w-8 h-8 animate-spin text-ramta-wood" />
          </div>
        )}

        {!loading && !isFirebaseConfigured && (
          <EmptyState
            title="מצב הדגמה"
            message="הזמנות חיות זמינות לאחר חיבור Firebase. ראה FIREBASE_SETUP.md."
          />
        )}

        {!loading && isFirebaseConfigured && !order && (
          <EmptyState
            title="ההזמנה לא נמצאה"
            message="ייתכן שהקישור שגוי או שההזמנה נמחקה."
          />
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block text-xs text-ramta-wood uppercase tracking-[0.4em] mb-3">
                הזמנה מס׳
              </div>
              <div className="font-frank-ruhl text-6xl md:text-8xl font-black text-ramta-text tabular-nums mb-3">
                #{order.shortId}
              </div>
              <p className="text-ramta-muted text-lg">
                {order.customerName}
              </p>
              <p className="text-xs text-ramta-muted/60 mt-1">
                המטבח יקרא לך בשם + מספר הזמנה כשמוכן
              </p>
            </div>

            {/* Stepper */}
            <div className="bg-ramta-char border border-ramta-border rounded-3xl p-6 md:p-10 mb-8">
              <div className="flex justify-between items-start relative">
                {/* Progress line */}
                <div className="absolute top-7 right-7 left-7 h-px bg-ramta-border" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      ORDER_STATUS_FLOW.indexOf(order.status) === -1
                        ? "0%"
                        : `${(ORDER_STATUS_FLOW.indexOf(order.status) / (ORDER_STATUS_FLOW.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-7 right-7 h-px bg-gradient-to-l from-ramta-wood to-ramta-gold"
                  style={{ maxWidth: "calc(100% - 56px)" }}
                />

                {ORDER_STATUS_FLOW.map((status, idx) => {
                  const current = ORDER_STATUS_FLOW.indexOf(order.status);
                  const active = idx <= current;
                  const isCurrent = idx === current;
                  const Icon = STEP_ICONS[status];

                  return (
                    <div key={status} className="flex flex-col items-center gap-2 relative z-10 flex-1">
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.08, 1] } : {}}
                        transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                          active
                            ? "bg-ramta-wood text-ramta-ink shadow-[0_0_20px_rgba(184,115,51,0.5)]"
                            : "bg-ramta-ink border border-ramta-border text-ramta-muted/50"
                        }`}
                      >
                        {idx < current ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                      </motion.div>
                      <span
                        className={`text-xs md:text-sm text-center transition-colors ${
                          active ? "text-ramta-text font-medium" : "text-ramta-muted/60"
                        }`}
                      >
                        {ORDER_STATUS_LABELS[status]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={order.status}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-center mt-8"
                >
                  <p className="text-ramta-muted text-lg">
                    {order.status === "received" && "ההזמנה התקבלה והועברה למטבח 🔥"}
                    {order.status === "preparing" && "אנחנו מכינים את ההזמנה שלך…"}
                    {order.status === "ready" && "ההזמנה מוכנה לאיסוף מהדלפק!"}
                    {order.status === "delivered" && "תיהנה! נשמח לראותך שוב."}
                    {order.status === "cancelled" && "ההזמנה בוטלה."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="bg-ramta-char/60 border border-ramta-border rounded-2xl p-6">
              <h3 className="font-frank-ruhl text-xl font-bold mb-4">סיכום ההזמנה</h3>
              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-ramta-text">
                      <span className="text-ramta-muted tabular-nums">×{item.quantity}</span>{" "}
                      {item.name}
                    </span>
                    <span className="text-ramta-muted tabular-nums">
                      {item.price * item.quantity} ₪
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-ramta-border flex justify-between items-center">
                <span className="text-ramta-muted">סה״כ</span>
                <span className="text-2xl font-frank-ruhl font-black text-ramta-gold tabular-nums">
                  {order.total} ₪
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-ramta-border/50 flex justify-between text-xs text-ramta-muted">
                <span>{order.customerName} · {order.customerPhone}</span>
                <span className="tabular-nums">{formatOrderTime(order.createdAt)}</span>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/menu"
                className="text-ramta-wood underline-grow"
              >
                הזמנה נוספת
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-frank-ruhl font-bold text-ramta-text mb-3">{title}</h1>
      <p className="text-ramta-muted">{message}</p>
      <Link href="/menu" className="inline-block mt-8 px-6 py-3 border border-ramta-wood text-ramta-wood rounded-full hover:bg-ramta-wood hover:text-ramta-ink transition-colors">
        חזרה לתפריט
      </Link>
    </div>
  );
}
