import { renderHook, act } from '@testing-library/react';
import useSort from '../hooks/useSort';

describe('useSort hook', () => {
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

  const mockShowSort = true;

  const mockShowPagination = true;

  const resetPaginationMock = vi.fn();

  const mockProductsFilteredByDate = mockProducts.toSorted((a, b) => new Date(b.date) - new Date(a.date));

  const mockProductsFilteredByRatingDesc = mockProducts.toSorted((a, b) => b.averageReview - a.averageReview);

  const mockProductsFilteredByRatingAsc = mockProducts.toSorted((a, b) => a.averageReview - b.averageReview);

  const mockProductsFilteredByPriceDesc = mockProducts.toSorted((a, b) => b.price - a.price);

  const mockProductsFilteredByPriceAsc = mockProducts.toSorted((a, b) => a.price - b.price);

  test('updates sort option on handleSortChange', () => {
    const { result } = renderHook(() => useSort(mockProducts, mockShowSort, mockShowPagination, resetPaginationMock));

    act(() => {
      result.current.handleSortChange({ target: { value: 'price-desc' } });
    });

    expect(result.current.sortOption).toBe('price-desc');
  });

  test('sort products using date option', () => {
    const { result } = renderHook(() => useSort(mockProducts, mockShowSort, mockShowPagination, resetPaginationMock));

    act(() => {
      result.current.handleSortChange({ target: { value: 'date' } });
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByDate);
    expect(result.current.sortOption).toBe('date');
  });

  test('sort products using rating-desc option', () => {
    const { result } = renderHook(() => useSort(mockProducts, mockShowSort, mockShowPagination, resetPaginationMock));

    act(() => {
      result.current.handleSortChange({ target: { value: 'rating-desc' } });
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByRatingDesc);
    expect(result.current.sortOption).toBe('rating-desc');
  });

  test('sort products using rating-asc option', () => {
    const { result } = renderHook(() => useSort(mockProducts, mockShowSort, mockShowPagination, resetPaginationMock));

    act(() => {
      result.current.handleSortChange({ target: { value: 'rating-asc' } });
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByRatingAsc);
    expect(result.current.sortOption).toBe('rating-asc');
  });

  test('sort products using price-desc option', () => {
    const { result } = renderHook(() => useSort(mockProducts, mockShowSort, mockShowPagination, resetPaginationMock));

    act(() => {
      result.current.handleSortChange({ target: { value: 'price-desc' } });
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByPriceDesc);
    expect(result.current.sortOption).toBe('price-desc');
  });

  test('sort products using price-asc option', () => {
    const { result } = renderHook(() => useSort(mockProducts, mockShowSort, mockShowPagination, resetPaginationMock));

    act(() => {
      result.current.handleSortChange({ target: { value: 'price-asc' } });
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByPriceAsc);
    expect(result.current.sortOption).toBe('price-asc');
  });

  test('pagination reset to first page after sort option change', () => {
    const { result } = renderHook(() => useSort(mockProducts, mockShowSort, mockShowPagination, resetPaginationMock));

    act(() => {
      result.current.handleSortChange({ target: { value: 'date' } });
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByDate);
    expect(result.current.sortOption).toBe('date');
    expect(resetPaginationMock).toHaveBeenCalled();
  });
});
