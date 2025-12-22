import { renderHook, act, waitFor } from '@testing-library/react';

vi.mock('@server/shop/getShippingOptions', () => ({
  getShippingOptions: vi.fn(),
}));

import { getShippingOptions } from '@server/shop/getShippingOptions';
import type { ShippingOption } from '@typings/shop/shippingOption';

import useShippingOptions from '../../hooks/form/useShippingOptions';

describe('useShippingOptions hook', () => {
  const mockShippingOption: ShippingOption = { id: 1, name: 'Standard', amount: 0 };

  const setShippingOptionMock = vi.fn();

  const mockShippingOptions: ShippingOption[] = [
    {
      id: 1,
      name: 'Standard',
      amount: 0,
    },
    {
      id: 2,
      name: 'Express',
      amount: 1.99,
    },
  ];

  const mockShippingOptionChange: ShippingOption = {
    id: 2,
    name: 'Express',
    amount: 1.99,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches shipping options data and sets shippingOptions state', async () => {
    vi.mocked(getShippingOptions).mockResolvedValue(mockShippingOptions);

    const { result } = renderHook(() => useShippingOptions(mockShippingOption, setShippingOptionMock));

    expect(result.current.shippingOptions).toEqual([]);

    await waitFor(() => {
      expect(result.current.shippingOptions).toEqual(mockShippingOptions);
      expect(result.current.shippingOptions).toHaveLength(2);
    });

    expect(getShippingOptions).toHaveBeenCalled();

    expect(setShippingOptionMock).toHaveBeenCalled();
  });

  test('changes shipping option on click', async () => {
    const { result } = renderHook(() => useShippingOptions(mockShippingOption, setShippingOptionMock));

    await act(async () => {
      result.current.handleShippingOptionChange(mockShippingOptionChange);
    });

    expect(setShippingOptionMock).toHaveBeenCalledWith({
      id: mockShippingOptionChange.id,
      name: mockShippingOptionChange.name,
      amount: mockShippingOptionChange.amount,
    });
  });
});
