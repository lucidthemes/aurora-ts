import { useState, useEffect } from 'react';

export default function useCheckout(cartTotal) {
  const [shippingOption, setShippingOption] = useState({});
  const [paymentOption, setPaymentOption] = useState({});
  const [checkoutTotal, setCheckoutTotal] = useState(cartTotal);

  useEffect(() => {
    if (!shippingOption || shippingOption.amount == null) return;

    setCheckoutTotal(cartTotal + shippingOption.amount);
  }, [cartTotal, shippingOption]);

  return { shippingOption, setShippingOption, paymentOption, setPaymentOption, checkoutTotal };
}
