import Checkbox from '@components/Form/Checkbox';
import WidgetTitle from '@components/Widgets/Title';
import type { ActiveFilters, FilterCounts } from '@typings/products/filter';

interface FilterStockProps {
  activeFilters: ActiveFilters;
  filterCounts: FilterCounts;
  handleFilterListToggle: (filterKey: string, value: number | string) => void;
}

export default function FilterStock({ activeFilters, filterCounts, handleFilterListToggle }: FilterStockProps) {
  return (
    <section>
      <WidgetTitle>Filter by stock status</WidgetTitle>
      <ul className="flex flex-col gap-y-1">
        <li className="flex cursor-pointer items-center gap-x-2.5">
          <Checkbox
            type="checkbox"
            id={'stock-1'}
            name={'stock-1'}
            label={
              <div className="flex items-center gap-x-1">
                <span>In stock</span>
                <span>({filterCounts.stock.true || 0})</span>
              </div>
            }
            checked={activeFilters.stock.includes('in')}
            onChange={() => handleFilterListToggle('stock', 'in')}
          />
        </li>
        <li className="flex cursor-pointer items-center gap-x-2.5">
          <Checkbox
            type="checkbox"
            id={'stock-0'}
            name={'stock-0'}
            label={
              <div className="flex items-center gap-x-1">
                <span>Out of stock</span>
                <span> ({filterCounts.stock.false || 0})</span>
              </div>
            }
            checked={activeFilters.stock.includes('out')}
            onChange={() => handleFilterListToggle('stock', 'out')}
          />
        </li>
      </ul>
    </section>
  );
}
