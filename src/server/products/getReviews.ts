import { z } from 'zod';
import { Review } from '@typings/products/review';
import { ReviewSchema } from '@schemas/products/review.schema';

export async function getReviews<K extends 'productId'>(field: K, value: Review[K]): Promise<Review[]> {
  try {
    const res = await fetch('/data/product-reviews.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-reviews.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(ReviewSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const allReviews = parsed.data;
    const reviews = allReviews.filter((review) => review[field] === value);

    return reviews;
  } catch (error) {
    console.error('getReviews', error);
    throw error;
  }
}

export function getReviewsById(id: number) {
  return getReviews('productId', id);
}
