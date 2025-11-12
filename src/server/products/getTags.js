export async function getTagsArray(tagIds) {
  try {
    const res = await fetch('/data/product-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-tags.json: ${res.status}`);
    }

    const tags = await res.json();
    const idSet = new Set(tagIds);
    const tagArray = tags.filter((tag) => idSet.has(tag.id));

    if (!tagArray) return;

    return tagArray;
  } catch (error) {
    console.error('getTagsArray', error);
    throw error;
  }
}
