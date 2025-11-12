import { useState, useEffect, useRef } from 'react';
import { getProducts } from '@server/products/getProducts';

export default function useProductList(limit, category, tag) {
  const [products, setProducts] = useState([]);
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

  const productListRef = useRef();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return { products, currentPage, productListRef, handlePageChange, resetPagination };
}
