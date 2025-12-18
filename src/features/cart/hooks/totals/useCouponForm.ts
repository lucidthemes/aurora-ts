import { useState } from 'react';
import type { ChangeEventHandler, FormEventHandler } from 'react';

import { getCouponByCode } from '@server/shop/getCoupon';
import type { Coupon as CouponType } from '@typings/shop/coupon';

export default function useCouponForm(cartCoupons: CouponType[], addCartCoupon: (coupon: CouponType) => void) {
  const [couponFormCoupon, setCouponFormCoupon] = useState('');
  const [couponFormError, setCouponFormError] = useState('');

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setCouponFormCoupon(value);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (couponFormCoupon) {
      const formattedCoupon = couponFormCoupon.trim().toLowerCase();

      const activeCoupon = cartCoupons?.find((coupon) => coupon.code.toLowerCase() === formattedCoupon);

      if (!activeCoupon) {
        const fetchCoupon = async () => {
          try {
            const validCoupon = await getCouponByCode(formattedCoupon);
            if (validCoupon) {
              addCartCoupon(validCoupon);
              setCouponFormError('');
            } else {
              setCouponFormError('Invalid coupon code');
            }
          } catch (error) {
            console.error('Failed to fetch coupon.', error);
          }
        };

        fetchCoupon();
      } else {
        setCouponFormError('Coupon code already active');
      }
    } else {
      setCouponFormError('Please enter a coupon');
    }
  };

  return { couponFormCoupon, couponFormError, handleFormChange, handleFormSubmit };
}
