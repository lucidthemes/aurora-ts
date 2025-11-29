import { z } from 'zod';
import { Product } from '@typings/products/product';
import { ProductSchema } from '@schemas/products/product.schema';

export async function getProducts(limit?: number, category?: number, tag?: number): Promise<Product[]> {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(ProductSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    let products = parsed.data;

    if (limit && limit > 0) {
      products = products.slice(0, limit);
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    if (tag) {
      products = products.filter((product) => product.tags?.includes(tag));
    }

    return products;
  } catch (error) {
    console.error('getProducts', error);
    throw error;
  }
}

export async function getProductsMinMaxPrices(): Promise<{ minPrice: number; maxPrice: number }> {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(ProductSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const products = parsed.data;

    const prices = products.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (!Number.isFinite(minPrice) || !Number.isFinite(maxPrice)) {
      throw new Error('Invalid price');
    }

    return { minPrice, maxPrice };
  } catch (error) {
    console.error('getProductsMinMaxPrices', error);
    throw error;
  }
}
