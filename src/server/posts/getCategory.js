export async function getCategory(field, value) {
  try {
    const res = await fetch('/data/post-categories.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-categories.json: ${res.status}`);
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

export async function getCategoryMap(categoryIds) {
  try {
    const res = await fetch('/data/post-categories.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-categories.json: ${res.status}`);
    }

    const categories = await res.json();

    const categoryMap = {};

    if (Array.isArray(categories) && Array.isArray(categoryIds)) {
      const idSet = new Set(categoryIds);
      categories.forEach((category) => {
        if (idSet.has(category.id)) {
          categoryMap[category.id] = category;
        }
      });
    }

    return categoryMap;
  } catch (error) {
    console.error('getCategoryMap', error);
    throw error;
  }
}
