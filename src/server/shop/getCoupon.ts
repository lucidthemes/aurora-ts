import { z } from 'zod';
import { Coupon } from '@typings/shop/coupon';
import { CouponSchema } from '@schemas/shop/coupon.schema';

export async function getCoupon<K extends 'code'>(field: K, value: Coupon[K]): Promise<Coupon | undefined> {
  try {
    const res = await fetch('/data/shop-coupons.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-coupons.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(CouponSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const coupons = parsed.data;
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
