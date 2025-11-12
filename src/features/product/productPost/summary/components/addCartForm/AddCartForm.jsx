import { useCartContext } from '@features/cart/CartContext';
import useAddCartForm from '../../hooks/addCartForm/useAddCartForm';
import Variations from './Variations';
import Quantity from './Quantity';
import Button from '@components/UI/Button';

export default function AddCartForm({ singleProduct, summaryData, setSummaryData, setAddCartNotification }) {
  const { addCartItem } = useCartContext();
  const { addCartFormData, setAddCartFormData, handleFormSubmit } = useAddCartForm(addCartItem, singleProduct, setSummaryData, setAddCartNotification);

  let buttonDisabled = true;

  if (singleProduct.variationAttributes) {
    if (addCartFormData.variationId) {
      buttonDisabled = false;
    }
  } else {
    buttonDisabled = false;
  }

  const buttonDisabledClasses = buttonDisabled === true ? 'cursor-not-allowed! opacity-50' : '';

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Add to cart" noValidate>
      {singleProduct.variationAttributes && singleProduct.variations && (
        <Variations singleProduct={singleProduct} addCartFormData={addCartFormData} setAddCartFormData={setAddCartFormData} />
      )}
      <div className="flex flex-col gap-6 sm:flex-row">
        <Quantity summaryData={summaryData} addCartFormData={addCartFormData} setAddCartFormData={setAddCartFormData} />
        <Button type="submit" className={`max-w-full sm:max-w-fit ${buttonDisabledClasses}`}>
          Add to cart
        </Button>
      </div>
    </form>
  );
}
