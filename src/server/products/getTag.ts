import { Tag } from '@typings/products/tag';

export async function getTag<K extends 'id' | 'slug'>(field: K, value: Tag[K]): Promise<Tag | undefined> {
  try {
    const res = await fetch('/data/product-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-tags.json: ${res.status}`);
    }

    const tags: Tag[] = await res.json();
    const tag = tags.find((tag) => tag[field] === value);

    return tag;
  } catch (error) {
    console.error('getTag', error);
    throw error;
  }
}

export function getTagById(id: number) {
  return getTag('id', id);
}

export function getTagBySlug(slug: string) {
  return getTag('slug', slug);
}
