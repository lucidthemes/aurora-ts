import { renderHook, act, waitFor } from '@testing-library/react';

import useItem from '../../hooks/orders/useItem';

describe('useItem hook', () => {
  test('changes order details to be shown when order summary clicked', async () => {
    const { result } = renderHook(() => useItem());

    expect(result.current.orderDetailShow).toEqual(false);

    act(() => {
      result.current.handleOrderDetailShow();
    });

    await waitFor(() => {
      expect(result.current.orderDetailShow).toEqual(true);
    });
  });
});
