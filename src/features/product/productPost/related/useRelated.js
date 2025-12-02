import { useState, useEffect } from 'react';
import { getProductArray } from '@server/products/getProduct';

export default function useRelated(singleProduct) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!singleProduct?.relatedProducts) {
        setRelatedProducts([]);
        return;
      }

      try {
        const products = await getProductArray(singleProduct.relatedProducts);
        setRelatedProducts(products);
      } catch (error) {
        console.error('Failed to fetch related products.', error);
      }
    };

    fetchRelated();
  }, [singleProduct]);

  return relatedProducts;
}
