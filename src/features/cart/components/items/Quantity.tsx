import type { Item } from '@typings/cart/item';

import useQuantity from '../../hooks/items/useQuantity';

interface QuantityProps {
  item: Item;
  updateCartItem: (productId: number, quantity: number, variationId?: number) => void;
}

export default function Quantity({ item, updateCartItem }: QuantityProps) {
  const { handleQuantityDecrease, handleQuantityChange, handleQuantityIncrease } = useQuantity(item, updateCartItem);

  const maxQuantity = item.variation?.id !== null ? item.variation?.stock : item.stock !== null ? item.stock : '';

  return (
    <div className="flex size-max rounded-sm border-1 border-pearl-bush">
      <button onClick={handleQuantityDecrease} className="h-12.5 w-7.5 cursor-pointer" aria-label="Decrease quantity">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-auto ml-auto w-2 fill-boulder hover:fill-shark">
          <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"></path>
        </svg>
      </button>
      <input
        name="quantity"
        type="number"
        value={item.quantity}
        max={maxQuantity}
        onChange={(e) => {
          handleQuantityChange(e);
        }}
        className="number-no-appearance w-12.5 text-center text-boulder focus:border-r-1 focus:border-l-1 focus:border-pearl-bush focus:outline-0"
        aria-label="Item quantity"
      />
      <button onClick={handleQuantityIncrease} className="h-12.5 w-7.5 cursor-pointer" aria-label="Increase quantity">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-auto ml-auto w-2 fill-boulder hover:fill-shark">
          <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path>
        </svg>
      </button>
    </div>
  );
}
