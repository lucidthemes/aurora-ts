import { Tag } from '@typings/products/tag';

export async function getTagsArray(tagIds: number[]): Promise<Tag[] | undefined> {
  try {
    const res = await fetch('/data/product-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-tags.json: ${res.status}`);
    }

    const tags: Tag[] = await res.json();
    const idSet = new Set(tagIds);
    const tagArray = tags.filter((tag) => idSet.has(tag.id));

    return tagArray;
  } catch (error) {
    console.error('getTagsArray', error);
    throw error;
  }
}
