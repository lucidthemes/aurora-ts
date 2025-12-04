import { useState, useEffect } from 'react';
import { getProductBySlug } from '@server/products/getProduct';

export default function useSingleProduct(slug) {
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setSingleProduct(null);
        return;
      }

      try {
        const product = await getProductBySlug(slug);
        setSingleProduct(product || false);
      } catch (error) {
        console.error('Failed to fetch product.', error);
      }
    };

    fetchProduct();
  }, [slug]);

  return singleProduct;
}
