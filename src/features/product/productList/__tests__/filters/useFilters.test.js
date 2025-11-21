import { renderHook, act, waitFor } from '@testing-library/react';
import useFilters from '../../hooks/filters/useFilters';

vi.mock('@server/products/getProducts', () => ({
  getProductsMinMaxPrices: vi.fn(),
}));

import { getProductsMinMaxPrices } from '@server/products/getProducts';

describe('useFilters hook', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Cozy sweater',
      slug: 'cozy-sweater',
      date: '2025-09-10',
      category: 6,
      tags: [4, 5, 14],
      image: '/images/products/product-1.jpg',
      price: 20,
      inStock: true,
      SKU: 'CS',
      variationAttributes: [
        {
          type: 'colour',
          options: [1, 2, 3],
        },
        {
          type: 'size',
          options: [4, 5, 6],
        },
      ],
      variations: [
        {
          id: 1001,
          colourId: 1,
          sizeId: 4,
          price: 20,
          stock: 5,
          SKU: 'CS-BLACK-S',
        },
        {
          id: 1002,
          colourId: 1,
          sizeId: 5,
          price: 22.5,
          stock: 15,
          SKU: 'CS-BLACK-M',
        },
        {
          id: 1003,
          colourId: 1,
          sizeId: 6,
          price: 25,
          stock: 15,
          SKU: 'CS-BLACK-L',
        },
        {
          id: 1004,
          colourId: 2,
          sizeId: 4,
          price: 20,
          stock: 5,
          SKU: 'CS-GREEN-S',
        },
        {
          id: 1005,
          colourId: 2,
          sizeId: 5,
          price: 22.5,
          stock: 5,
          SKU: 'CS-GREEN-M',
        },
        {
          id: 1006,
          colourId: 3,
          sizeId: 4,
          price: 20,
          stock: 5,
          SKU: 'CS-RED-S',
        },
      ],
      reviewCount: 2,
      averageReview: 5,
      relatedProducts: [10, 3, 2],
    },
    {
      id: 2,
      title: 'Autumn beanie',
      slug: 'autumn-beanie',
      date: '2025-09-09',
      category: 3,
      tags: [1, 4, 5, 7, 13],
      image: '/images/products/product-5.jpg',
      price: 20,
      inStock: true,
      SKU: 'AB',
      variationAttributes: [
        {
          type: 'colour',
          options: [1, 2, 3],
        },
      ],
      variations: [
        {
          id: 2001,
          colourId: 1,
          price: 20,
          stock: 5,
          SKU: 'AB-BLACK',
        },
        {
          id: 2002,
          colourId: 2,
          price: 20,
          stock: 5,
          SKU: 'AB-GREEN',
        },
        {
          id: 2003,
          colourId: 3,
          price: 20,
          stock: 5,
          SKU: 'AB-RED',
        },
      ],
      reviewCount: 1,
      averageReview: 4,
      relatedProducts: [1, 10, 9],
    },
    {
      id: 3,
      title: 'Baby mittens',
      slug: 'baby-mittens',
      date: '2025-09-08',
      category: 2,
      tags: [2, 8, 13, 15],
      image: '/images/products/product-7.jpg',
      price: 10,
      inStock: true,
      SKU: 'BM',
      variationAttributes: [
        {
          type: 'size',
          options: [4, 5, 6],
        },
      ],
      variations: [
        {
          id: 3001,
          sizeId: 4,
          price: 12.5,
          stock: 5,
          SKU: 'BM-S',
        },
        {
          id: 3002,
          sizeId: 5,
          price: 15.5,
          stock: 5,
          SKU: 'BM-M',
        },
        {
          id: 3003,
          sizeId: 6,
          price: 17.5,
          stock: 5,
          SKU: 'BM-L',
        },
      ],
      reviewCount: 3,
      averageReview: 4.67,
      relatedProducts: [10, 7, 4],
    },
    {
      id: 4,
      title: 'Handmade bonnet',
      slug: 'handmade-bonnet',
      date: '2025-09-07',
      category: 3,
      tags: [5, 9, 13, 15],
      image: '/images/products/product-10.jpg',
      price: 20,
      inStock: true,
      stock: 5,
      SKU: 'HB',
      reviewCount: 2,
      averageReview: 3.5,
      relatedProducts: [1, 10, 6],
    },
    {
      id: 5,
      title: 'Knitted bag',
      slug: 'knitted-bag',
      date: '2025-09-06',
      category: 1,
      tags: [3, 10, 15],
      image: '/images/products/product-13.jpg',
      price: 15,
      inStock: false,
      SKU: 'KB',
      reviewCount: 1,
      averageReview: 5,
      relatedProducts: [7, 9, 10],
    },
    {
      id: 6,
      title: 'Scarf knitwear',
      slug: 'scarf-knitwear',
      date: '2025-09-05',
      category: 5,
      tags: [5, 11, 13, 14],
      image: '/images/products/product-6.jpg',
      price: 15,
      inStock: true,
      SKU: 'SK',
      reviewCount: 2,
      averageReview: 3.5,
      relatedProducts: [8, 10, 4],
    },
    {
      id: 7,
      title: 'Sewn handbag',
      slug: 'sewn-handbag',
      date: '2025-09-04',
      category: 1,
      tags: [1, 3, 10, 15],
      image: '/images/products/product-12.jpg',
      price: 10,
      inStock: true,
      SKU: 'SH',
      reviewCount: 2,
      averageReview: 2.5,
      relatedProducts: [10, 2, 8],
    },
    {
      id: 8,
      title: 'Stylish jeans',
      slug: 'stylish-jeans',
      date: '2025-09-03',
      category: 4,
      tags: [6, 12, 13, 15],
      image: '/images/products/product-8.jpg',
      price: 40,
      inStock: true,
      SKU: 'SJ',
      reviewCount: 2,
      averageReview: 2,
      relatedProducts: [10, 7, 2],
    },
    {
      id: 9,
      title: 'Wool scarf',
      slug: 'wool-scarf',
      date: '2025-09-02',
      category: 5,
      tags: [5, 11, 14, 15],
      image: '/images/products/product-9.jpg',
      price: 20,
      inStock: true,
      SKU: 'WS',
      reviewCount: 2,
      averageReview: 5,
      relatedProducts: [8, 7, 6],
    },
    {
      id: 10,
      title: 'Yarn scarf',
      slug: 'yarn-scarf',
      date: '2025-09-01',
      category: 5,
      tags: [5, 10, 13, 15],
      image: '/images/products/product-14.jpg',
      price: 15,
      inStock: true,
      SKU: 'YS',
      reviewCount: 1,
      averageReview: 1,
      relatedProducts: [3, 4, 1],
    },
  ];

  const mockShowPagination = true;

  const resetPaginationMock = vi.fn();

  const mockPriceFilterMinMax = {
    minPrice: 10,
    maxPrice: 40,
  };

  const mockFilteredProducts = [
    {
      id: 5,
      title: 'Knitted bag',
      slug: 'knitted-bag',
      date: '2025-09-06',
      category: 1,
      tags: [3, 10, 15],
      image: '/images/products/product-13.jpg',
      price: 15,
      inStock: false,
      SKU: 'KB',
      reviewCount: 1,
      averageReview: 5,
      relatedProducts: [7, 9, 10],
    },
    {
      id: 7,
      title: 'Sewn handbag',
      slug: 'sewn-handbag',
      date: '2025-09-04',
      category: 1,
      tags: [1, 3, 10, 15],
      image: '/images/products/product-12.jpg',
      price: 10,
      inStock: true,
      SKU: 'SH',
      reviewCount: 2,
      averageReview: 2.5,
      relatedProducts: [10, 2, 8],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches min and max product price values and sets priceFilterMinMax state', async () => {
    getProductsMinMaxPrices.mockResolvedValue(mockPriceFilterMinMax);

    const { result } = renderHook(() => useFilters(mockProducts, mockShowPagination, resetPaginationMock));

    expect(result.current.priceFilterMinMax).toEqual(undefined);

    await waitFor(() => {
      expect(result.current.priceFilterMinMax).toEqual(mockPriceFilterMinMax);
      expect(result.current.priceFilterMinMax.minPrice).toBe(10);
      expect(result.current.priceFilterMinMax.maxPrice).toBe(40);
    });
  });

  test('calculates initial filterCounts values for products within list', async () => {
    const { result } = renderHook(() => useFilters(mockProducts, mockShowPagination, resetPaginationMock));

    await waitFor(() => {
      expect(result.current.filterCounts).toEqual({
        category: {
          1: 2,
          2: 1,
          3: 2,
          4: 1,
          5: 3,
          6: 1,
        },
        colour: {
          1: 2,
          2: 2,
          3: 2,
        },
        size: {
          4: 2,
          5: 2,
          6: 2,
        },
        rating: {
          1: 1,
          2: 2,
          3: 2,
          4: 2,
          5: 3,
        },
        stock: {
          true: 9,
          false: 1,
        },
      });
    });
  });

  test('sets initial filteredProducts state to all products', async () => {
    let result;

    await act(async () => {
      result = renderHook(() => useFilters(mockProducts, mockShowPagination, resetPaginationMock)).result;
    });

    expect(result.current.filteredProducts).toEqual(mockProducts);
    expect(resetPaginationMock).toHaveBeenCalled();
  });

  test('updates filteredProducts state when a filter option is selected', async () => {
    vi.useFakeTimers();

    let result;

    await act(async () => {
      result = renderHook(() => useFilters(mockProducts, mockShowPagination, resetPaginationMock, 300)).result;
    });

    act(() => {
      result.current.handleFilterListToggle('category', 1);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filteredProducts).toEqual(mockFilteredProducts);
    expect(resetPaginationMock).toHaveBeenCalled();

    vi.useRealTimers();
  });

  test('recalculates filterCounts values when a filter option is selected', async () => {
    vi.useFakeTimers();

    let result;

    await act(async () => {
      result = renderHook(() => useFilters(mockProducts, mockShowPagination, resetPaginationMock, 300)).result;
    });

    act(() => {
      result.current.handleFilterListToggle('category', 1);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filterCounts).toEqual({
      category: {
        1: 2,
      },
      colour: {},
      size: {},
      rating: {
        1: 0,
        2: 1,
        3: 0,
        4: 0,
        5: 1,
      },
      stock: {
        false: 1,
        true: 1,
      },
    });
  });

  test('updates checkbox active filters on handleFilterListToggle', async () => {
    let result;

    await act(async () => {
      result = renderHook(() => useFilters(mockProducts, mockShowPagination, resetPaginationMock, 300)).result;
    });

    act(() => {
      result.current.handleFilterListToggle('category', 'category-1');
    });

    expect(result.current.activeFilters.category[0]).toBe('category-1');
  });

  test('updates price filter on handleFilterListPrices', async () => {
    let result;

    await act(async () => {
      result = renderHook(() => useFilters(mockProducts, mockShowPagination, resetPaginationMock, 300)).result;
    });

    act(() => {
      result.current.handleFilterListPrices(10, 40);
    });

    expect(result.current.activeFilters.price.filterMinPrice).toBe(10);
    expect(result.current.activeFilters.price.filterMaxPrice).toBe(40);
  });
});
