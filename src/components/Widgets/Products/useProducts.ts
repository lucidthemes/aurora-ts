import { useState, useEffect } from 'react';
import { Product } from '@typings/products/product';
import { getProducts } from '@server/products/getProducts';

export default function useProducts(limit: number, category?: number) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsList = await getProducts(limit, category);
        if (productsList) setProducts(productsList);
      } catch (error) {
        console.error('Failed to fetch products.', error);
      }
    };

    fetchProducts();
  }, [limit, category]);

  return products;
}
