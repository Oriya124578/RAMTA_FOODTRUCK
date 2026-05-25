"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  subscribeToActiveOrders,
  updateOrderStatus,
  formatOrderTime,
  minutesSince,
} from "@/lib/orders";
import { isFirebaseConfigured } from "@/lib/firebase";
import { ORDER_STATUS_LABELS, type Order, type OrderStatus } from "@/lib/firestore-types";
import { Loader2, ChefHat, Flame, Bell, Check, Volume2, VolumeX, Clock, X } from "lucide-react";
import toast from "react-hot-toast";
import { notifyOrderReadyAction } from "@/app/admin/actions";

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  received: "preparing",
  preparing: "ready",
  ready: "delivered",
  delivered: null,
  cancelled: null,
};

const STATUS_COLUMNS: {
  key: OrderStatus;
  title: string;
  icon: React.ElementType;
  tone: string;
}[] = [
  { key: "received",  title: "התקבל",   icon: ChefHat, tone: "border-blue-600/40 bg-blue-950/20" },
  { key: "preparing", title: "בהכנה",   icon: Flame,   tone: "border-amber-600/40 bg-amber-950/20" },
  { key: "ready",     title: "מוכן",     icon: Bell,    tone: "border-emerald-600/40 bg-emerald-950/20" },
];

