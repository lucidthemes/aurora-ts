import { renderHook, act } from '@testing-library/react';

import type { PriceFilterMinMax } from '@typings/products/filter';
import { createRangeChangeEvent } from '@utils/tests/events';

import useFilterPrice from '../../hooks/filters/useFilterPrice';

describe('useFilterPrice hook', () => {
  const mockPriceFilterMinMax: PriceFilterMinMax = {
    minPrice: 10,
    maxPrice: 40,
  };

  const handleFilterListPricesMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('sets initial filterPrices state using priceFilterMinMax', () => {
    const { result } = renderHook(() => useFilterPrice(mockPriceFilterMinMax, handleFilterListPricesMock));

    expect(result.current.filterPrices).toEqual({
      filterMinPrice: 10,
      filterMaxPrice: 40,
    });
  });

  test('updates filterMinPrice on handleMinPriceChange', () => {
    const { result } = renderHook(() => useFilterPrice(mockPriceFilterMinMax, handleFilterListPricesMock));

    act(() => {
      result.current.handleMinPriceChange(createRangeChangeEvent('minPrice', 10, 0, 40));
    });

    expect(result.current.filterPrices.filterMinPrice).toBe(10);
  });

  test('updates filterMaxPrice on handleMaxPriceChange', () => {
    const { result } = renderHook(() => useFilterPrice(mockPriceFilterMinMax, handleFilterListPricesMock));

    act(() => {
      result.current.handleMaxPriceChange(createRangeChangeEvent('maxPrice', 40, 0, 40));
    });

    expect(result.current.filterPrices.filterMaxPrice).toBe(40);
  });

  test('update active filters with new min/max price values using handleFilterListPrices', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useFilterPrice(mockPriceFilterMinMax, handleFilterListPricesMock));

    act(() => {
      result.current.handleMinPriceChange(createRangeChangeEvent('minPrice', 20, 0, 40));
      result.current.handleMaxPriceChange(createRangeChangeEvent('maxPrice', 30, 0, 40));
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(handleFilterListPricesMock).toHaveBeenCalledWith(20, 30);

    vi.useRealTimers();
  });
});
