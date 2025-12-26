import Checkbox from '@components/Form/Checkbox';
import WidgetTitle from '@components/Widgets/Title';
import type { ActiveFilters, FilterCounts } from '@typings/products/filter';

import useFilterAttribute from '../../hooks/filters/useFilterAttribute';

interface FilterAttributeProps {
  attributeType: 'colour' | 'size';
  activeFilters: ActiveFilters;
  filterCounts: FilterCounts;
  handleFilterListToggle: (filterKey: string, value: number) => void;
}

export default function FilterAttribute({ attributeType, activeFilters, filterCounts, handleFilterListToggle }: FilterAttributeProps) {
  const filterAttributes = useFilterAttribute(attributeType);

  return (
    <section>
      <WidgetTitle>Filter by {attributeType}</WidgetTitle>
      {Array.isArray(filterAttributes) && filterAttributes.length > 0 ? (
        <ul>
          {filterAttributes.map((attribute) => (
            <li key={attribute.id} className="flex cursor-pointer items-center gap-x-2.5">
              <Checkbox
                type="checkbox"
                id={`${attribute.name}-` + attribute.id}
                name={`${attribute.name}-` + attribute.id}
                label={
                  <div className="flex items-center gap-x-1">
                    <span>{attribute.name}</span>
                    {filterCounts && attributeType === 'colour' && <span>({filterCounts.colour[attribute.id] || 0})</span>}
                    {filterCounts && attributeType === 'size' && <span>({filterCounts.size[attribute.id] || 0})</span>}
                  </div>
                }
                checked={activeFilters[attributeType].includes(attribute.id)}
                onChange={() => handleFilterListToggle(attributeType, attribute.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-md bg-pampas p-5 text-center">No {attributeType} found</p>
      )}
    </section>
  );
}
