import { renderHook, act } from '@testing-library/react';

import type { Product } from '@typings/products/product';
import { createSelectChangeEvent } from '@utils/tests/events';

import useSort from '../hooks/useSort';

describe('useSort hook', () => {
  const mockProducts: Partial<Product>[] = [
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

  const mockProductsFilteredByDate = mockProducts.toSorted((a, b) => new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime());

  const mockProductsFilteredByRatingDesc = mockProducts.toSorted((a, b) => (b.averageReview ?? 0) - (a.averageReview ?? 0));

  const mockProductsFilteredByRatingAsc = mockProducts.toSorted((a, b) => (a.averageReview ?? 0) - (b.averageReview ?? 0));

  const mockProductsFilteredByPriceDesc = mockProducts.toSorted((a, b) => (b.price ?? 0) - (a.price ?? 0));

  const mockProductsFilteredByPriceAsc = mockProducts.toSorted((a, b) => (a.price ?? 0) - (b.price ?? 0));

  test('updates sort option on handleSortChange', () => {
    const { result } = renderHook(() => useSort(mockProducts as Product[], resetPaginationMock, mockShowSort, mockShowPagination));

    act(() => {
      result.current.handleSortChange(createSelectChangeEvent('sort', 'price-desc'));
    });

    expect(result.current.sortOption).toBe('price-desc');
  });

  test('sort products using date option', () => {
    const { result } = renderHook(() => useSort(mockProducts as Product[], resetPaginationMock, mockShowSort, mockShowPagination));

    act(() => {
      result.current.handleSortChange(createSelectChangeEvent('sort', 'date'));
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByDate);
    expect(result.current.sortOption).toBe('date');
  });

  test('sort products using rating-desc option', () => {
    const { result } = renderHook(() => useSort(mockProducts as Product[], resetPaginationMock, mockShowSort, mockShowPagination));

    act(() => {
      result.current.handleSortChange(createSelectChangeEvent('sort', 'rating-desc'));
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByRatingDesc);
    expect(result.current.sortOption).toBe('rating-desc');
  });

  test('sort products using rating-asc option', () => {
    const { result } = renderHook(() => useSort(mockProducts as Product[], resetPaginationMock, mockShowSort, mockShowPagination));

    act(() => {
      result.current.handleSortChange(createSelectChangeEvent('sort', 'rating-asc'));
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByRatingAsc);
    expect(result.current.sortOption).toBe('rating-asc');
  });

  test('sort products using price-desc option', () => {
    const { result } = renderHook(() => useSort(mockProducts as Product[], resetPaginationMock, mockShowSort, mockShowPagination));

    act(() => {
      result.current.handleSortChange(createSelectChangeEvent('sort', 'price-desc'));
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByPriceDesc);
    expect(result.current.sortOption).toBe('price-desc');
  });

  test('sort products using price-asc option', () => {
    const { result } = renderHook(() => useSort(mockProducts as Product[], resetPaginationMock, mockShowSort, mockShowPagination));

    act(() => {
      result.current.handleSortChange(createSelectChangeEvent('sort', 'price-asc'));
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByPriceAsc);
    expect(result.current.sortOption).toBe('price-asc');
  });

  test('pagination reset to first page after sort option change', () => {
    const { result } = renderHook(() => useSort(mockProducts as Product[], resetPaginationMock, mockShowSort, mockShowPagination));

    act(() => {
      result.current.handleSortChange(createSelectChangeEvent('sort', 'date'));
    });

    expect(result.current.sortedProducts).toEqual(mockProductsFilteredByDate);
    expect(result.current.sortOption).toBe('date');
    expect(resetPaginationMock).toHaveBeenCalled();
  });
});
