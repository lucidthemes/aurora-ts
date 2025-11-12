import WidgetTitle from '@components/Widgets/Title';
import Checkbox from '@components/Form/Checkbox';

export default function FilterStock({ activeFilters, filterCounts, handleFilterListToggle }) {
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
            checked={activeFilters.stock.includes(true)}
            onChange={() => handleFilterListToggle('stock', true)}
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
            checked={activeFilters.stock.includes(false)}
            onChange={() => handleFilterListToggle('stock', false)}
          />
        </li>
      </ul>
    </section>
  );
}
