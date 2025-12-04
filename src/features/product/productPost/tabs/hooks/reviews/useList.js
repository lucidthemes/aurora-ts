import { useState, useEffect } from 'react';
import { getReviewsById } from '@server/products/getReviews';

export default function useList(singleProduct) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!singleProduct?.reviewCount) {
        setReviews([]);
        return;
      }

      try {
        const productReviews = await getReviewsById(singleProduct.id);
        setReviews(productReviews);
      } catch (error) {
        console.error('Failed to fetch reviews.', error);
      }
    };

    fetchReviews();
  }, [singleProduct]);

  return { reviews, setReviews };
}
