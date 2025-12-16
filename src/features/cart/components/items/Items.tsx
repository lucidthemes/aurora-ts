import type { Item as ItemType } from '@typings/cart/item';

import useItems from '../../hooks/items/useItems';
import Item from './Item';

interface ItemsProps {
  items: ItemType[];
  updateCartItem: (productId: number, quantity: number, variationId?: number) => void;
  removeCartItem: (productId: number, variationId?: number) => void;
}

export default function Items({ items, updateCartItem, removeCartItem }: ItemsProps) {
  const attributeMap = useItems(items);

  return (
    <ul className="flex flex-col gap-y-10" aria-label="Cart items">
      {items.map((item) => {
        const itemId = item.variation?.id ? item.productId + '-' + item.variation?.id : item.productId;
        return <Item key={itemId} item={item} updateCartItem={updateCartItem} removeCartItem={removeCartItem} attributeMap={attributeMap} />;
      })}
    </ul>
  );
}
