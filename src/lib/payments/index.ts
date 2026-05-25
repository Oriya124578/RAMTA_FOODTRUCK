import type { PaymentProvider } from "./types";
import { mockProvider } from "./mock";

/**
 * Add real providers here as TODO stubs:
 *   import { tranzilaProvider } from "./tranzila";
 *   import { cardcomProvider } from "./cardcom";
 *   import { meshulamProvider } from "./meshulam";
 */

const providers: Record<string, PaymentProvider> = {
  mock: mockProvider,
  // tranzila: tranzilaProvider,
  // cardcom:  cardcomProvider,
  // meshulam: meshulamProvider,
};

export function getPaymentProvider(): PaymentProvider {
  const name = process.env.PAYMENT_PROVIDER || process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || "mock";
  const provider = providers[name] ?? mockProvider;
  return provider;
}

export type { PaymentProvider, PaymentInitInput, PaymentInitResult, PaymentVerifyResult } from "./types";
