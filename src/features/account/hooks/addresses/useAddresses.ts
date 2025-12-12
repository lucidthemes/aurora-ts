import { useState } from 'react';

export default function useAddresses() {
  const [shippingEditShow, setShippingEditShow] = useState(false);
  const [billingEditShow, setBillingEditShow] = useState(false);

  const handleShippingEditShow = () => {
    setShippingEditShow((prevState) => !prevState);
  };

  const handleBillingEditShow = () => {
    setBillingEditShow((prevState) => !prevState);
  };

  return { shippingEditShow, billingEditShow, handleShippingEditShow, handleBillingEditShow };
}
