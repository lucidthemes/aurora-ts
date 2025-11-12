import { useState, useEffect } from 'react';
import { getProductsMinMaxPrices } from '@server/products/getProducts';

export default function useFilters(products, showPagination, resetPagination, debounceMs = 300) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [activeFilters, setActiveFilters] = useState({
    category: [],
    colour: [],
    size: [],
    rating: [],
    stock: [],
    price: {},
  });

  const [filterCounts, setFilterCounts] = useState({
    category: {},
    colour: {},
    size: {},
    rating: {},
    stock: {},
  });

  const [priceFilterMinMax, setPriceFilterMinMax] = useState();

  useEffect(() => {
    // get min and max product price values to use with price filter
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

  // calculate filter counts
  const calculateFilterCounts = (productsToCount) => {
    const counts = {
      category: {},
      colour: {},
      size: {},
      rating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      stock: {},
    };

    productsToCount.forEach((product) => {
      // category
      counts.category[product.category] = (counts.category[product.category] || 0) + 1;

      // variation attributes: colour & size
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

      // rating
      if (product.averageReview >= 0 && product.averageReview < 2) counts.rating[1] += 1;
      if (product.averageReview >= 2 && product.averageReview < 3) counts.rating[2] += 1;
      if (product.averageReview >= 3 && product.averageReview < 4) counts.rating[3] += 1;
      if (product.averageReview >= 4 && product.averageReview < 5) counts.rating[4] += 1;
      if (product.averageReview === 5) counts.rating[5] += 1;

      // stock
      counts.stock[product.inStock] = (counts.stock[product.inStock] || 0) + 1;
    });

    setFilterCounts(counts);
  };

  useEffect(() => {
    // calculate counts on all products first
    calculateFilterCounts(products);

    const noFilters =
      activeFilters.category.length === 0 &&
      activeFilters.colour.length === 0 &&
      activeFilters.size.length === 0 &&
      activeFilters.stock.length === 0 &&
      activeFilters.rating.length === 0 &&
      Object.keys(activeFilters.price).length === 0;

    // return all products if no filters active
    if (noFilters) {
      setFilteredProducts(products);
      if (showPagination) resetPagination();
      return;
    }

    // apply filters with debounce to prevent too many calls
    const timeout = setTimeout(() => {
      let filtered = [...products];

      // filter by category
      if (activeFilters.category.length > 0) {
        filtered = filtered.filter((product) => activeFilters.category.includes(product.category));
      }

      // filter by colour
      if (activeFilters.colour.length > 0) {
        filtered = filtered.filter((product) => {
          const colourAttr = product.variationAttributes?.find((attr) => attr.type === 'colour');
          const colours = colourAttr?.options ?? [];
          return activeFilters.colour.some((c) => colours.includes(c));
        });
      }

      // filter by size
      if (activeFilters.size.length > 0) {
        filtered = filtered.filter((product) => {
          const sizeAttr = product.variationAttributes?.find((attr) => attr.type === 'size');
          const sizes = sizeAttr?.options ?? [];
          return activeFilters.size.some((s) => sizes.includes(s));
        });
      }

      // filter by rating
      if (activeFilters.rating.length > 0) {
        filtered = filtered.filter((product) => activeFilters.rating.some((rating) => product.averageReview >= rating && product.averageReview < rating + 1));
      }

      // filter by in/out of stock
      if (activeFilters.stock.length > 0) {
        filtered = filtered.filter((product) => activeFilters.stock.includes(product.inStock));
      }

      // filter by price
      if (Object.keys(activeFilters.price).length) {
        const { filterMinPrice, filterMaxPrice } = activeFilters.price;
        filtered = filtered.filter((product) => product.price >= filterMinPrice && product.price <= filterMaxPrice);
      }

      setFilteredProducts(filtered);

      // recalculate filter counts based on filtered products
      calculateFilterCounts(filtered);

      // return pagination back to first page when filter applied
      if (showPagination) resetPagination();
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [activeFilters, products]);

  // handle filter list checkbox toggles
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
  };

  // handle price filter changes to apply filter min and max prices
  const handleFilterListPrices = (filterMinPrice, filterMaxPrice) => {
    setActiveFilters((prev) => ({
      ...prev,
      price: { filterMinPrice, filterMaxPrice },
    }));
  };

  return { filteredProducts, activeFilters, filterCounts, priceFilterMinMax, handleFilterListToggle, handleFilterListPrices };
}
