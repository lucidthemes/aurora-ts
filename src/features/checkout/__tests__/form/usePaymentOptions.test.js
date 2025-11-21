import { renderHook, act, waitFor } from '@testing-library/react';
import usePaymentOptions from '../../hooks/form/usePaymentOptions';

vi.mock('@server/shop/getPaymentOptions', () => ({
  getPaymentOptions: vi.fn(),
}));

import { getPaymentOptions } from '@server/shop/getPaymentOptions';

describe('usePaymentOptions hook', () => {
  const mockPaymentOption = {};

  const setPaymentOptionMock = vi.fn();

  const mockPaymentOptions = [
    {
      id: 1,
      name: 'Direct bank transfer',
      description:
        'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
    },
    {
      id: 2,
      name: 'Cheque payment',
      description: 'Please send a cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.',
    },
    {
      id: 3,
      name: 'Cash on delivery',
      description: 'Pay with cash upon delivery.',
    },
  ];

  const mockPaymentOptionChange = {
    id: 2,
    name: 'Express',
    amount: 1.99,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches payment options data and sets paymentOptions state', async () => {
    getPaymentOptions.mockResolvedValue(mockPaymentOptions);

    const { result } = renderHook(() => usePaymentOptions(mockPaymentOption, setPaymentOptionMock));

    expect(result.current.paymentOptions).toEqual([]);

    await waitFor(() => {
      expect(result.current.paymentOptions).toEqual(mockPaymentOptions);
      expect(result.current.paymentOptions).toHaveLength(3);
    });

    expect(getPaymentOptions).toHaveBeenCalled();

    expect(setPaymentOptionMock).toHaveBeenCalled();
  });

  test('changes payment option on click', async () => {
    const { result } = renderHook(() => usePaymentOptions(mockPaymentOption, setPaymentOptionMock));

    await act(async () => {
      result.current.handlePaymentOptionChange(mockPaymentOptionChange);
    });

    expect(setPaymentOptionMock).toHaveBeenCalledWith({
      id: mockPaymentOptionChange.id,
      name: mockPaymentOptionChange.name,
      description: mockPaymentOptionChange.description,
    });
  });
});
