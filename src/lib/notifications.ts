/**
 * SMS/WhatsApp Notifications Utility
 * 
 * This is a placeholder for integrating with a real SMS/WhatsApp API
 * (e.g., Twilio, Green API for WhatsApp, or a local Israeli SMS provider like 019/Inforu).
 */

export interface NotificationPayload {
  to: string; // Phone number
  message: string;
}

export async function sendSMS(payload: NotificationPayload): Promise<boolean> {
  console.log(`[SMS MOCK] Sending SMS to ${payload.to}: ${payload.message}`);
  // TODO: Replace with actual API call
  // Example:
  // await fetch('https://api.smsprovider.com/send', { ... })
  return true;
}

export async function sendWhatsApp(payload: NotificationPayload): Promise<boolean> {
  console.log(`[WhatsApp MOCK] Sending message to ${payload.to}: ${payload.message}`);
  // TODO: Replace with actual WhatsApp API (e.g. WhatsApp Business API or Meta Graph API)
  return true;
}

/**
 * Convenience function to notify a customer when their order is ready.
 */
export async function notifyOrderReady(customerPhone: string, customerName: string, orderNumber: string) {
  const message = `היי ${customerName}, ההזמנה שלך (מס' ${orderNumber}) מוכנה לאיסוף! בתיאבון מ-RAMTA Foodtruck 🍔`;
  
  // Prefer WhatsApp, fallback to SMS, or send both depending on business logic
  await sendWhatsApp({ to: customerPhone, message });
}
