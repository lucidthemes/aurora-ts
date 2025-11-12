import { renderHook } from '@testing-library/react';
import usePagination from '../hooks/usePagination';

describe('usePagination hook', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Cozy sweater',
    },
    {
      id: 2,
      title: 'Autumn beanie',
    },
    {
      id: 3,
      title: 'Baby mittens',
    },
    {
      id: 4,
      title: 'Handmade bonnet',
    },
    {
      id: 5,
      title: 'Knitted bag',
    },
    {
      id: 6,
      title: 'Scarf knitwear',
    },
    {
      id: 7,
      title: 'Sewn handbag',
    },
    {
      id: 8,
      title: 'Stylish jeans',
    },
    {
      id: 9,
      title: 'Wool scarf',
    },
    {
      id: 10,
      title: 'Yarn scarf',
    },
  ];

  const mockCurrentPage = 1;

  const mockProductsPerPage = 6;

  const mockShowPagination = true;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('slices products down to products per page amount', () => {
    const { result } = renderHook(() => usePagination(mockProducts, mockCurrentPage, mockProductsPerPage, mockShowPagination));

    expect(result.current.paginatedProducts).toHaveLength(mockProductsPerPage);
  });

  test('calculates the total number of pages based on products count and products per page', () => {
    const { result } = renderHook(() => usePagination(mockProducts, mockCurrentPage, mockProductsPerPage, mockShowPagination));

    expect(result.current.totalPages).toEqual(2);
  });

  test('does not slice products if pagination is disabled', () => {
    const { result } = renderHook(() => usePagination(mockProducts, mockCurrentPage, mockProductsPerPage, false));

    expect(result.current.paginatedProducts).toHaveLength(10);
  });
});
