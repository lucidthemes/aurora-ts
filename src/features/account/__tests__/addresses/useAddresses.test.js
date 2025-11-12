import { renderHook, act, waitFor } from '@testing-library/react';
import useAddresses from '../../hooks/addresses/useAddresses';

describe('useAddresses hook', () => {
  test('changes shipping address edit form to be shown when edit button is clicked', async () => {
    const { result } = renderHook(() => useAddresses());

    expect(result.current.shippingEditShow).toEqual(false);

    act(() => {
      result.current.handleShippingEditShow();
    });

    await waitFor(() => {
      expect(result.current.shippingEditShow).toEqual(true);
    });
  });

  test('changes billing address edit form to be shown when edit button is clicked', async () => {
    const { result } = renderHook(() => useAddresses());

    expect(result.current.billingEditShow).toEqual(false);

    act(() => {
      result.current.handleBillingEditShow();
    });

    await waitFor(() => {
      expect(result.current.billingEditShow).toEqual(true);
    });
  });
});
