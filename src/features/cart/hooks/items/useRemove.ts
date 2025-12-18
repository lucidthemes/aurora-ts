import type { Item } from '@typings/cart/item';

export default function useRemove(item: Item, removeCartItem: (productId: number, variationId?: number) => void) {
  const handleRemoveCartItem = () => {
    if (item.variation) {
      removeCartItem(item.productId, item.variation.id);
    } else {
      removeCartItem(item.productId);
    }
  };

  return handleRemoveCartItem;
}
