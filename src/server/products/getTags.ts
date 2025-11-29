import { z } from 'zod';
import { Tag } from '@typings/products/tag';
import { TagSchema } from '@schemas/posts/tag.schema';

export async function getTagsArray(tagIds: number[]): Promise<Tag[]> {
  try {
    const res = await fetch('/data/product-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-tags.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(TagSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const tags = parsed.data;
    const idSet = new Set(tagIds);
    const tagArray = tags.filter((tag) => idSet.has(tag.id));

    return tagArray;
  } catch (error) {
    console.error('getTagsArray', error);
    throw error;
  }
}
