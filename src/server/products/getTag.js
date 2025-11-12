export async function getTag(field, value) {
  try {
    const res = await fetch('/data/product-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-tags.json: ${res.status}`);
    }

    const tags = await res.json();
    const tag = tags.find((tag) => tag[field] === value);

    if (!tag) return;

    return tag;
  } catch (error) {
    console.error('getTag', error);
    throw error;
  }
}

export function getTagById(id) {
  return getTag('id', id);
}

export function getTagBySlug(slug) {
  return getTag('slug', slug);
}
