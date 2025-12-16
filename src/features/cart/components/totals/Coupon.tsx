import type { Coupon as CouponType } from '@typings/shop/coupon';

import useCoupon from '../../hooks/totals/useCoupon';
import CouponForm from './CouponForm';

interface CouponProps {
  cartCoupons: CouponType[];
  addCartCoupon: (coupon: CouponType) => void;
}

export default function Coupon({ cartCoupons, addCartCoupon }: CouponProps) {
  const { couponFormShow, handleCouponFormShow } = useCoupon();
  const couponFormShowIconClass = couponFormShow === true ? 'rotate-180' : '';

  return (
    <>
      <div className="flex flex-col gap-y-3 border-t-1 border-pearl-bush pt-4">
        <button onClick={handleCouponFormShow} className="flex cursor-pointer items-center justify-between">
          <p className="text-xl text-shark">Add coupons</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className={`h-3.5 w-3.5 fill-boulder ${couponFormShowIconClass}`}>
            <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"></path>
          </svg>
        </button>
        <CouponForm couponFormShow={couponFormShow} cartCoupons={cartCoupons} addCartCoupon={addCartCoupon} />
      </div>
    </>
  );
}
