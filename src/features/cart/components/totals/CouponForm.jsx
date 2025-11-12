import useCouponForm from '../../hooks/totals/useCouponForm';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

export default function CouponForm({ couponFormShow, cartCoupons, addCartCoupon }) {
  if (!couponFormShow) return null;

  const { couponFormCoupon, couponFormError, handleFormChange, handleFormSubmit } = useCouponForm(cartCoupons, addCartCoupon);

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
