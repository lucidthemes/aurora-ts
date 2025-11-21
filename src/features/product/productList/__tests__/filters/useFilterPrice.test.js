import { renderHook, act } from '@testing-library/react';
import useFilterPrice from '../../hooks/filters/useFilterPrice';

describe('useFilterPrice hook', () => {
  const mockPriceFilterMinMax = {
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
      result.current.handleMinPriceChange({ target: { value: 10, max: 40 } });
    });

    expect(result.current.filterPrices.filterMinPrice).toBe(10);
  });

  test('updates filterMaxPrice on handleMaxPriceChange', () => {
    const { result } = renderHook(() => useFilterPrice(mockPriceFilterMinMax, handleFilterListPricesMock));

    act(() => {
      result.current.handleMaxPriceChange({ target: { value: 40, max: 40 } });
    });

    expect(result.current.filterPrices.filterMaxPrice).toBe(40);
  });

  test('update active filters with new min/max price values using handleFilterListPrices', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useFilterPrice(mockPriceFilterMinMax, handleFilterListPricesMock));

    act(() => {
      result.current.handleMinPriceChange({ target: { value: 20, max: 40 } });
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(handleFilterListPricesMock).toHaveBeenCalledWith(20, 40);

    vi.useRealTimers();
  });
});
