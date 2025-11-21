export async function getCategories() {
  try {
    const res = await fetch('/data/product-categories.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-categories.json: ${res.status}`);
    }

    const categories = await res.json();

    if (!categories) return;

    return categories;
  } catch (error) {
    console.error('getCategories', error);
    throw error;
  }
}
