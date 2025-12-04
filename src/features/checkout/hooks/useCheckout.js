import { useState, useMemo } from 'react';

function calculateCheckoutTotal(cartTotal, shippingOption) {
  if (!shippingOption || shippingOption.amount == null) {
    return cartTotal;
  }
  return cartTotal + shippingOption.amount;
}

export default function useCheckout(cartTotal) {
  const [shippingOption, setShippingOption] = useState({});
  const [paymentOption, setPaymentOption] = useState({});

  const checkoutTotal = calculateCheckoutTotal(cartTotal, shippingOption);

  return { shippingOption, setShippingOption, paymentOption, setPaymentOption, checkoutTotal };
}
