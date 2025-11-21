import { useState, useEffect } from 'react';
import { getProducts } from '@server/products/getProducts';

export default function useProducts(limit, category) {
  const [products, setProducts] = useState([]);

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
