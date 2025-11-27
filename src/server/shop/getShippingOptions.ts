import { ShippingOption } from '@typings/shop/shippingOption';

export async function getShippingOptions(): Promise<ShippingOption[] | undefined> {
  try {
    const res = await fetch('/data/shop-shipping.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-shipping.json: ${res.status}`);
    }

    const shippingOptions: ShippingOption[] = await res.json();

    return shippingOptions;
  } catch (error) {
    console.error('getShippingOptions', error);
    throw error;
  }
}
