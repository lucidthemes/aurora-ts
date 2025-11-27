import { Coupon } from '@typings/shop/coupon';

export async function getCoupon<K extends 'code'>(field: K, value: Coupon[K]): Promise<Coupon | undefined> {
  try {
    const res = await fetch('/data/shop-coupons.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-coupons.json: ${res.status}`);
    }

    const coupons: Coupon[] = await res.json();
    const coupon = coupons.find((coupon) => coupon[field].toLowerCase() === value);

    return coupon;
  } catch (error) {
    console.error('getCoupon', error);
    throw error;
  }
}

export function getCouponByCode(code: string) {
  return getCoupon('code', code);
}
