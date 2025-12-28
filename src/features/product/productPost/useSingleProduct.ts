import { useState, useEffect } from 'react';

import { getProductBySlug } from '@server/products/getProduct';
import type { Product } from '@typings/products/product';

type SingleProductState = { status: 'loading' } | { status: 'not-found' } | { status: 'loaded'; product: Product };

export default function useSingleProduct(slug: string | undefined) {
  const [singleProduct, setSingleProduct] = useState<SingleProductState>({ status: 'loading' });

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
