export async function getReviews(field, value) {
  try {
    const res = await fetch('/data/product-reviews.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-reviews.json: ${res.status}`);
    }

    const allReviews = await res.json();
    const reviews = allReviews.filter((review) => review[field] === value);

    if (!reviews) return;

    return reviews;
  } catch (error) {
    console.error('getReviews', error);
    throw error;
  }
}

export function getReviewsById(id) {
  return getReviews('productId', id);
}
