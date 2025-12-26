import type { Product } from '@typings/products/product';

function paginateProducts(products: Product[], currentPage?: number, productsPerPage?: number, showPagination?: boolean) {
  if (!showPagination || !currentPage || !productsPerPage) return products;

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;

  let paginated = [...products];

  paginated = products.slice(indexOfFirstPost, indexOfLastPost);

  return paginated;
}

function calculateTotalPages(products: Product[], productsPerPage?: number) {
  const perPage = productsPerPage && productsPerPage >= 1 ? productsPerPage : 9;
  const totalProducts = products.length || 0;
  const totalPages = Math.ceil(totalProducts / perPage);

  return totalPages;
}

export default function usePagination(products: Product[], currentPage?: number, productsPerPage?: number, showPagination?: boolean) {
  const paginatedProducts = paginateProducts(products, currentPage, productsPerPage, showPagination);

  const totalPages = calculateTotalPages(products, productsPerPage);

  return { paginatedProducts, totalPages };
}
