import { PaymentOption } from '@typings/shop/paymentOption';

export async function getPaymentOptions(): Promise<PaymentOption[] | undefined> {
  try {
    const res = await fetch('/data/shop-payment.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-payment.json: ${res.status}`);
    }

    const paymentOptions: PaymentOption[] = await res.json();

    return paymentOptions;
  } catch (error) {
    console.error('getPaymentOptions', error);
    throw error;
  }
}
