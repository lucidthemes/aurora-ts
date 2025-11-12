export async function getCategory(field, value) {
  try {
    const res = await fetch('/data/product-categories.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-categories.json: ${res.status}`);
    }

    const categories = await res.json();
    const category = categories.find((category) => category[field] === value);

    if (!category) return;

    return category;
  } catch (error) {
    console.error('getCategory', error);
    throw error;
  }
}

export function getCategoryById(id) {
  return getCategory('id', id);
}

export function getCategoryBySlug(slug) {
  return getCategory('slug', slug);
}
