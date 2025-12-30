import { useState, useEffect } from 'react';

import { getCategoryById } from '@server/products/getCategory';
import { getTagsArray } from '@server/products/getTags';
import type { Product } from '@typings/products/product';
import type { SummaryData } from '@typings/products/summary';

export default function useSummary(product: Product) {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    price: product.price,
    maxQuantity: product.stock,
    SKU: product.SKU,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryId = product.category;

        if (!categoryId) return;

        const category = await getCategoryById(categoryId);
        if (category) {
          setSummaryData((prevState) => ({
            ...prevState,
            category: category,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch category.', error);
      }
    };

    fetchCategory();

    const fetchTagArray = async () => {
      try {
        const tagIds = product.tags;

        if (!tagIds) return;

        const tagArray = await getTagsArray(tagIds);
        if (tagArray) {
          setSummaryData((prevState) => ({
            ...prevState,
            tags: tagArray,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch tag array.', error);
      }
    };

    fetchTagArray();
  }, [product]);

  return { summaryData, setSummaryData };
}
