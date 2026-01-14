import type { Dispatch, SetStateAction } from 'react';

import type { SummaryData, AddCartFormData } from '@typings/products/summary';

import useQuantity from '../../hooks/addCartForm/useQuantity';

interface QuantityProps {
  summaryData: SummaryData;
  addCartFormData: AddCartFormData;
  setAddCartFormData: Dispatch<SetStateAction<AddCartFormData>>;
}

export default function Quantity({ summaryData, addCartFormData, setAddCartFormData }: QuantityProps) {
  const { handleQuantityDecrease, handleQuantityIncrease, handleQuantityChange } = useQuantity(summaryData, addCartFormData, setAddCartFormData);

  return (
    <div className="flex">
      <button
        aria-label="Decrease quantity"
        className="h-12.5 w-12.5 cursor-pointer rounded-l-md bg-spring-wood transition-colors duration-300 ease-in-out hover:bg-pearl-bush"
        onClick={handleQuantityDecrease}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-auto ml-auto w-4 fill-boulder">
          <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"></path>
        </svg>
      </button>
      <input
        type="number"
        name="quantity"
        min="1"
        step="1"
        max={summaryData.maxQuantity}
        value={addCartFormData.quantity}
        onChange={handleQuantityChange}
        autoComplete="off"
        className="number-no-appearance w-16 border-1 border-pearl-bush bg-white px-4 text-center focus:outline-0"
        aria-label="Product quantity"
      />
      <button
        aria-label="Increase quantity"
        className="h-12.5 w-12.5 cursor-pointer rounded-r-md bg-spring-wood transition-colors duration-300 ease-in-out hover:bg-pearl-bush"
        onClick={handleQuantityIncrease}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-auto ml-auto w-4 fill-boulder">
          <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path>
        </svg>
      </button>
    </div>
  );
}
