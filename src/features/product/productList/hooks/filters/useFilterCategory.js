import { useState, useEffect } from 'react';
import { getCategories } from '@server/products/getCategories';

export default function useFilterCategory() {
  const [filterCategories, setFilterCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        if (categories) setFilterCategories(categories);
      } catch (error) {
        console.error('Failed to fetch categories.', error);
      }
    };

    fetchCategories();
  }, []);

  return filterCategories;
}
