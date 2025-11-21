import { useState, useEffect } from 'react';
import { getCategoryById } from '@server/products/getCategory';

export default function useBreadcrumb(singleProduct) {
  const [breadcrumbCategory, setBreadcrumbCategory] = useState(null);

  useEffect(() => {
    if (!singleProduct || !singleProduct.category) {
      setBreadcrumbCategory(null);
      return;
    }

    const fetchCategory = async () => {
      try {
        const category = await getCategoryById(singleProduct.category);
        if (category) setBreadcrumbCategory(category);
      } catch (error) {
        console.error('Failed to fetch category.', error);
      }
    };

    fetchCategory();
  }, [singleProduct]);

  return breadcrumbCategory;
}
