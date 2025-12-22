import { useCartContext } from '@features/cart/CartContext';
import useCheckout from './hooks/useCheckout';
import Form from './components/form';
import Summary from './components/summary';

export default function Checkout() {
  const { cartItems, cartSubTotal, cartCoupons, cartTotal, emptyCart, addCartCoupon, removeCartCoupon } = useCartContext();

  const { shippingOption, setShippingOption, paymentOption, setPaymentOption, checkoutTotal } = useCheckout(cartTotal);

  return (
    <>
      {cartItems.length > 0 && Array.isArray(cartItems) ? (
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="lg:basis-2/3">
            <div className="rounded-md bg-white p-5 md:p-7.5 lg:p-10">
              <Form
                cartItems={cartItems}
                cartSubTotal={cartSubTotal}
                cartCoupons={cartCoupons}
                emptyCart={emptyCart}
                shippingOption={shippingOption}
                setShippingOption={setShippingOption}
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                checkoutTotal={checkoutTotal}
              />
            </div>
          </div>
          <div className="lg:basis-1/3">
            <section className="flex flex-col gap-y-5 rounded-md bg-white p-5 md:p-7.5 lg:p-10" aria-label="Order summary">
              <Summary
                cartItems={cartItems}
                cartSubTotal={cartSubTotal}
                cartCoupons={cartCoupons}
                cartTotal={cartTotal}
                addCartCoupon={addCartCoupon}
                removeCartCoupon={removeCartCoupon}
                shippingOption={shippingOption}
                checkoutTotal={checkoutTotal}
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
