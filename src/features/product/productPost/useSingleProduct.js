import { useState, useEffect } from 'react';
import { getProductBySlug } from '@server/products/getProduct';

export default function useSingleProduct(slug) {
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    if (!slug) {
      setSingleProduct(null);
      return;
    }

    const fetchProduct = async () => {
      try {
        const product = await getProductBySlug(slug);
        if (product) {
          setSingleProduct(product);
        } else {
          setSingleProduct(false);
        }
      } catch (error) {
        console.error('Failed to fetch product.', error);
      }
    };

    fetchProduct();
  }, [slug]);

  return singleProduct;
}
