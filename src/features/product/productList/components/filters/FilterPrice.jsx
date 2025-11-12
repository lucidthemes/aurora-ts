import useFilterPrice from '../../hooks/filters/useFilterPrice';
import WidgetTitle from '@components/Widgets/Title';
import Input from '@components/Form/Input';

export default function FilterPrice({ priceFilterMinMax, handleFilterListPrices }) {
  const { filterPrices, handleMinPriceChange, handleMaxPriceChange } = useFilterPrice(priceFilterMinMax, handleFilterListPrices);

  return (
    <section>
      <WidgetTitle>Filter by price</WidgetTitle>
      <div className="flex flex-col gap-y-7.5">
        <div id="filter-price-slider" className="relative">
          <input
            type="range"
            id="minPrice"
            name="minPrice"
            min={priceFilterMinMax?.minPrice || 0}
            max={priceFilterMinMax?.maxPrice || 0}
            value={filterPrices.filterMinPrice || 0}
            onChange={handleMinPriceChange}
            className="absolute top-0 left-0 w-full"
            aria-label="Change minimum price"
          />
          <input
            type="range"
            id="maxPrice"
            name="maxPrice"
            min={priceFilterMinMax?.minPrice || 0}
            max={priceFilterMinMax?.maxPrice || 0}
            value={filterPrices.filterMaxPrice || 0}
            onChange={handleMaxPriceChange}
            className="absolute top-0 right-0 w-full"
            aria-label="Change maximum price"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex max-w-20 flex-col items-center gap-y-1">
            <Input type="text" name="min" value={`£${filterPrices.filterMinPrice || 0}`} className="text-center" aria-label="Minimum price" readOnly />
            <p>Min</p>
          </div>
          <div className="flex max-w-20 flex-col items-center gap-y-1">
            <Input type="text" name="max" value={`£${filterPrices.filterMaxPrice || 0}`} className="text-center" aria-label="Maximum price" readOnly />
            <p>Max</p>
          </div>
        </div>
      </div>
    </section>
  );
}
