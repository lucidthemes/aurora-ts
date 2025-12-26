import { useState, useEffect, useRef } from 'react';

import { getProducts } from '@server/products/getProducts';
import type { Product } from '@typings/products/product';

export default function useProductList(limit?: number, category?: number, tag?: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(limit, category, tag);
        if (products) setProducts(products);
      } catch (error) {
        console.error('Failed to fetch products.', error);
      }
    };

    fetchProducts();
  }, [limit, category, tag]);

  const productListRef = useRef<HTMLDivElement | null>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return { products, currentPage, productListRef, handlePageChange, resetPagination };
}
