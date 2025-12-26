import { useState, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';

export default function useFilterPrice(
  priceFilterMinMax: { minPrice: number; maxPrice: number },
  handleFilterListPrices: (filterMinPrice: number, filterMaxPrice: number) => void
) {
  const [filterPrices, setFilterPrices] = useState({
    filterMinPrice: 0,
    filterMaxPrice: 0,
  });

  const [rangeInputChanged, setRangeInputChanged] = useState(false);

  useEffect(() => {
    const setDefaultFilterPrices = () => {
      setFilterPrices((prev) => ({
        ...prev,
        filterMinPrice: priceFilterMinMax.minPrice,
        filterMaxPrice: priceFilterMinMax.maxPrice,
      }));
    };

    if (!rangeInputChanged && priceFilterMinMax?.minPrice != null && priceFilterMinMax?.maxPrice != null) {
      setDefaultFilterPrices();
    }
  }, [priceFilterMinMax, rangeInputChanged]);

  const handleMinPriceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!rangeInputChanged) setRangeInputChanged(true);

    const { value, max } = e.target;
    const rangeInputValue = Number(value);
    const rangeInputMax = Number(max);

    setFilterPrices((prev) => {
      const newMinPrice = rangeInputValue;
      const newMaxPrice = prev.filterMaxPrice;

      // min price decrease
      if (newMinPrice < prev.filterMinPrice) {
        return {
          ...prev,
          filterMinPrice: newMinPrice,
        };
      }

      // min price increase
      if (newMinPrice > prev.filterMinPrice && newMinPrice <= rangeInputMax - 1) {
        if (newMinPrice >= newMaxPrice - 1) {
          return {
            ...prev,
            filterMinPrice: newMinPrice,
            filterMaxPrice: newMinPrice + 1,
          };
        }
        return {
          ...prev,
          filterMinPrice: newMinPrice,
        };
      }

      return prev;
    });
  };

  const handleMaxPriceChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!rangeInputChanged) setRangeInputChanged(true);

    const { value, min } = e.target;
    const rangeInputValue = Number(value);
    const rangeInputMin = Number(min);

    setFilterPrices((prev) => {
      const newMaxPrice = rangeInputValue;
      const newMinPrice = prev.filterMinPrice;

      // max price decrease
      if (newMaxPrice < prev.filterMaxPrice && newMaxPrice >= rangeInputMin + 1) {
        if (newMaxPrice <= newMinPrice + 1) {
          return {
            ...prev,
            filterMaxPrice: newMaxPrice,
            filterMinPrice: newMaxPrice - 1,
          };
        }
        return {
          ...prev,
          filterMaxPrice: newMaxPrice,
        };
      }

      // max price increase
      if (newMaxPrice > prev.filterMaxPrice) {
        return {
          ...prev,
          filterMaxPrice: newMaxPrice,
        };
      }

      return prev;
    });
  };

  // update active filters with new min/max price values
  useEffect(() => {
    // check range inputs changed by user so that price filter is only applied at that point
    if (!rangeInputChanged) return;

    const debounceTimeout = setTimeout(() => {
      handleFilterListPrices(filterPrices.filterMinPrice, filterPrices.filterMaxPrice);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filterPrices]);

  return { filterPrices, handleMinPriceChange, handleMaxPriceChange };
}
