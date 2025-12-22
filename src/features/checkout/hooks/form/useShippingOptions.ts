import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { getShippingOptions } from '@server/shop/getShippingOptions';
import type { ShippingOption } from '@typings/shop/shippingOption';

export default function useShippingOptions(shippingOption: ShippingOption | null, setShippingOption: Dispatch<SetStateAction<ShippingOption | null>>) {
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);

  useEffect(() => {
    const fetchShippingOptions = async () => {
      try {
        const options = await getShippingOptions();
        if (options && options.length > 0) {
          setShippingOptions(options);
          setShippingOption(options[0]);
        }
      } catch (error) {
        console.error('Failed to fetch shipping options.', error);
      }
    };

    fetchShippingOptions();
  }, []);

  const handleShippingOptionChange = (shipping: ShippingOption) => {
    if (!shipping || !shippingOption) return null;

    if (shipping.id !== shippingOption.id) {
      setShippingOption(shipping);
    }
  };

  return { shippingOptions, handleShippingOptionChange };
}
