import { z } from 'zod';

import { CategorySchema } from '@schemas/products/category.schema';
import type { Category } from '@typings/products/category';

export async function getCategory<K extends 'id' | 'slug'>(field: K, value: Category[K]): Promise<Category | undefined> {
  try {
    const res = await fetch('/data/product-categories.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-categories.json: ${res.status}`);
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
