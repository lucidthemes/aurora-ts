import { useState, useEffect } from 'react';
import { getCategoryById } from '@server/products/getCategory';
import { getTagsArray } from '@server/products/getTags';

export default function useSummary(singleProduct) {
  const [summaryData, setSummaryData] = useState({
    price: singleProduct.price,
    maxQuantity: singleProduct.stock,
    SKU: singleProduct.SKU,
    category: {},
    tags: [],
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryId = singleProduct.category;

        if (!categoryId) return;

        const category = await getCategoryById(categoryId);
        if (category) {
          setSummaryData((prevData) => ({
            ...prevData,
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
        const tagIds = singleProduct.tags;

        if (!tagIds) return;

        const tagArray = await getTagsArray(tagIds);
        if (tagArray) {
          setSummaryData((prevData) => ({
            ...prevData,
            tags: tagArray,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch tag array.', error);
      }
    };

    fetchTagArray();
  }, [singleProduct]);

  return { summaryData, setSummaryData };
}
