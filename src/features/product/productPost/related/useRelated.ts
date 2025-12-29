import { useState, useEffect } from 'react';

import { getProductArray } from '@server/products/getProduct';
import type { Product } from '@typings/products/product';

export default function useRelated(product: Product) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!product?.relatedProducts) {
        setRelatedProducts([]);
        return;
      }

      try {
        const products = await getProductArray(product.relatedProducts);
        setRelatedProducts(products);
      } catch (error) {
        console.error('Failed to fetch related products.', error);
      }
    };

    fetchRelated();
  }, [product]);

  return relatedProducts;
}
