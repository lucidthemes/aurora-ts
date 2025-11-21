import { useState, useEffect } from 'react';

export default function useSort(products, showPagination, resetPagination) {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState('date');

  useEffect(() => {
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

    setSortedProducts(sorted);

    if (showPagination) resetPagination();
  }, [sortOption, products]);

  const handleSortChange = (e) => {
    const { value } = e.target;
    if (value) setSortOption(value);
  };

  return { sortedProducts, sortOption, handleSortChange };
}
