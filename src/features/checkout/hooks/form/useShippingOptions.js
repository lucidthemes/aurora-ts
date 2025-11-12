import { useState, useEffect } from 'react';
import { getShippingOptions } from '@server/shop/getShippingOptions';

export default function useShippingOptions(shippingOption, setShippingOption) {
  const [shippingOptions, setShippingOptions] = useState([]);

  useEffect(() => {
    const fetchShippingOptions = async () => {
      try {
        const options = await getShippingOptions();
        if (options) {
          setShippingOptions(options);
          if (!shippingOption.id) {
            setShippingOption(options[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch shipping options.', error);
      }
    };

    fetchShippingOptions();
  }, []);

  const handleShippingOptionChange = (shipping) => {
    if (shipping && shipping.id && shipping.name) {
      if (shipping.id !== shippingOption.id) {
        setShippingOption({
          id: shipping.id,
          name: shipping.name,
          amount: shipping.amount,
        });
      }
    }
  };

  return { shippingOptions, handleShippingOptionChange };
}
