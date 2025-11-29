import { z } from 'zod';
import { Category } from '@typings/posts/category';
import { CategorySchema } from '@schemas/posts/category.schema';

export async function getCategory<K extends 'id' | 'slug'>(field: K, value: Category[K]): Promise<Category | undefined> {
  try {
    const res = await fetch('/data/post-categories.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-categories.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(CategorySchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const categories = parsed.data;
    const category = categories.find((category) => category[field] === value);

    return category;
  } catch (error) {
    console.error('getCategory', error);
    throw error;
  }
}

export function getCategoryById(id: number) {
  return getCategory('id', id);
}

export function getCategoryBySlug(slug: string) {
  return getCategory('slug', slug);
}

export async function getCategoryMap(categoryIds: number[]): Promise<Record<number, Category>> {
  try {
    const res = await fetch('/data/post-categories.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-categories.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(CategorySchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const categories = parsed.data;
    const categoryMap: Record<number, Category> = {};

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
