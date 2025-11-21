export default function Results({ productsTotal, showPagination, currentPage, productsPerPage, paginateProductsTotal }) {
  let paginationResultFrom = '';
  let paginationResultTo = '';

  if (showPagination) {
    // pagination results to
    if (productsTotal === productsPerPage) {
      paginationResultTo = productsPerPage * currentPage;
    } else {
      paginationResultTo = paginateProductsTotal;
    }

    // pagination results from
    if (productsTotal === productsPerPage) {
      paginationResultFrom = paginationResultTo - productsPerPage + 1;
    } else {
      paginationResultFrom = paginationResultTo - productsTotal + 1;
    }
  }

  return (
    <div role="status" aria-live="polite">
      {!showPagination && (
        <p>
          Showing {productsTotal} result{productsTotal > 1 ? 's' : ''}
        </p>
      )}
      {showPagination && (
        <p>
          Showing {paginationResultFrom} - {paginationResultTo} of {paginateProductsTotal} result{productsTotal > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
