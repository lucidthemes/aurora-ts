import Button from '@components/UI/Button';
import type { Coupon as CouponType } from '@typings/shop/coupon';

import Coupon from './Coupon';
import SubTotal from './SubTotal';
import CouponDiscount from './CouponDiscount';
import EstimatedTotal from './EstimatedTotal';

interface TotalsProps {
  cartSubTotal: number;
  cartCoupons: CouponType[];
  cartTotal: number;
  addCartCoupon: (coupon: CouponType) => void;
  removeCartCoupon: (couponId: number) => void;
}

export default function Totals({ cartSubTotal, cartCoupons, cartTotal, addCartCoupon, removeCartCoupon }: TotalsProps) {
  return (
    <>
      <h2 className="mb-5 text-3xl">Cart totals</h2>
      <Coupon cartCoupons={cartCoupons} addCartCoupon={addCartCoupon} />
      <SubTotal cartSubTotal={cartSubTotal} />
      <CouponDiscount cartSubTotal={cartSubTotal} cartCoupons={cartCoupons} cartTotal={cartTotal} removeCartCoupon={removeCartCoupon} />
      <EstimatedTotal cartTotal={cartTotal} />
      <Button className="inline-block w-full text-center" to="/checkout">
        Proceed to checkout
      </Button>
    </>
  );
}
