import { useState, useEffect } from 'react';

import { getProductsMinMaxPrices } from '@server/products/getProducts';
import type { Product } from '@typings/products/product';
import type { PriceFilterMinMax, ActiveFilters, FilterCounts } from '@typings/products/filter';

function filterProducts(products: Product[], showFilter?: boolean, activeFilters?: ActiveFilters) {
  if (
    showFilter === false ||
    (activeFilters &&
      activeFilters.category.length === 0 &&
      activeFilters.colour.length === 0 &&
      activeFilters.size.length === 0 &&
      activeFilters.rating.length === 0 &&
      activeFilters.stock.length === 0 &&
      Object.keys(activeFilters.price).length === 0)
  ) {
    return products;
  }

  let filtered = [...products];

  if (activeFilters) {
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter((product) => {
        if (Object.hasOwn(product, 'category')) {
          return activeFilters.category.includes(product.category);
        }
      });
    }

    if (activeFilters.colour.length > 0) {
      filtered = filtered.filter((product) => {
        if (Object.hasOwn(product, 'variationAttributes')) {
          const productColours = product.variationAttributes?.find((attribute) => attribute.type === 'colour');
          if (productColours) {
            return activeFilters.colour.some((colour) => productColours.options.includes(colour));
          }
        }
      });
    }

    if (activeFilters.size.length > 0) {
      filtered = filtered.filter((product) => {
        if (Object.hasOwn(product, 'variationAttributes')) {
          const productSizes = product.variationAttributes?.find((attribute) => attribute.type === 'size');
          if (productSizes) {
            return activeFilters.size.some((size) => productSizes.options.includes(size));
          }
        }
      });
    }

    if (activeFilters.rating.length > 0) {
      filtered = filtered.filter((product) => {
        if (Object.hasOwn(product, 'averageReview')) {
          return activeFilters.rating.some((rating) => {
            if (product.averageReview) {
              return product.averageReview >= rating && product.averageReview < rating + 1;
            }
          });
        }
      });
    }

    if (activeFilters.stock.length > 0) {
      filtered = filtered.filter((product) => {
        if (Object.hasOwn(product, 'inStock')) {
          if ((activeFilters.stock.includes('in') && product.inStock === true) || (activeFilters.stock.includes('out') && product.inStock === false)) {
            return product;
          }
          //return activeFilters.stock.includes(product.inStock);
        }
      });
    }

    if (Object.keys(activeFilters.price).length > 0) {
      const minPrice = activeFilters.price.minPrice;
      const maxPrice = activeFilters.price.maxPrice;
      if (minPrice && maxPrice) {
        filtered = filtered.filter((product) => {
          if (Object.hasOwn(product, 'price')) {
            return product.price >= minPrice && product.price <= maxPrice;
          }
        });
      }
    }
  }

  return filtered;
}

function calculatefilterCounts(filteredProducts: Product[], showFilter?: boolean) {
  if (!filteredProducts || showFilter === false) return;

  // interface test {
  //   category: Record<number, number>;
  //   colour: Record<number, number>;
  //   size: Record<number, number>;
  //   rating: Record<number, number>;
  //   stock: Record<string, number>;
  // }

  const counts: FilterCounts = {
    category: {},
    colour: {},
    size: {},
    rating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    stock: {},
  };

  filteredProducts.forEach((product) => {
    if (Object.hasOwn(product, 'category') && product.category) {
      counts.category[product.category] = (counts.category[product.category] || 0) + 1;
    }

    if (Object.hasOwn(product, 'variationAttributes')) {
      product.variationAttributes?.forEach((attribute) => {
        if (attribute.type === 'colour') {
          attribute.options.forEach((colour) => {
            counts.colour[colour] = (counts.colour[colour] || 0) + 1;
          });
        }

        if (attribute.type === 'size') {
          attribute.options.forEach((size) => {
            counts.size[size] = (counts.size[size] || 0) + 1;
          });
        }
      });
    }

    if (Object.hasOwn(product, 'averageReview') && product.averageReview) {
      if (product.averageReview >= 0 && product.averageReview < 2) counts.rating[1] += 1;
      if (product.averageReview >= 2 && product.averageReview < 3) counts.rating[2] += 1;
      if (product.averageReview >= 3 && product.averageReview < 4) counts.rating[3] += 1;
      if (product.averageReview >= 4 && product.averageReview < 5) counts.rating[4] += 1;
      if (product.averageReview === 5) counts.rating[5] += 1;
    }

    if (Object.hasOwn(product, 'inStock') && product.inStock) {
      counts.stock[product.inStock] = (counts.stock[product.inStock] || 0) + 1;
    }
  });

  return counts;
}

export default function useFilters(products: Product[], showFilter?: boolean, showPagination?: boolean, resetPagination?: () => void) {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    category: [],
    colour: [],
    size: [],
    rating: [],
    stock: [],
    price: { minPrice: 0, maxPrice: 0 },
  });

  const [priceFilterMinMax, setPriceFilterMinMax] = useState<PriceFilterMinMax>();

  useEffect(() => {
    const fetchProductsMinMaxPrices = async () => {
      try {
        const productsMinMaxPrices = await getProductsMinMaxPrices();
        setPriceFilterMinMax(productsMinMaxPrices);
      } catch (error) {
        console.error('Failed to fetch product prices.', error);
      }
    };

    fetchProductsMinMaxPrices();
  }, [products]);

  const filteredProducts = filterProducts(products, showFilter, activeFilters);

  const filterCounts = calculatefilterCounts(filteredProducts, showFilter);

  const handleFilterListToggle = (filterKey: string, value: number | string) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterKey] || [];
      const isActive = currentValues.includes(value);
      const updatedValues = isActive ? currentValues.filter((id: number) => id !== value) : [...currentValues, value];

      return {
        ...prev,
        [filterKey]: updatedValues,
      };
    });

    if (showPagination && resetPagination) resetPagination();
  };

  const handleFilterListPrices = (filterMinPrice: number, filterMaxPrice: number) => {
    setActiveFilters((prev) => ({
      ...prev,
      price: { minPrice: filterMinPrice, maxPrice: filterMaxPrice },
    }));

    if (showPagination && resetPagination) resetPagination();
  };

  return { filteredProducts, filterCounts, activeFilters, priceFilterMinMax, handleFilterListToggle, handleFilterListPrices };
}
