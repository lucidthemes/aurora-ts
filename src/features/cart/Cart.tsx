import { useCartContext } from '@features/cart/CartContext';

import Items from './components/items';
import EmptyCart from './components/EmptyCart';
import Totals from './components/totals';

export default function Cart() {
  const { cartItems, cartSubTotal, cartCoupons, cartTotal, updateCartItem, removeCartItem, emptyCart, addCartCoupon, removeCartCoupon } = useCartContext();

  return (
    <>
      {cartItems.length > 0 && Array.isArray(cartItems) ? (
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="lg:basis-2/3">
            <div className="rounded-md bg-white p-5 md:p-7.5 lg:p-10">
              <Items items={cartItems} updateCartItem={updateCartItem} removeCartItem={removeCartItem} />
              <EmptyCart emptyCart={emptyCart} />
            </div>
          </div>
          <div className="lg:basis-1/3">
            <section className="flex flex-col gap-y-5 rounded-md bg-white p-5 md:p-7.5 lg:p-10" aria-label="Cart totals">
              <Totals
                cartSubTotal={cartSubTotal}
                cartCoupons={cartCoupons}
                cartTotal={cartTotal}
                addCartCoupon={addCartCoupon}
                removeCartCoupon={removeCartCoupon}
              />
            </section>
          </div>
        </div>
      ) : (
        <div className="flex justify-center rounded-md bg-white p-10">
          <h2>Cart empty</h2>
        </div>
      )}
    </>
  );
}
