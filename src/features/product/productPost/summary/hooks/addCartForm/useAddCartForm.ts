import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction, FormEventHandler } from 'react';

import type { Product } from '@typings/products/product';
import type { Variation } from '@typings/cart/variation';
import type { SummaryData, AddCartFormData } from '@typings/products/summary';

export default function useAddCartForm(
  addCartItem: (productId: number, quantity: number, variationId?: number | undefined) => void,
  product: Product,
  setSummaryData: Dispatch<SetStateAction<SummaryData>>,
  setAddCartNotification: Dispatch<SetStateAction<string>>
) {
  const [addCartFormData, setAddCartFormData] = useState<AddCartFormData>({
    quantity: 1,
  });

  useEffect(() => {
    const updateVariationSummaryData = (variation?: Variation) => {
      setSummaryData((prevState) => ({
        ...prevState,
        price: variation?.price ?? product?.price,
        maxQuantity: variation?.stock ?? product?.stock,
        SKU: variation?.SKU ?? product?.SKU,
      }));
    };

    const resetAddCartVariation = () => {
      setAddCartFormData((prevState) => {
        delete prevState.variationId;
        const updatedData = { ...prevState };
        return updatedData;
      });
    };

    if (!addCartFormData.variationId) {
      updateVariationSummaryData();
      resetAddCartVariation();
      return;
    }

    const variation = product.variations?.find((variation) => variation.id === addCartFormData.variationId);
    if (variation) updateVariationSummaryData(variation);
  }, [addCartFormData.variationId]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (product.variations) {
      if (addCartFormData.variationId) {
        addCartItem(product.id, addCartFormData.quantity, addCartFormData.variationId);

        setAddCartNotification(`${product.title} has been added to the cart`);
      }
    } else {
      addCartItem(product.id, addCartFormData.quantity);

      setAddCartNotification(`${product.title} has been added to the cart`);
    }
  };

  return { addCartFormData, setAddCartFormData, handleFormSubmit };
}
