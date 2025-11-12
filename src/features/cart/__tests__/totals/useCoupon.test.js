import { renderHook, act, waitFor } from '@testing-library/react';
import useCoupon from '../../hooks/totals/useCoupon';

describe('useCoupon hook', () => {
  test('changes coupon form to be shown on add coupon button click', async () => {
    const { result } = renderHook(() => useCoupon());

    expect(result.current.couponFormShow).toEqual(false);

    act(() => {
      result.current.handleCouponFormShow();
    });

    await waitFor(() => {
      expect(result.current.couponFormShow).toEqual(true);
    });
  });
});
