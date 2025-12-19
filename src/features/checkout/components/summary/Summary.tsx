import Items from '@features/cart/components/items';
import Coupon from '@features/cart/components/totals/Coupon';
import SubTotal from '@features/cart/components/totals/SubTotal';
import CouponDiscount from '@features/cart/components/totals/CouponDiscount';
import type { Item } from '@typings/cart/item';
import type { Coupon as CouponType } from '@typings/shop/coupon';
import type { ShippingOption } from '@typings/shop/shippingOption';

import Shipping from './Shipping';
import Total from './Total';

interface SummaryProps {
  cartItems: Item[];
  cartSubTotal: number;
  cartCoupons: CouponType[];
  cartTotal: number;
  addCartCoupon: (coupon: CouponType) => void;
  removeCartCoupon: (couponId: number) => void;
  shippingOption: ShippingOption | null;
  checkoutTotal: number;
}

export default function Summary({
  cartItems,
  cartSubTotal,
  cartCoupons,
  cartTotal,
  addCartCoupon,
  removeCartCoupon,
  shippingOption,
  checkoutTotal,
}: SummaryProps) {
  return (
    <>
      <h2 className="mb-5 text-3xl">Order summary</h2>
      <Items items={cartItems} />
      <Coupon cartCoupons={cartCoupons} addCartCoupon={addCartCoupon} />
      <SubTotal cartSubTotal={cartSubTotal} />
      <CouponDiscount cartSubTotal={cartSubTotal} cartCoupons={cartCoupons} cartTotal={cartTotal} removeCartCoupon={removeCartCoupon} />
      <Shipping shippingOption={shippingOption} />
      <Total checkoutTotal={checkoutTotal} />
    </>
  );
}
