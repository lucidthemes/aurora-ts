import { z } from 'zod';
import { ShippingOption } from '@typings/shop/shippingOption';
import { ShippingOptionSchema } from '@schemas/shop/shippingOption.schema';

export async function getShippingOptions(): Promise<ShippingOption[]> {
  try {
    const res = await fetch('/data/shop-shipping.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-shipping.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(ShippingOptionSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const shippingOptions = parsed.data;

    return shippingOptions;
  } catch (error) {
    console.error('getShippingOptions', error);
    throw error;
  }
}
