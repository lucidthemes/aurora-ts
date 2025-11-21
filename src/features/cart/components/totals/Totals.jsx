import Coupon from './Coupon';
import SubTotal from './SubTotal';
import CouponDiscount from './CouponDiscount';
import EstimatedTotal from './EstimatedTotal';
import Button from '@components/UI/Button';

export default function Totals({ cartSubTotal, cartCoupons, cartTotal, addCartCoupon, removeCartCoupon }) {
  return (
    <>
      <h2 className="mb-5 text-3xl">Cart totals</h2>
      <Coupon cartSubTotal={cartSubTotal} cartCoupons={cartCoupons} cartTotal={cartTotal} addCartCoupon={addCartCoupon} removeCartCoupon={removeCartCoupon} />
      <SubTotal cartSubTotal={cartSubTotal} />
      <CouponDiscount cartSubTotal={cartSubTotal} cartCoupons={cartCoupons} cartTotal={cartTotal} removeCartCoupon={removeCartCoupon} />
      <EstimatedTotal cartTotal={cartTotal} />
      <Button className="inline-block w-full text-center" to="/checkout">
        Proceed to checkout
      </Button>
    </>
  );
}
