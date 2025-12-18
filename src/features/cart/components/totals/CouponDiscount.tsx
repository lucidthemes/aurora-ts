import type { Coupon } from '@typings/shop/coupon';

interface CouponDiscountProps {
  cartSubTotal: number;
  cartCoupons: Coupon[];
  cartTotal: number;
  removeCartCoupon: (couponId: number) => void;
}

export default function CouponDiscount({ cartSubTotal, cartCoupons, cartTotal, removeCartCoupon }: CouponDiscountProps) {
  if (!Array.isArray(cartCoupons) || cartCoupons.length === 0) return null;

  return (
    <dl className="flex justify-between gap-2.5 border-t-1 border-pearl-bush pt-5">
      <dt className="text-xl text-shark">Discount</dt>
      <dd className="flex flex-col items-end gap-y-2.5">
        <ul className="flex flex-wrap justify-end gap-2.5" aria-label="Active coupons">
          {cartCoupons.map((coupon) => (
            <li key={coupon.id} className="flex items-center gap-x-2 rounded-full border-1 border-pearl-bush px-2.5 py-1">
              <span className="lowercase">{coupon.code}</span>
              <button
                className="cursor-pointer rounded-full bg-pearl-bush fill-boulder hover:bg-shark hover:fill-white"
                onClick={() => removeCartCoupon(coupon.id)}
                aria-label="Remove coupon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path>
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xl text-green-500">-£{(cartSubTotal - cartTotal).toFixed(2)}</p>
      </dd>
    </dl>
  );
}
