import { useState, useEffect } from 'react';

import { getCategoryById } from '@server/products/getCategory';
import type { Product } from '@typings/products/product';
import type { Category } from '@typings/products/category';

export default function useBreadcrumb(product: Product) {
  const [breadcrumbCategory, setBreadcrumbCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!product?.category) {
        setBreadcrumbCategory(null);
        return;
      }

      try {
        const category = await getCategoryById(product.category);
        setBreadcrumbCategory(category || null);
      } catch (error) {
        console.error('Failed to fetch category.', error);
      }
    };

    fetchCategory();
  }, [product]);

  return breadcrumbCategory;
}
