import { useState } from 'react';

export default function useCoupon() {
  const [couponFormShow, setCouponFormShow] = useState(false);

  const handleCouponFormShow = () => {
    setCouponFormShow((prevState) => !prevState);
  };

  return { couponFormShow, handleCouponFormShow };
}