// Generates a short beep using Web Audio API — no external file needed
function playBeep() {
  try {
    const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
    // second beep
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = "sine";
      osc2.frequency.value = 1100;
      gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.55);
    }, 200);
  } catch (_err) {
    // ignored — autoplay blocked or unsupported
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [tick, setTick] = useState(0); // re-render every 30s for timers
  const knownIds = useRef<Set<string>>(new Set());
  const initialized = useRef(false);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsub = subscribeToActiveOrders((next) => {
      // Detect new orders → toast + beep (only after initial load)
      if (initialized.current) {
        next.forEach((o) => {
          if (!knownIds.current.has(o.id)) {
            toast.success(`הזמנה חדשה: ${o.customerName} · #${o.shortId}`, { duration: 6000 });
            if (soundEnabled) playBeep();
          }
        });
      }
      knownIds.current = new Set(next.map((o) => o.id));
      initialized.current = true;
      setOrders(next);
      setLoading(false);
    });
    return unsub;
  }, [soundEnabled]);

  // Re-render every 30s to refresh wait-time indicators
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAdvance = async (order: Order) => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    try {
      await updateOrderStatus(order.id, next);
      toast.success(`${order.customerName} → "${ORDER_STATUS_LABELS[next]}"`);
      
      // Trigger WhatsApp securely via Server Action when order is ready
      if (next === "ready") {
        const res = await notifyOrderReadyAction(order.customerPhone, order.customerName, order.shortId);
        if (!res.success) {
          console.error("Failed to notify:", res.error);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בעדכון");
    }
  };

  const handleCancel = async (order: Order, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering handleAdvance
    if (!confirm(`האם אתה בטוח שברצונך לבטל את ההזמנה של ${order.customerName}?`)) return;
    try {
      await updateOrderStatus(order.id, "cancelled");
      toast.success(`ההזמנה של ${order.customerName} בוטלה`);
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בביטול הזמנה");
    }
  };

  return (
    <div>
      <header className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs text-ramta-wood uppercase tracking-[0.4em] mb-3">הזמנות חיות</p>
          <h1 className="text-4xl font-frank-ruhl font-black text-ramta-text">המטבח</h1>
          <p className="text-ramta-muted mt-2 text-sm">
            FIFO — הזמנה ישנה ראשונה. לחץ על כרטיס להעביר סטטוס.
          </p>
        </div>
        <button
          onClick={() => setSoundEnabled((s) => !s)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors ${
            soundEnabled
              ? "border-ramta-wood/40 text-ramta-wood bg-ramta-wood/10"
              : "border-ramta-border text-ramta-muted"
          }`}
          aria-label={soundEnabled ? "השתק" : "הפעל צליל"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          {soundEnabled ? "התראה פעילה" : "מושתק"}
        </button>
      </header>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-ramta-wood" />
        </div>
      )}

      {!loading && !isFirebaseConfigured && (
        <div className="p-6 rounded-2xl border border-amber-700/40 bg-amber-900/10 text-amber-200">
          Firebase לא מחובר — אין הזמנות חיות. ראה FIREBASE_SETUP.md.
        </div>
      )}

      {!loading && isFirebaseConfigured && (
        <div className="grid lg:grid-cols-3 gap-6">
          {STATUS_COLUMNS.map((col) => {
            const colOrders = orders.filter((o) => o.status === col.key);
            const Icon = col.icon;
            return (
              <div key={col.key} className={`rounded-2xl border ${col.tone} p-4 min-h-[400px]`}>
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="flex items-center gap-2 font-frank-ruhl text-xl font-bold text-ramta-text">
                    <Icon className="w-5 h-5" />
                    {col.title}
                  </h2>
                  <span className="text-xs text-ramta-muted tabular-nums">
                    {colOrders.length}
                  </span>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {colOrders.map((order) => {
                      const waitMin = minutesSince(order.createdAt);
                      const isLate = waitMin >= 15 && order.status !== "ready";
                      const isVeryLate = waitMin >= 25 && order.status !== "ready";
                      return (
                        <motion.div
                          key={order.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          onClick={() => handleAdvance(order)}
                          className={`bg-ramta-char border rounded-xl p-4 cursor-pointer transition-colors ${
                            isVeryLate
                              ? "border-red-500/70 ring-2 ring-red-500/40 animate-pulse"
                              : isLate
                                ? "border-amber-500/60"
                                : "border-ramta-border hover:border-ramta-wood/50"
                          }`}
                        >
                          {/* HEADER: Name (BIG) + shortId */}
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="font-frank-ruhl text-2xl font-black text-ramta-text leading-tight truncate">
                                {order.customerName}
                              </div>
                              <div className="text-sm text-ramta-wood font-bold tabular-nums mt-0.5">
                                #{order.shortId}
                              </div>
                            </div>
                            <div className="text-right shrink-0 flex flex-col items-end gap-2">
                              <button
                                onClick={(e) => handleCancel(order, e)}
                                className="text-ramta-muted hover:text-red-400 p-1 rounded transition-colors"
                                aria-label="בטל הזמנה"
                                title="בטל הזמנה"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div
                                className={`text-xs flex items-center gap-1 tabular-nums ${
                                  isVeryLate ? "text-red-400 font-bold" : isLate ? "text-amber-400" : "text-ramta-muted"
                                }`}
                              >
                                <Clock className="w-3 h-3" />
                                {waitMin} ד׳
                              </div>
                              <div className="text-[10px] text-ramta-muted/60 tabular-nums">
                                {formatOrderTime(order.createdAt)}
                              </div>
                            </div>
                          </div>

                          {/* Items */}
                          <ul className="text-sm space-y-1 mb-3 border-t border-ramta-border/40 pt-3">
                            {order.items.map((item) => (
                              <li key={item.id} className="flex gap-2 text-ramta-text">
                                <span className="text-ramta-wood font-bold tabular-nums shrink-0">
                                  ×{item.quantity}
                                </span>
                                <span className="truncate">{item.name}</span>
                              </li>
                            ))}
                          </ul>

                          {order.notes && (
                            <p className="text-xs text-amber-300 bg-amber-950/30 p-2 rounded mb-2 border border-amber-800/40">
                              📝 {order.notes}
                            </p>
                          )}

                          <div className="flex justify-between items-center text-xs text-ramta-muted pt-2 border-t border-ramta-border/40">
                            <span className="tabular-nums">{order.customerPhone}</span>
                            <span className="text-ramta-gold font-bold tabular-nums">
                              {order.total} ₪
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-ramta-wood/70 uppercase tracking-widest">
                            <Check className="w-3 h-3" /> לחץ להעברה
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {colOrders.length === 0 && (
                    <div className="text-center py-12 text-ramta-muted/40 text-sm">
                      אין הזמנות
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[10px] text-ramta-muted/40 text-center mt-8 tabular-nums">
        רענון אחרון: {new Date().toLocaleTimeString("he-IL")} · tick {tick}
      </p>
    </div>
  );
}
