import type { Item } from '@typings/cart/item';

import useRemove from '../../hooks/items/useRemove';

interface RemoveProps {
  item: Item;
  removeCartItem: (productId: number, variationId?: number) => void;
}

export default function Remove({ item, removeCartItem }: RemoveProps) {
  const handleRemoveCartItem = useRemove(item, removeCartItem);

  return (
    <button
      onClick={handleRemoveCartItem}
      className="size-max cursor-pointer text-lg text-boulder underline transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark"
    >
      Remove item
    </button>
  );
}
