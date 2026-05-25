/**
 * Orders data layer.
 * Counter-service model — no table tracking. Customer is identified by
 * name + short order number (#1234) that the kitchen calls out.
 */
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import type { Order, OrderItem, OrderStatus, PaymentStatus } from "./firestore-types";

function generateShortId(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export type CreateOrderInput = {
  items: OrderItem[];
  subtotal: number;
  total: number;
  customerName: string;
  customerPhone: string;
  notes?: string;
  paymentProvider: string;
};

export async function createOrder(input: CreateOrderInput): Promise<{ id: string; shortId: string }> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firestore not configured — cannot create order");
  }
  const shortId = generateShortId();

  // Build doc explicitly, skipping any undefined fields so Firestore won't
  // reject the write. (Defense in depth — initializeFirestore already sets
  // ignoreUndefinedProperties: true.)
  const doc: Record<string, unknown> = {
    items: input.items,
    subtotal: input.subtotal,
    total: input.total,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    paymentProvider: input.paymentProvider,
    shortId,
    status: "received" as OrderStatus,
    paymentStatus: "pending" as PaymentStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (input.notes && input.notes.trim()) {
    doc.notes = input.notes.trim();
  }

  const docRef = await addDoc(collection(db, "orders"), doc);
  return { id: docRef.id, shortId };
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<void> {
  if (!db) throw new Error("Firestore not configured");
  
  await updateDoc(doc(db, "orders", orderId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: PaymentStatus,
  transactionId?: string
): Promise<void> {
  if (!db) throw new Error("Firestore not configured");
  await updateDoc(doc(db, "orders", orderId), {
    paymentStatus,
    paymentTransactionId: transactionId ?? null,
    updatedAt: serverTimestamp(),
  });
}

export async function getOrder(orderId: string): Promise<Order | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, "orders", orderId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Order;
}

export function subscribeToOrder(
  orderId: string,
  cb: (order: Order | null) => void
): () => void {
  if (!db) {
    cb(null);
    return () => {};
  }
  return onSnapshot(doc(db, "orders", orderId), (snap) => {
    if (!snap.exists()) return cb(null);
    cb({ id: snap.id, ...snap.data() } as Order);
  });
}

/**
 * Live subscription to active orders for the kitchen — FIFO order
 * (oldest first → handled next).
 *
 * Note: we deliberately do NOT use orderBy on the server because combining
 * `where status in [...]` with `orderBy createdAt` requires a composite
 * Firestore index. For foodtruck-scale volume sorting client-side is fine.
 */
export function subscribeToActiveOrders(
  cb: (orders: Order[]) => void
): () => void {
  if (!db) {
    cb([]);
    return () => {};
  }
  const q = query(
    collection(db, "orders"),
    where("status", "in", ["received", "preparing", "ready"])
  );
  return onSnapshot(
    q,
    (snap) => {
      const orders = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Order);
      // FIFO sort — oldest first. Handle null timestamps (write in flight).
      orders.sort((a, b) => {
        const ta =
          a.createdAt instanceof Date
            ? a.createdAt.getTime()
            : (a.createdAt as Timestamp | undefined)?.toMillis?.() ?? 0;
        const tb =
          b.createdAt instanceof Date
            ? b.createdAt.getTime()
            : (b.createdAt as Timestamp | undefined)?.toMillis?.() ?? 0;
        return ta - tb;
      });
      cb(orders);
    },
    (err) => {
      // Surface query errors instead of silently failing
      console.error("subscribeToActiveOrders error:", err);
      cb([]);
    }
  );
}

export function formatOrderTime(t: Timestamp | Date | undefined): string {
  if (!t) return "";
  const date = t instanceof Date ? t : t.toDate();
  return date.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
}

/** Minutes since order was created — used for wait-time alerts. */
export function minutesSince(t: Timestamp | Date | undefined): number {
  if (!t) return 0;
  const date = t instanceof Date ? t : t.toDate();
  return Math.floor((Date.now() - date.getTime()) / 60000);
}
