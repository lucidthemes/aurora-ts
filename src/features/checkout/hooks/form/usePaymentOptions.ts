import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { getPaymentOptions } from '@server/shop/getPaymentOptions';
import type { PaymentOption } from '@typings/shop/paymentOption';

export default function usePaymentOptions(paymentOption: PaymentOption | null, setPaymentOption: Dispatch<SetStateAction<PaymentOption | null>>) {
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const options = await getPaymentOptions();
        if (options && options.length > 0) {
          setPaymentOptions(options);
          setPaymentOption(options[0]);
        }
      } catch (error) {
        console.error('Failed to fetch payment options.', error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const handlePaymentOptionChange = (payment: PaymentOption) => {
    if (!payment || !paymentOption) return null;

    if (payment.id !== paymentOption.id) {
      setPaymentOption(payment);
    }
  };

  return { paymentOptions, handlePaymentOptionChange };
}
