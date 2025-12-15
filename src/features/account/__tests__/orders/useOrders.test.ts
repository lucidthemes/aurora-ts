import { renderHook, waitFor } from '@testing-library/react';

import type { Customer } from '@typings/shop/customer';
import type { Order } from '@typings/shop/order';

import useOrders from '../../hooks/orders/useOrders';

vi.mock('@server/shop/getOrders', () => ({
  getOrdersByCustomerId: vi.fn(),
}));

import { getOrdersByCustomerId } from '@server/shop/getOrders';

describe('useOrders hook', () => {
  const mockCustomer: Customer = {
    id: 1,
    email: 'test@example.com',
  };

  const mockOrders: Partial<Order>[] = [
    {
      id: 1001,
      customerId: 1,
      date: '2025-10-23T15:28:51.355Z',
    },
    {
      id: 1002,
      customerId: 1,
      date: '2025-10-22T15:30:51.372Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches orders data and sets orders state', async () => {
    vi.mocked(getOrdersByCustomerId).mockResolvedValue(mockOrders);

    const { result } = renderHook(() => useOrders(mockCustomer.id));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockOrders);
      expect(result.current).toHaveLength(2);
    });

    expect(getOrdersByCustomerId).toHaveBeenCalledWith(mockCustomer.id);
  });

  test('does not fetch orders if customerId is missing', () => {
    const { result } = renderHook(() => useOrders(undefined));

    expect(result.current).toEqual([]);

    expect(getOrdersByCustomerId).not.toHaveBeenCalled();
  });
});
