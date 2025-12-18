import { renderHook, act, waitFor } from '@testing-library/react';

vi.mock('@server/shop/getCoupon', () => ({
  getCouponByCode: vi.fn(),
}));

import { getCouponByCode } from '@server/shop/getCoupon';
import type { Coupon } from '@typings/shop/coupon';
import { createInputChangeEvent, createFormSubmitEvent } from '@utils/tests/events';

import useCouponForm from '../../hooks/totals/useCouponForm';

describe('useCouponForm hook', () => {
  const mockCartCoupons: Coupon[] = [
    {
      id: 2,
      code: 'COUPON-10',
      type: 'percentage',
      amount: 10,
      expires: '',
    },
  ];

  const addCartCouponMock = vi.fn();

  const mockValidCoupon: Coupon = {
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
      result.current.handleFormChange(createInputChangeEvent('coupon', 'COUPON-5'));
    });

    expect(result.current.couponFormCoupon).toBe('COUPON-5');
  });

  test('updates error for missing coupon', () => {
    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('coupon', ''));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(addCartCouponMock).not.toHaveBeenCalled();

    expect(result.current.couponFormError).toBe('Please enter a coupon');
  });

  test('updates error for coupon that is already active', () => {
    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('coupon', 'COUPON-10'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(addCartCouponMock).not.toHaveBeenCalled();

    expect(result.current.couponFormError).toBe('Coupon code already active');
  });

  test('updates error for invalid coupon', async () => {
    vi.mocked(getCouponByCode).mockResolvedValue(mockInvalidCoupon);

    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('coupon', 'COUPON-2'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    await waitFor(() => {
      expect(addCartCouponMock).not.toHaveBeenCalled();
      expect(result.current.couponFormError).toBe('Invalid coupon code');
    });
  });

  test('applies coupon for valid form submission', async () => {
    vi.mocked(getCouponByCode).mockResolvedValue(mockValidCoupon);

    const { result } = renderHook(() => useCouponForm(mockCartCoupons, addCartCouponMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('coupon', 'COUPON-5'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    await waitFor(() => {
      expect(addCartCouponMock).toHaveBeenCalledWith(mockValidCoupon);
    });
  });
});
