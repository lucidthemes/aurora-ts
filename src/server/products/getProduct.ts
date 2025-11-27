import { Product } from '@typings/products/product';

export async function getProduct<K extends 'id' | 'slug'>(field: K, value: Product[K]): Promise<Product | undefined> {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const products: Product[] = await res.json();
    const product = products.find((product) => product[field] === value);

    return product;
  } catch (error) {
    console.error('getProduct', error);
    throw error;
  }
}

export function getProductById(id: number) {
  return getProduct('id', id);
}

export function getProductBySlug(slug: string) {
  return getProduct('slug', slug);
}

export async function getProductArray(productIds: number[]): Promise<Product[] | undefined> {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const products: Product[] = await res.json();
    const idSet = new Set(productIds);
    const productArray = products.filter((product) => idSet.has(product.id));

    return productArray;
  } catch (error) {
    console.error('getProductArray', error);
    throw error;
  }
}
