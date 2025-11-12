import useProductList from './hooks/useProductList';
import useFilters from './hooks/filters/useFilters';
import useSort from './hooks/useSort';
import usePagination from './hooks/usePagination';

import Filters from './components/filters';
import Results from './components/Results';
import Sort from './components/Sort';
import PageTitle from '@components/ui/PageTitle';
import Items from './components/items';
import Pagination from './components/pagination';

export default function ProductList({
  limit,
  category = null,
  tag = null,
  showFilter = true,
  showResults = true,
  showSort = true,
  pageTitle = null,
  pageDescription = null,
  showPagination = true,
  productsPerPage = 9,
}) {
  // fetch default product list
  const { products: defaultProducts, currentPage, productListRef, handlePageChange, resetPagination } = useProductList(limit, category, tag);

  // apply filtering
  const { filteredProducts, activeFilters, filterCounts, priceFilterMinMax, handleFilterListToggle, handleFilterListPrices } = useFilters(
    defaultProducts,
    showPagination,
    resetPagination
  );

  // check filtered products returned (if showFilter enabled) or use default products
  const productsToSort = filteredProducts ?? defaultProducts;

  // apply sorting
  const { sortedProducts, sortOption, handleSortChange } = useSort(productsToSort, showPagination, resetPagination);

  // check sorted products returned (if showSort enabled) or use previous products
  const productsToPaginate = sortedProducts ?? productsToSort;

  // apply pagination
  const { paginatedProducts, totalPages } = usePagination(productsToPaginate, currentPage, productsPerPage, showPagination);

  // check paginated products returned (if showPagination enabled) or use previous products
  const products = paginatedProducts ?? productsToPaginate;

  // total number of products after fetching and filtering
  const productsTotal = products.length;

  // total number of product results before pagination
  const paginateProductsTotal = productsToPaginate.length;

  // layout class based on filter shown/hidden
  const productListClasses = showFilter ? 'basis-3/4' : 'w-full';

  return (
    <div ref={productListRef} className="flex flex-col-reverse gap-10 md:flex-row">
      {showFilter && (
        <div className="basis-1/4">
          <Filters
            activeFilters={activeFilters}
            filterCounts={filterCounts}
            priceFilterMinMax={priceFilterMinMax}
            handleFilterListToggle={handleFilterListToggle}
            handleFilterListPrices={handleFilterListPrices}
          />
        </div>
      )}
      <section className={productListClasses} aria-label="Product results">
        {pageTitle && <PageTitle customClasses="mb-6!">{pageTitle}</PageTitle>}
        {pageDescription && <p className="mb-6">{pageDescription}</p>}
        {(showResults || showSort) && (
          <div className="mb-6 flex flex-col gap-y-5 sm:flex-row sm:items-center sm:justify-between">
            {showResults && (
              <Results
                productsTotal={productsTotal}
                showPagination={showPagination}
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                paginateProductsTotal={paginateProductsTotal}
              />
            )}
            {showSort && <Sort sortOption={sortOption} handleSortChange={handleSortChange} />}
          </div>
        )}
        <Items products={products} />
        {showPagination && totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />}
      </section>
    </div>
  );
}
