export default function Variation({ item, variation, attributeMap }) {
  if (!variation || !attributeMap) return null;

  const colour = attributeMap[item.variation?.colourId];
  const size = attributeMap[item.variation?.sizeId];

  if (!colour && !size) return null;

  return (
    <ul className="flex flex-col gap-y-2.5" aria-label="Selected variations">
      {colour && (
        <li key={colour.id} className="flex gap-x-1">
          <span className="text-lg text-boulder capitalize">{colour.type}:</span>
          <span className="text-lg text-boulder">{colour.name}</span>
        </li>
      )}
      {size && (
        <li key={size.id} className="flex gap-x-1">
          <span className="text-lg text-boulder capitalize">{size.type}:</span>
          <span className="text-lg text-boulder">{size.name}</span>
        </li>
      )}
    </ul>
  );
}
