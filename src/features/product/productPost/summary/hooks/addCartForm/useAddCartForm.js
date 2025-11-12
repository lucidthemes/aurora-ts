import { useState, useEffect } from 'react';

export default function useAddCartForm(addCartItem, singleProduct, setSummaryData, setAddCartNotification) {
  const [addCartFormData, setAddCartFormData] = useState({
    variationId: '',
    quantity: 1,
  });

  useEffect(() => {
    if (!addCartFormData.variationId) {
      setSummaryData((prevData) => ({
        ...prevData,
        price: singleProduct.price,
        maxQuantity: singleProduct.stock,
        SKU: singleProduct.SKU,
      }));
      setAddCartFormData((prevData) => ({
        ...prevData,
        variationId: '',
      }));
      return;
    }

    const variation = singleProduct.variations?.find((variation) => variation.id === addCartFormData.variationId);
    if (variation) {
      setSummaryData((prevData) => ({
        ...prevData,
        price: variation.price,
        maxQuantity: variation.stock,
        SKU: variation.SKU,
      }));
    }
  }, [addCartFormData.variationId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (singleProduct.variations) {
      if (addCartFormData.variationId) {
        addCartItem(singleProduct.id, addCartFormData.variationId, addCartFormData.quantity);

        setAddCartNotification(`${singleProduct.title} has been added to the cart`);
      }
    } else {
      addCartItem(singleProduct.id, null, addCartFormData.quantity);

      setAddCartNotification(`${singleProduct.title} has been added to the cart`);
    }
  };

  return { addCartFormData, setAddCartFormData, handleFormSubmit };
}
