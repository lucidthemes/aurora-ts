import WidgetTitle from '@components/Widgets/Title';
import Checkbox from '@components/Form/Checkbox';
import StarRating from '@features/product/starRating';

export default function FilterRating({ activeFilters, filterCounts, handleFilterListToggle }) {
  return (
    <section>
      <WidgetTitle>Filter by rating</WidgetTitle>
      <ul className="flex flex-col gap-y-1">
        {[5, 4, 3, 2, 1].map((ratingNumber) => (
          <li key={ratingNumber} className="flex cursor-pointer items-center gap-x-2.5">
            <Checkbox
              type="checkbox"
              id={`rating-${ratingNumber}`}
              name={`rating-${ratingNumber}`}
              label={
                <div className="flex items-center gap-x-1">
                  <StarRating rating={ratingNumber} />
                  <span className="text-lg text-boulder">({filterCounts.rating[ratingNumber] || 0})</span>
                </div>
              }
              checked={activeFilters.rating.includes(ratingNumber)}
              onChange={() => handleFilterListToggle('rating', ratingNumber)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
