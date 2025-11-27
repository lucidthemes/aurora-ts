import { Category } from '@typings/products/category';

export async function getCategories(): Promise<Category[] | undefined> {
  try {
    const res = await fetch('/data/product-categories.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-categories.json: ${res.status}`);
    }

    const categories: Category[] = await res.json();

    return categories;
  } catch (error) {
    console.error('getCategories', error);
    throw error;
  }
}
