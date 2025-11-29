import { z } from 'zod';
import { Category } from '@typings/products/category';
import { CategorySchema } from '@schemas/products/category.schema';

export async function getCategories(): Promise<Category[]> {
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

    return categories;
  } catch (error) {
    console.error('getCategories', error);
    throw error;
  }
}
