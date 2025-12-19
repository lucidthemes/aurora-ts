import { useState } from 'react';

import type { ShippingOption as ShippingOption } from '@typings/shop/shippingOption';
import type { PaymentOption as PaymentOption } from '@typings/shop/paymentOption';

function calculateCheckoutTotal(cartTotal: number, shippingOption: ShippingOption | null) {
  if (shippingOption == null || shippingOption.amount == null) {
    return cartTotal;
  }
  return cartTotal + shippingOption.amount;
}

export default function useCheckout(cartTotal: number) {
  const [shippingOption, setShippingOption] = useState<ShippingOption | null>(null);
  const [paymentOption, setPaymentOption] = useState<PaymentOption | null>(null);

  const checkoutTotal = calculateCheckoutTotal(cartTotal, shippingOption);

  return { shippingOption, setShippingOption, paymentOption, setPaymentOption, checkoutTotal };
}
