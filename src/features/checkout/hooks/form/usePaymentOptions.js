import { useState, useEffect } from 'react';
import { getPaymentOptions } from '@server/shop/getPaymentOptions';

export default function usePaymentOptions(paymentOption, setPaymentOption) {
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const options = await getPaymentOptions();
        if (options) {
          setPaymentOptions(options);
          if (!paymentOption.id) {
            setPaymentOption(options[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch payment options.', error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const handlePaymentOptionChange = (payment) => {
    if (payment && payment.id && payment.name) {
      if (payment.id !== paymentOption.id) {
        setPaymentOption({
          id: payment.id,
          name: payment.name,
          description: payment.description,
        });
      }
    }
  };

  return { paymentOptions, handlePaymentOptionChange };
}
