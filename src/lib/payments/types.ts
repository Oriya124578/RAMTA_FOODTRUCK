/**
 * Payment provider adapter contract.
 * Implementations: mock (dev), tranzila, cardcom, meshulam, ...
 * Swap by setting PAYMENT_PROVIDER env var.
 */

export type PaymentInitInput = {
  orderId: string;
  amount: number;       // in shekels
  currency: "ILS";
  customerName: string;
  customerPhone: string;
  successUrl: string;
  cancelUrl: string;
};

export type PaymentInitResult = {
  provider: string;
  /** URL to redirect the customer to, or null if charged immediately (mock). */
  redirectUrl: string | null;
  /** Internal transaction id; can be used later for verification. */
  transactionId: string;
};

export type PaymentVerifyResult = {
  status: "paid" | "failed" | "pending";
  transactionId: string;
  raw?: unknown;
};

export interface PaymentProvider {
  readonly name: string;
  init(input: PaymentInitInput): Promise<PaymentInitResult>;
  verify(transactionId: string): Promise<PaymentVerifyResult>;
}
