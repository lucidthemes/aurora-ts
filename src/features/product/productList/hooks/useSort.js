import { useState } from 'react';

function sortProducts(products, sortOption) {
  let sorted = [...products];

  switch (sortOption) {
    case 'date':
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'rating-desc':
      sorted.sort((a, b) => b.averageReview - a.averageReview);
      break;
    case 'rating-asc':
      sorted.sort((a, b) => a.averageReview - b.averageReview);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
  }

  return sorted;
}

export default function useSort(products, showPagination, resetPagination) {
  const [sortOption, setSortOption] = useState('date');

  const sortedProducts = sortProducts(products, sortOption);

  const handleSortChange = (e) => {
    const { value } = e.target;
    if (value) {
      setSortOption(value);
      if (showPagination) resetPagination();
    }
  };

  return { sortedProducts, sortOption, handleSortChange };
}
