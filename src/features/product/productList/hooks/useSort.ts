import { useState } from 'react';
import type { ChangeEventHandler } from 'react';

import type { Product } from '@typings/products/product';

type SortOption = 'date' | 'rating-desc' | 'rating-asc' | 'price-desc' | 'price-asc';

function sortProducts(products: Product[], showSort?: boolean, sortOption?: SortOption) {
  if (showSort === false) return products;

  let sorted = [...products];

  switch (sortOption) {
    case 'date':
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case 'rating-desc':
      sorted.sort((a, b) => (b.averageReview ?? 0) - (a.averageReview ?? 0));
      break;
    case 'rating-asc':
      sorted.sort((a, b) => (a.averageReview ?? 0) - (b.averageReview ?? 0));
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

export default function useSort(products: Product[], resetPagination: () => void, showSort?: boolean, showPagination?: boolean) {
  const [sortOption, setSortOption] = useState<SortOption>('date');

  const sortedProducts = sortProducts(products, showSort, sortOption);

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value as SortOption;
    setSortOption(value);
    if (showPagination) resetPagination();
  };

  return { sortedProducts, sortOption, handleSortChange };
}
