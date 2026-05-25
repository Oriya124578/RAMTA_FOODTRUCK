import type { PaymentProvider, PaymentInitResult, PaymentVerifyResult, PaymentInitInput } from "./types";

/**
 * Mock provider: instantly "approves" the payment.
 * Used until a real gateway is connected. Logs everything for traceability.
 */
export const mockProvider: PaymentProvider = {
  name: "mock",

  async init(input: PaymentInitInput): Promise<PaymentInitResult> {
    const transactionId = `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    console.info("[payment:mock] init", { ...input, transactionId });
    // Simulate processing latency
    await new Promise((r) => setTimeout(r, 600));
    return {
      provider: "mock",
      redirectUrl: null, // null = no redirect; the caller treats it as instant success
      transactionId,
    };
  },

  async verify(transactionId: string): Promise<PaymentVerifyResult> {
    console.info("[payment:mock] verify", { transactionId });
    return { status: "paid", transactionId };
  },
};
