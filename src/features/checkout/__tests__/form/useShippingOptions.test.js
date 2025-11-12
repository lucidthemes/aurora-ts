import { renderHook, act, waitFor } from '@testing-library/react';
import useShippingOptions from '../../hooks/form/useShippingOptions';

vi.mock('@server/shop/getShippingOptions', () => ({
  getShippingOptions: vi.fn(),
}));

import { getShippingOptions } from '@server/shop/getShippingOptions';

describe('useShippingOptions hook', () => {
  const mockShippingOption = {};

  const setShippingOptionMock = vi.fn();

  const mockShippingOptions = [
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

  const mockShippingOptionChange = {
    id: 2,
    name: 'Express',
    amount: 1.99,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches shipping options data and sets shippingOptions state', async () => {
    getShippingOptions.mockResolvedValue(mockShippingOptions);

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
