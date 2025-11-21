import { renderHook, act, waitFor } from '@testing-library/react';
import useCouponForm from '../../hooks/totals/useCouponForm';

vi.mock('@server/shop/getCoupon', () => ({
  getCouponByCode: vi.fn(),
}));

import { getCouponByCode } from '@server/shop/getCoupon';

describe('useCouponForm hook', () => {
  const mockCartCoupons = [
    {
      id: 2,
      code: 'COUPON-10',
      type: 'percentage',
      amount: 10,
      expires: '',
    },
  ];

  const addCartCouponMock = vi.fn();

  const mockValidCoupon = {
    id: 1,
    code: 'COUPON-5',
    type: 'fixed',
    amount: 5,
    expires: '',
  };

  const mockInvalidCoupon = null;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates coupon on handleFormChange', () => {
    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange({ target: { value: 'COUPON-5' } });
    });

    expect(result.current.couponFormCoupon).toBe('COUPON-5');
  });

  test('updates error for missing coupon', () => {
    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange({ target: { value: '' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(addCartCouponMock).not.toHaveBeenCalled();

    expect(result.current.couponFormError).toBe('Please enter a coupon');
  });

  test('updates error for coupon that is already active', () => {
    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange({ target: { value: 'COUPON-10' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(addCartCouponMock).not.toHaveBeenCalled();

    expect(result.current.couponFormError).toBe('Coupon code already active');
  });

  test('updates error for invalid coupon', async () => {
    getCouponByCode.mockResolvedValue(mockInvalidCoupon);

    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange({ target: { value: 'COUPON-2' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    await waitFor(() => {
      expect(addCartCouponMock).not.toHaveBeenCalled();
      expect(result.current.couponFormError).toBe('Invalid coupon code');
    });
  });

  test('applies coupon for valid form submission', async () => {
    getCouponByCode.mockResolvedValue(mockValidCoupon);

    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange({ target: { value: 'COUPON-5' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    await waitFor(() => {
      expect(addCartCouponMock).toHaveBeenCalledWith(mockValidCoupon);
    });
  });
});
