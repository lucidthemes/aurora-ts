import { useState, useEffect } from 'react';

export default function useAddCartForm(addCartItem, singleProduct, setSummaryData, setAddCartNotification) {
  const [addCartFormData, setAddCartFormData] = useState({
    variationId: '',
    quantity: 1,
  });

  useEffect(() => {
    const updateVariationSummaryData = (variation) => {
      setSummaryData((prevState) => ({
        ...prevState,
        price: variation?.price ?? singleProduct?.price,
        maxQuantity: variation?.stock ?? singleProduct?.stock,
        SKU: variation?.SKU ?? singleProduct?.SKU,
      }));
    };

    const resetAddCartVariation = () => {
      setAddCartFormData((prevState) => ({
        ...prevState,
        variationId: '',
      }));
    };

    if (!addCartFormData.variationId) {
      updateVariationSummaryData();
      resetAddCartVariation();
      return;
    }

    const variation = singleProduct.variations?.find((variation) => variation.id === addCartFormData.variationId);
    if (variation) updateVariationSummaryData(variation);
  }, [addCartFormData.variationId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (singleProduct.variations) {
      if (addCartFormData.variationId) {
        addCartItem(singleProduct.id, addCartFormData.quantity, addCartFormData.variationId);

        setAddCartNotification(`${singleProduct.title} has been added to the cart`);
      }
    } else {
      addCartItem(singleProduct.id, addCartFormData.quantity);

      setAddCartNotification(`${singleProduct.title} has been added to the cart`);
    }
  };

  return { addCartFormData, setAddCartFormData, handleFormSubmit };
}
