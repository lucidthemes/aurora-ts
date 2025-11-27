import { Review } from '@typings/products/review';

export async function getReviews<K extends 'productId'>(field: K, value: Review[K]): Promise<Review[] | undefined> {
  try {
    const res = await fetch('/data/product-reviews.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-reviews.json: ${res.status}`);
    }

    const allReviews: Review[] = await res.json();
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
