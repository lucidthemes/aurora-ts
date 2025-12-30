import type { Dispatch, SetStateAction, MouseEventHandler, ChangeEventHandler } from 'react';

import type { SummaryData, AddCartFormData } from '@typings/products/summary';

export default function useQuantity(summaryData: SummaryData, addCartFormData: AddCartFormData, setAddCartFormData: Dispatch<SetStateAction<AddCartFormData>>) {
  const currentQuantity = Number(addCartFormData.quantity);
  const productMaxQuantity = Number(summaryData.maxQuantity);

  const updateQuantity = (newQuantity: number) => {
    let updatedQuantity;

    if (newQuantity) {
      if (productMaxQuantity) {
        if (newQuantity > productMaxQuantity) {
          updatedQuantity = productMaxQuantity;
        } else {
          updatedQuantity = newQuantity;
        }
      } else {
        updatedQuantity = newQuantity;
      }
    } else {
      updatedQuantity = productMaxQuantity;
    }

    if (updatedQuantity) {
      setAddCartFormData((prevState) => ({
        ...prevState,
        quantity: Number(newQuantity),
      }));
    }
  };

  const handleQuantityDecrease: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const newQuantity = currentQuantity - 1 > 0 ? currentQuantity - 1 : 1;
    updateQuantity(newQuantity);
  };

  const handleQuantityIncrease: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    updateQuantity(currentQuantity + 1);
  };

  const handleQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.valueAsNumber;
    const newQuantity = Number(value) > 0 ? Number(value) : 1;
    updateQuantity(newQuantity);
  };

  if (currentQuantity && currentQuantity > productMaxQuantity) {
    updateQuantity(productMaxQuantity);
  }

  return { handleQuantityDecrease, handleQuantityIncrease, handleQuantityChange };
}
