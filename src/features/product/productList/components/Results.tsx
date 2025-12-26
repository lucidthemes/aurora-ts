interface ResultsProps {
  productsTotal: number;
  showPagination?: boolean;
  currentPage?: number;
  productsPerPage?: number;
  paginateProductsTotal?: number;
}

export default function Results({ productsTotal, showPagination, currentPage, productsPerPage, paginateProductsTotal }: ResultsProps) {
  let paginationResultFrom: number | undefined;
  let paginationResultTo: number | undefined;

  if (showPagination && currentPage) {
    // pagination results to
    if (productsTotal === productsPerPage) {
      paginationResultTo = productsPerPage * currentPage;
    } else {
      paginationResultTo = paginateProductsTotal;
    }

    // pagination results from
    if (paginationResultTo) {
      if (productsTotal === productsPerPage) {
        paginationResultFrom = paginationResultTo - productsPerPage + 1;
      } else {
        paginationResultFrom = paginationResultTo - productsTotal + 1;
      }
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
