import PageTitle from '@components/UI/PageTitle';

import useProductList from './hooks/useProductList';
import useFilters from './hooks/filters/useFilters';
import useSort from './hooks/useSort';
import usePagination from './hooks/usePagination';

import Filters from './components/filters';
import Results from './components/Results';
import Sort from './components/Sort';
import Items from './components/items';
import Pagination from './components/pagination';

interface ProductListProps {
  limit?: number;
  category?: number;
  tag?: number;
  showFilter?: boolean;
  showResults?: boolean;
  showSort?: boolean;
  pageTitle?: string;
  pageDescription?: string;
  showPagination?: boolean;
  productsPerPage?: number;
}

export default function ProductList({
  limit,
  category,
  tag,
  showFilter = true,
  showResults = true,
  showSort = true,
  pageTitle,
  pageDescription,
  showPagination = true,
  productsPerPage = 9,
}: ProductListProps) {
  // fetch products
  const { products, currentPage, productListRef, handlePageChange, resetPagination } = useProductList(limit, category, tag);

  // filter
  const { filteredProducts, filterCounts, activeFilters, priceFilterMinMax, handleFilterListToggle, handleFilterListStock, handleFilterListPrices } =
    useFilters(products, showFilter, showPagination, resetPagination);

  // sort
  const { sortedProducts, sortOption, handleSortChange } = useSort(filteredProducts, resetPagination, showSort, showPagination);

  // paginate
  const { paginatedProducts, totalPages } = usePagination(sortedProducts, currentPage, productsPerPage, showPagination);

  // final products list after filtering, sorting, and pagination
  const productsList = paginatedProducts;

  // total number of products
  const productsTotal = productsList.length;

  // total number of product results before pagination
  const paginateProductsTotal = sortedProducts.length;

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
            handleFilterListStock={handleFilterListStock}
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
        <Items products={productsList} />
        {showPagination && totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />}
      </section>
    </div>
  );
}
