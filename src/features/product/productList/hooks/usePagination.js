export default function usePagination(products, currentPage, productsPerPage, showPagination) {
  if (!showPagination) productsPerPage = 9999;

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const paginatedProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  return { paginatedProducts, totalPages };
}
