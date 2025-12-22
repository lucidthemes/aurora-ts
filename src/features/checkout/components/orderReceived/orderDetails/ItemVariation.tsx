import type { Item } from '@typings/cart/item';
import type { Variation } from '@typings/cart/variation';
import type { Attribute } from '@typings/products/attribute';

interface ItemVariationProps {
  item: Item;
  variation?: Variation;
  attributeMap?: Record<number, Attribute>;
}

export default function ItemVariation({ item, variation, attributeMap }: ItemVariationProps) {
  if (!variation || !attributeMap) return null;

  const colourId = item.variation?.colourId;
  const sizeId = item.variation?.sizeId;

  if (!colourId || !sizeId) return null;

  const colour = attributeMap[colourId];
  const size = attributeMap[sizeId];

  if (!colour && !size) return null;

  return (
    <ul className="flex flex-col gap-y-2.5" aria-label="Item variations">
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
