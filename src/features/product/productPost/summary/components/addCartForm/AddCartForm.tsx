import type { Dispatch, SetStateAction } from 'react';

import Button from '@components/UI/Button';
import { useCartContext } from '@features/cart/CartContext';
import type { Product } from '@typings/products/product';
import type { SummaryData } from '@typings/products/summary';

import useAddCartForm from '../../hooks/addCartForm/useAddCartForm';
import Variations from './Variations';
import Quantity from './Quantity';

interface AddCartFormProps {
  product: Product;
  summaryData: SummaryData;
  setSummaryData: Dispatch<SetStateAction<SummaryData>>;
  setAddCartNotification: Dispatch<SetStateAction<string>>;
}

export default function AddCartForm({ product, summaryData, setSummaryData, setAddCartNotification }: AddCartFormProps) {
  const { addCartItem } = useCartContext();
  const { addCartFormData, setAddCartFormData, handleFormSubmit } = useAddCartForm(addCartItem, product, setSummaryData, setAddCartNotification);

  let buttonDisabled = true;

  if (product.variationAttributes) {
    if (addCartFormData.variationId) {
      buttonDisabled = false;
    }
  } else {
    buttonDisabled = false;
  }

  const buttonDisabledClasses = buttonDisabled === true ? 'cursor-not-allowed! opacity-50' : '';

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Add to cart" noValidate>
      {product.variationAttributes && product.variations && <Variations product={product} setAddCartFormData={setAddCartFormData} />}
      <div className="flex flex-col gap-6 sm:flex-row">
        <Quantity summaryData={summaryData} addCartFormData={addCartFormData} setAddCartFormData={setAddCartFormData} />
        <Button type="submit" className={`max-w-full sm:max-w-fit ${buttonDisabledClasses}`}>
          Add to cart
        </Button>
      </div>
    </form>
  );
}
