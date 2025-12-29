import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/products/getProduct', () => ({
  getProductArray: vi.fn(),
}));

import { getProductArray } from '@server/products/getProduct';
import type { Product } from '@typings/products/product';

import useRelated from '../../related/useRelated';

describe('useRelated hook', () => {
  const mockProduct: Partial<Product> = {
    id: 1,
    relatedProducts: [10, 3, 2],
  };

  const mockRelated: Partial<Product>[] = [
    { id: 10, title: 'Yarn scarf', price: 15.0 },
    { id: 3, title: 'Baby mittens', price: 10.0 },
    { id: 2, title: 'Autumn beanie', price: 20.0 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches related products data and sets relatedProducts state', async () => {
    vi.mocked(getProductArray).mockResolvedValue(mockRelated);

    const { result } = renderHook(() => useRelated(mockProduct as Product));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockRelated);
      expect(result.current).toHaveLength(3);
    });

    expect(getProductArray).toHaveBeenCalledWith(mockProduct.relatedProducts);
  });

  test('sets relatedProducts state to null if product has no related products', () => {
    const productWithoutRelated = { id: 1 };

    const { result } = renderHook(() => useRelated(productWithoutRelated as Product));

    expect(result.current).toEqual([]);

    expect(getProductArray).not.toHaveBeenCalled();
  });
});
