import type { Item } from '@typings/cart/item';
import type { Attribute } from '@typings/products/attribute';

interface VariationProps {
  item: Item;
  attributeMap?: Record<number, Attribute>;
}

export default function Variation({ item, attributeMap }: VariationProps) {
  if (!item.variation || !attributeMap) return null;

  const { colourId, sizeId } = item.variation ?? {};

  let colour, size;

  if (colourId) colour = attributeMap[colourId];
  if (sizeId) size = attributeMap[sizeId];

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
