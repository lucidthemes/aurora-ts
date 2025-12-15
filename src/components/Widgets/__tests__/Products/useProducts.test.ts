import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/products/getProducts', () => ({
  getProducts: vi.fn(),
}));

import { getProducts } from '@server/products/getProducts';
import type { Product } from '@typings/products/product';

import useProducts from '../../Products/useProducts';

describe('useProducts hook', () => {
  const mockLimit = 3;

  const mockProducts: Partial<Product>[] = [
    {
      id: 1,
      title: 'Cozy sweater',
      slug: 'cozy-sweater',
      date: '2025-09-10',
      image: '/images/products/product-1.jpg',
      price: 20.0,
      averageReview: 5,
    },
    {
      id: 2,
      title: 'Autumn beanie',
      slug: 'autumn-beanie',
      date: '2025-09-09',
      image: '/images/products/product-5.jpg',
      price: 20.0,
      averageReview: 4,
    },
    {
      id: 3,
      title: 'Baby mittens',
      slug: 'baby-mittens',
      date: '2025-09-08',
      image: '/images/products/product-7.jpg',
      price: 10.0,
      averageReview: 4.67,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches products data and sets products state', async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(mockLimit, undefined));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockProducts);
      expect(result.current).toHaveLength(3);
    });

    expect(getProducts).toHaveBeenCalledWith(mockLimit, undefined);
  });
});
