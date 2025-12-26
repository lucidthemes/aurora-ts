import { useState, useEffect } from 'react';

import { getCategories } from '@server/products/getCategories';
import type { Category } from '@typings/products/category';

export default function useFilterCategory() {
  const [filterCategories, setFilterCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setFilterCategories(categories);
      } catch (error) {
        console.error('Failed to fetch categories.', error);
      }
    };

    fetchCategories();
  }, []);

  return filterCategories;
}
