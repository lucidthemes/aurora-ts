import { renderHook, waitFor } from '@testing-library/react';
import useRelated from '../../related/useRelated';

vi.mock('@server/products/getProduct', () => ({
  getProductArray: vi.fn(),
}));

import { getProductArray } from '@server/products/getProduct';

describe('useRelated hook', () => {
  const mockProduct = {
    id: 1,
    relatedProducts: [10, 3, 2],
  };

  const mockRelated = [
    { id: 10, title: 'Yarn scarf', price: 15.0 },
    { id: 3, title: 'Baby mittens', price: 10.0 },
    { id: 2, title: 'Autumn beanie', price: 20.0 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches related products data and sets relatedProducts state', async () => {
    getProductArray.mockResolvedValue(mockRelated);

    const { result } = renderHook(() => useRelated(mockProduct));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockRelated);
      expect(result.current).toHaveLength(3);
    });

    expect(getProductArray).toHaveBeenCalledWith(mockProduct.relatedProducts);
  });

  test('sets relatedProducts state to null if singleProduct is missing', () => {
    const { result } = renderHook(() => useRelated());

    expect(result.current).toEqual([]);

    expect(getProductArray).not.toHaveBeenCalled();
  });

  test('sets relatedProducts state to null if product has no related products', () => {
    const productWithoutRelated = { id: 1 };

    const { result } = renderHook(() => useRelated(productWithoutRelated));

    expect(result.current).toEqual([]);

    expect(getProductArray).not.toHaveBeenCalled();
  });
});
