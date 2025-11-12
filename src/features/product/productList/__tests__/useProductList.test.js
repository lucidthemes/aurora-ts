import { renderHook, act, waitFor } from '@testing-library/react';
import useProductList from '../hooks/useProductList';

vi.mock('@server/products/getProducts', () => ({
  getProducts: vi.fn(),
}));

import { getProducts } from '@server/products/getProducts';

describe('useProductList hook', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Cozy sweater',
      slug: 'cozy-sweater',
      date: '2025-09-10',
      category: 6,
      image: '/images/products/product-1.jpg',
      price: 20,
      reviewCount: 2,
      averageReview: 5,
    },
    {
      id: 2,
      title: 'Autumn beanie',
      slug: 'autumn-beanie',
      date: '2025-09-09',
      category: 3,
      image: '/images/products/product-5.jpg',
      price: 20,
      reviewCount: 1,
      averageReview: 4,
    },
    {
      id: 3,
      title: 'Baby mittens',
      slug: 'baby-mittens',
      date: '2025-09-08',
      category: 2,
      image: '/images/products/product-7.jpg',
      price: 10,
      reviewCount: 3,
      averageReview: 4.67,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches products data and sets products state', async () => {
    getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProductList());

    expect(result.current.products).toEqual([]);

    await waitFor(() => {
      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.products).toHaveLength(3);
    });

    expect(getProducts).toHaveBeenCalled();
  });

  test('updates page number on handlePageChange', async () => {
    const { result } = renderHook(() => useProductList());

    expect(result.current.currentPage).toBe(1);

    await act(async () => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(2);
  });

  test('resets page number on resetPagination', async () => {
    const { result } = renderHook(() => useProductList());

    await act(async () => {
      result.current.resetPagination();
    });

    expect(result.current.currentPage).toBe(1);
  });
});
