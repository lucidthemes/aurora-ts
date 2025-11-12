import Items from '@features/cart/components/items';
import Coupon from '@features/cart/components/totals/Coupon';
import SubTotal from '@features/cart/components/totals/SubTotal';
import CouponDiscount from '@features/cart/components/totals/CouponDiscount';
import Shipping from './Shipping';
import Total from './Total';

export default function Summary({ cartItems, cartSubTotal, cartCoupons, cartTotal, addCartCoupon, removeCartCoupon, shippingOption, checkoutTotal }) {
  return (
    <>
      <h2 className="mb-5 text-3xl">Order summary</h2>
      <Items items={cartItems} />
      <Coupon cartSubTotal={cartSubTotal} cartCoupons={cartCoupons} cartTotal={cartTotal} addCartCoupon={addCartCoupon} removeCartCoupon={removeCartCoupon} />
      <SubTotal cartSubTotal={cartSubTotal} />
      <CouponDiscount cartSubTotal={cartSubTotal} cartCoupons={cartCoupons} cartTotal={cartTotal} removeCartCoupon={removeCartCoupon} />
      <Shipping shippingOption={shippingOption} />
      <Total checkoutTotal={checkoutTotal} />
    </>
  );
}
