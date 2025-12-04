import { useState, useEffect } from 'react';
import { getProductsMinMaxPrices } from '@server/products/getProducts';

function filterProducts(products, showFilter, activeFilters) {
  if (
    showFilter === false ||
    (activeFilters.category.length === 0 &&
      activeFilters.colour.length === 0 &&
      activeFilters.size.length === 0 &&
      activeFilters.rating.length === 0 &&
      activeFilters.stock.length === 0 &&
      Object.keys(activeFilters.price).length === 0)
  ) {
    return products;
  }

  let filtered = [...products];

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
        const productColours = product.variationAttributes.find((attribute) => attribute.type === 'colour');
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
        return activeFilters.rating.some((rating) => product.averageReview >= rating && product.averageReview < rating + 1);
      }
    });
  }

  if (activeFilters.stock.length > 0) {
    filtered = filtered.filter((product) => {
      if (Object.hasOwn(product, 'inStock')) {
        return activeFilters.stock.includes(product.inStock);
      }
    });
  }

  if (Object.keys(activeFilters.price).length > 0) {
    const minPrice = activeFilters.price.filterMinPrice;
    const maxPrice = activeFilters.price.filterMaxPrice;
    if (minPrice && maxPrice) {
      filtered = filtered.filter((product) => {
        if (Object.hasOwn(product, 'price')) {
          return product.price >= minPrice && product.price <= maxPrice;
        }
      });
    }
  }

  return filtered;
}

function calculatefilterCounts(filteredProducts, showFilter) {
  if (!filteredProducts || showFilter === false) return;

  const counts = {
    category: {},
    colour: {},
    size: {},
    rating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    stock: {},
  };

  filteredProducts.forEach((product) => {
    if (Object.hasOwn(product, 'category')) {
      counts.category[product.category] = (counts.category[product.category] || 0) + 1;
    }

    if (Object.hasOwn(product, 'variationAttributes')) {
      product.variationAttributes.forEach((attribute) => {
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

    if (Object.hasOwn(product, 'averageReview')) {
      if (product.averageReview >= 0 && product.averageReview < 2) counts.rating[1] += 1;
      if (product.averageReview >= 2 && product.averageReview < 3) counts.rating[2] += 1;
      if (product.averageReview >= 3 && product.averageReview < 4) counts.rating[3] += 1;
      if (product.averageReview >= 4 && product.averageReview < 5) counts.rating[4] += 1;
      if (product.averageReview === 5) counts.rating[5] += 1;
    }

    if (Object.hasOwn(product, 'inStock')) {
      counts.stock[product.inStock] = (counts.stock[product.inStock] || 0) + 1;
    }
  });

  return counts;
}

export default function useFilters(products, showFilter, showPagination, resetPagination) {
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    colour: [],
    size: [],
    rating: [],
    stock: [],
    price: {},
  });

  const [priceFilterMinMax, setPriceFilterMinMax] = useState();

  useEffect(() => {
    const fetchProductsMinMaxPrices = async () => {
      try {
        const productsMinMaxPrices = await getProductsMinMaxPrices();
        if (productsMinMaxPrices) setPriceFilterMinMax(productsMinMaxPrices);
      } catch (error) {
        console.error('Failed to fetch product prices.', error);
      }
    };

    fetchProductsMinMaxPrices();
  }, [products]);

  const filteredProducts = filterProducts(products, showFilter, activeFilters);

  const filterCounts = calculatefilterCounts(filteredProducts, showFilter);

  const handleFilterListToggle = (filterKey, value) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterKey] || [];
      const isActive = currentValues.includes(value);
      const updatedValues = isActive ? currentValues.filter((id) => id !== value) : [...currentValues, value];

      return {
        ...prev,
        [filterKey]: updatedValues,
      };
    });

    if (showPagination) resetPagination();
  };

  const handleFilterListPrices = (filterMinPrice, filterMaxPrice) => {
    setActiveFilters((prev) => ({
      ...prev,
      price: { filterMinPrice, filterMaxPrice },
    }));

    if (showPagination) resetPagination();
  };

  return { filteredProducts, filterCounts, activeFilters, priceFilterMinMax, handleFilterListToggle, handleFilterListPrices };
}
