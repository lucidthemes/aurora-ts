import FilterCategory from './FilterCategory';
import FilterAttribute from './FilterAttribute';
import FilterRating from './FilterRating';
import FilterStock from './FilterStock';
import FilterPrice from './FilterPrice';

export default function Filters({ activeFilters, filterCounts, priceFilterMinMax, handleFilterListToggle, handleFilterListPrices }) {
  return (
    <aside className="flex flex-col gap-y-10 rounded-md bg-white p-5" aria-label="Filters">
      <FilterCategory activeFilters={activeFilters} filterCounts={filterCounts} handleFilterListToggle={handleFilterListToggle} />
      <FilterAttribute attributeType="colour" activeFilters={activeFilters} filterCounts={filterCounts} handleFilterListToggle={handleFilterListToggle} />
      <FilterAttribute attributeType="size" activeFilters={activeFilters} filterCounts={filterCounts} handleFilterListToggle={handleFilterListToggle} />
      <FilterRating activeFilters={activeFilters} filterCounts={filterCounts} handleFilterListToggle={handleFilterListToggle} />
      <FilterStock activeFilters={activeFilters} filterCounts={filterCounts} handleFilterListToggle={handleFilterListToggle} />
      <FilterPrice priceFilterMinMax={priceFilterMinMax} handleFilterListPrices={handleFilterListPrices} />
    </aside>
  );
}
