import useFilterCategory from '../../hooks/filters/useFilterCategory';
import WidgetTitle from '@components/Widgets/Title';
import Checkbox from '@components/Form/Checkbox';

export default function FilterCategory({ activeFilters, filterCounts, handleFilterListToggle }) {
  const filterCategories = useFilterCategory();
  if (filterCategories.length === 0) return null;

  return (
    <section>
      <WidgetTitle>Filter by category</WidgetTitle>
      <ul>
        {filterCategories.map((category) => (
          <li key={category.id} className="flex cursor-pointer items-center gap-x-2.5">
            <Checkbox
              type="checkbox"
              id={'category-' + category.id}
              name={'category-' + category.id}
              label={
                <div className="flex items-center gap-x-1">
                  <span>{category.name}</span>
                  <span>({filterCounts.category[category.id] || 0})</span>
                </div>
              }
              checked={activeFilters.category.includes(category.id)}
              onChange={() => handleFilterListToggle('category', category.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
