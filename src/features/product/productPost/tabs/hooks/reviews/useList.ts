import { useState, useEffect } from 'react';

import { getReviewsById } from '@server/products/getReviews';
import type { Product } from '@typings/products/product';
import type { Review } from '@typings/products/review';

export default function useList(product: Product) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!product?.reviewCount) {
        setReviews([]);
        return;
      }

      try {
        const productReviews = await getReviewsById(product.id);
        setReviews(productReviews);
      } catch (error) {
        console.error('Failed to fetch reviews.', error);
      }
    };

    fetchReviews();
  }, [product]);

  return { reviews, setReviews };
}
