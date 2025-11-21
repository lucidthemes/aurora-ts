export async function getCoupon(field, value) {
  try {
    const res = await fetch('/data/shop-coupons.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-coupons.json: ${res.status}`);
    }

    const coupons = await res.json();
    const coupon = coupons.find((coupon) => coupon[field].toLowerCase() === value);

    if (!coupon) return;

    return coupon;
  } catch (error) {
    console.error('getCoupon', error);
    throw error;
  }
}

export function getCouponByCode(code) {
  return getCoupon('code', code);
}
