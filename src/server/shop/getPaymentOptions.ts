import { z } from 'zod';

import { PaymentOptionSchema } from '@schemas/shop/paymentOption.schema';
import type { PaymentOption } from '@typings/shop/paymentOption';

export async function getPaymentOptions(): Promise<PaymentOption[]> {
  try {
    const res = await fetch('/data/shop-payment.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-payment.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(PaymentOptionSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const paymentOptions = parsed.data;

    return paymentOptions;
  } catch (error) {
    console.error('getPaymentOptions', error);
    throw error;
  }
}
