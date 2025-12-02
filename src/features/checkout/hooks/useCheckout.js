import { useState, useMemo } from 'react';

export default function useCheckout(cartTotal) {
  const [shippingOption, setShippingOption] = useState({});
  const [paymentOption, setPaymentOption] = useState({});

  const checkoutTotal = useMemo(() => {
    if (!shippingOption || shippingOption.amount == null) {
      return cartTotal;
    }
    return cartTotal + shippingOption.amount;
  }, [cartTotal, shippingOption]);

  return { shippingOption, setShippingOption, paymentOption, setPaymentOption, checkoutTotal };
}
