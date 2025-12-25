import type { MouseEventHandler, ChangeEventHandler } from 'react';

import type { Item } from '@typings/cart/item';

export default function useQuantity(item: Item, updateCartItem: (productId: number, quantity: number, variationId?: number) => void) {
  const handleQuantityDecrease: MouseEventHandler<HTMLButtonElement> = () => {
    if (item.variation) {
      updateCartItem(item.productId, item.quantity - 1, item.variation.id);
    } else {
      updateCartItem(item.productId, item.quantity - 1);
    }
  };

  const handleQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newQuantity = e.target.valueAsNumber;
    if (item.variation) {
      if (item.variation.stock) {
        if (item.quantity <= item.variation.stock) {
          updateCartItem(item.productId, newQuantity, item.variation.id);
        } else {
          updateCartItem(item.productId, item.variation.stock, item.variation.id);
        }
      }
    } else {
      if (item.stock) {
        if (item.quantity <= item.stock) {
          updateCartItem(item.productId, newQuantity);
        } else {
          updateCartItem(item.productId, item.stock);
        }
      } else {
        updateCartItem(item.productId, newQuantity);
      }
    }
  };

  const handleQuantityIncrease: MouseEventHandler<HTMLButtonElement> = () => {
    if (item.variation) {
      if (item.variation.stock && item.quantity < item.variation.stock) updateCartItem(item.productId, item.quantity + 1, item.variation.id);
    } else {
      if (item.stock) {
        if (item.quantity < item.stock) updateCartItem(item.productId, item.quantity + 1);
      } else {
        updateCartItem(item.productId, item.quantity + 1);
      }
    }
  };

  return { handleQuantityDecrease, handleQuantityChange, handleQuantityIncrease };
}
