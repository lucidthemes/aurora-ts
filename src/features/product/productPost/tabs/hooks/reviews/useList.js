import { useState, useEffect } from 'react';
import { getReviewsById } from '@server/products/getReviews';

export default function useList(singleProduct) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!singleProduct || !singleProduct.reviewCount) {
      setReviews([]);
      return;
    }

    const fetchReviews = async () => {
      try {
        const productReviews = await getReviewsById(singleProduct.id);
        if (productReviews) setReviews(productReviews);
      } catch (error) {
        console.error('Failed to fetch reviews.', error);
      }
    };

    fetchReviews();
  }, [singleProduct]);

  return { reviews, setReviews };
}
