import { useState, useEffect } from 'react';
import { getProducts } from '@server/products/getProducts';

interface Product {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: number;
  averageReview: number;
}

export default function useProducts(limit: number, category: string) {
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
