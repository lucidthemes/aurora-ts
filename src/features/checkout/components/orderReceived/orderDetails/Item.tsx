import type { Item } from '@typings/cart/item';
import type { Attribute } from '@typings/products/attribute';

import ItemVariation from './ItemVariation';

interface ItemProps {
  item: Item;
  attributeMap?: Record<number, Attribute>;
}

export default function Item({ item, attributeMap }: ItemProps) {
  if (!item) return null;

  return (
    <li className="flex items-center justify-between border-b-1 border-pearl-bush py-5 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-x-10">
        <div className="flex flex-col gap-y-2.5">
          <h4>{item.title}</h4>
          <ItemVariation item={item} variation={item.variation} attributeMap={attributeMap} />
        </div>
        {item.quantity > 1 && (
          <div>
            <p>x {item.quantity}</p>
          </div>
        )}
      </div>
      <p className="text-xl text-shark">£{(item.price * item.quantity).toFixed(2)}</p>
    </li>
  );
}
