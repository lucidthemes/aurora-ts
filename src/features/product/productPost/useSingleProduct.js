import { useState, useEffect } from 'react';
import { getProductBySlug } from '@server/products/getProduct';

export default function useSingleProduct(slug) {
  const [singleProduct, setSingleProduct] = useState({ status: 'loading' });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setSingleProduct({ status: 'not-found' });
        return;
      }

      try {
        setSingleProduct({ status: 'loading' });

        const product = await getProductBySlug(slug);

        if (!product) {
          setSingleProduct({ status: 'not-found' });
          return;
        }

        setSingleProduct({ status: 'loaded', product });
      } catch (error) {
        console.error('Failed to fetch product.', error);
        setSingleProduct({ status: 'not-found' });
      }
    };

    fetchProduct();
  }, [slug]);

  return singleProduct;
}
