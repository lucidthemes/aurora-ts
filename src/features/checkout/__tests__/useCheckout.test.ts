import { renderHook, act, waitFor } from '@testing-library/react';

import type { ShippingOption } from '@typings/shop/shippingOption';

import useCheckout from '../hooks/useCheckout';

describe('useCheckout hook', () => {
  const mockCartTotal = 50;

  const mockStandardShipping: ShippingOption = {
    id: 1,
    name: 'Standard',
    amount: 0,
  };

  const mockExpressShipping: ShippingOption = {
    id: 2,
    name: 'Express',
    amount: 1.99,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('sets initial checkoutTotal to cart total amount', async () => {
    const { result } = renderHook(() => useCheckout(mockCartTotal));

    expect(result.current.checkoutTotal).toEqual(mockCartTotal);
  });

  test('updates checkoutTotal when standard shipping selected', async () => {
    const { result } = renderHook(() => useCheckout(mockCartTotal));

    act(() => {
      result.current.setShippingOption(mockStandardShipping);
    });

    await waitFor(() => {
      expect(result.current.checkoutTotal).toBe(mockCartTotal + mockStandardShipping.amount);
    });
  });

  test('updates checkoutTotal when express shipping selected', async () => {
    const { result } = renderHook(() => useCheckout(mockCartTotal));

    act(() => {
      result.current.setShippingOption(mockExpressShipping);
    });

    await waitFor(() => {
      expect(result.current.checkoutTotal).toBe(mockCartTotal + mockExpressShipping.amount);
    });
  });
});
