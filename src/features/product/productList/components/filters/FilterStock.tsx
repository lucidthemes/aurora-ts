import Checkbox from '@components/Form/Checkbox';
import WidgetTitle from '@components/Widgets/Title';
import type { ActiveFilters, FilterCounts } from '@typings/products/filter';

interface FilterStockProps {
  activeFilters: ActiveFilters;
  filterCounts: FilterCounts;
  handleFilterListStock: (stockOption: string) => void;
}

export default function FilterStock({ activeFilters, filterCounts, handleFilterListStock }: FilterStockProps) {
  return (
    <section>
      <WidgetTitle>Filter by stock status</WidgetTitle>
      <ul className="flex flex-col gap-y-1">
        <li className="flex cursor-pointer items-center gap-x-2.5">
          <Checkbox
            type="checkbox"
            id={'in-stock'}
            name={'in-stock'}
            label={
              <div className="flex items-center gap-x-1">
                <span>In stock</span>
                <span>({filterCounts.stock.in || 0})</span>
              </div>
            }
            checked={activeFilters.stock.in === true}
            onChange={() => handleFilterListStock('in')}
          />
        </li>
        <li className="flex cursor-pointer items-center gap-x-2.5">
          <Checkbox
            type="checkbox"
            id={'out-stock'}
            name={'out-stock'}
            label={
              <div className="flex items-center gap-x-1">
                <span>Out of stock</span>
                <span> ({filterCounts.stock.out || 0})</span>
              </div>
            }
            checked={activeFilters.stock.out === true}
            onChange={() => handleFilterListStock('out')}
          />
        </li>
      </ul>
    </section>
  );
}
