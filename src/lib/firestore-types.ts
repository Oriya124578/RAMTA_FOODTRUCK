import type { Timestamp } from "firebase/firestore";

export type MenuCategory = {
  id: string;
  name: string;
  order: number;
  active: boolean;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  available: boolean;
  tags?: string[];
  allergens?: string[];
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type Order = {
  id: string;
  shortId: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentProvider: string;
  paymentTransactionId?: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
};

export type Settings = {
  currency: string;
  taxRate: number;
  paymentEnabled: boolean;
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  received: "התקבל",
  preparing: "בהכנה",
  ready: "מוכן לאיסוף",
  delivered: "נמסר",
  cancelled: "בוטל",
};

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "received",
  "preparing",
  "ready",
  "delivered",
];
