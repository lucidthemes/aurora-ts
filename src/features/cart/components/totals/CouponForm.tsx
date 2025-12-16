import Input from '@components/Form/Input';
import Button from '@components/UI/Button';
import type { Coupon as CouponType } from '@typings/shop/coupon';

import useCouponForm from '../../hooks/totals/useCouponForm';

interface CouponFormProps {
  couponFormShow: boolean;
  cartCoupons: CouponType[];
  addCartCoupon: (coupon: CouponType) => void;
}

export default function CouponForm({ couponFormShow, cartCoupons, addCartCoupon }: CouponFormProps) {
  const { couponFormCoupon, couponFormError, handleFormChange, handleFormSubmit } = useCouponForm(cartCoupons, addCartCoupon);

  if (!couponFormShow) return null;

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-5" aria-label="Add coupon" noValidate>
      <Input
        type="text"
        name="coupon"
        value={couponFormCoupon}
        onChange={handleFormChange}
        placeholder="Enter code"
        required={true}
        label="Enter code"
        error={couponFormError}
      />
      <Button type="submit" className="w-full">
        Apply
      </Button>
    </form>
  );
}
