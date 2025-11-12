import { useState, useEffect } from 'react';
import { getProductArray } from '@server/products/getProduct';

export default function useRelated(singleProduct) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!singleProduct || !singleProduct.relatedProducts) {
      setRelatedProducts([]);
      return;
    }

    const fetchRelated = async () => {
      try {
        const products = await getProductArray(singleProduct.relatedProducts);
        if (products) setRelatedProducts(products);
      } catch (error) {
        console.error('Failed to fetch related products.', error);
      }
    };

    fetchRelated();
  }, [singleProduct]);

  return relatedProducts;
}
