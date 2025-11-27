import { Product } from '@typings/products/product';

export async function getProducts(limit?: number, category?: number, tag?: number): Promise<Product[] | undefined> {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const products: Product[] = await res.json();

    let filteredProducts = products;

    if (limit && limit > 0) {
      filteredProducts = filteredProducts.slice(0, limit);
    }

    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    if (tag) {
      filteredProducts = filteredProducts.filter((product) => product.tags?.includes(tag));
    }

    return filteredProducts;
  } catch (error) {
    console.error('getProducts', error);
    throw error;
  }
}

export async function getProductsMinMaxPrices(): Promise<{ minPrice: number; maxPrice: number } | undefined> {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const products: Product[] = await res.json();

    const prices = products.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (!Number.isFinite(minPrice) || !Number.isFinite(maxPrice)) {
      return;
    }

    return { minPrice, maxPrice };
  } catch (error) {
    console.error('getProductsMinMaxPrices', error);
    throw error;
  }
}
