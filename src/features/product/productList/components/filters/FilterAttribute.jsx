import useFilterAttribute from '../../hooks/filters/useFilterAttribute';
import WidgetTitle from '@components/Widgets/Title';
import Checkbox from '@components/Form/Checkbox';

export default function FilterAttribute({ attributeType, activeFilters, filterCounts, handleFilterListToggle }) {
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
                    {attributeType === 'colour' && <span>({filterCounts.colour[attribute.id] || 0})</span>}
                    {attributeType === 'size' && <span>({filterCounts.size[attribute.id] || 0})</span>}
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
