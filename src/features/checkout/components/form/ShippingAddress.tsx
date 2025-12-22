import type { Dispatch, SetStateAction, ChangeEvent } from 'react';

import Checkbox from '@components/Form/Checkbox';
import type { CheckoutFormData, CheckoutFormErrors } from '@typings/checkout/form';

import AddressFields from './AddressFields';

interface ShippingAddressProps {
  checkoutFormData: CheckoutFormData;
  checkoutFormErrors: CheckoutFormErrors;
  billingSameShipping: boolean;
  setBillingSameShipping: Dispatch<SetStateAction<boolean>>;
  handleFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, section: 'contact' | 'shipping' | 'billing' | 'note') => void;
}

export default function ShippingAddress({
  checkoutFormData,
  checkoutFormErrors,
  billingSameShipping,
  setBillingSameShipping,
  handleFormChange,
}: ShippingAddressProps) {
  return (
    <fieldset className="mb-10 flex flex-col gap-y-6">
      <legend className="sr-only">Shipping address</legend>
      <h2 className="text-3xl">2. Shipping address</h2>
      <div className="relative flex flex-col gap-y-5 pl-7.5 before:absolute before:left-0 before:left-2 before:h-full before:border-l-1 before:border-pearl-bush">
        <AddressFields formSection="shipping" checkoutFormData={checkoutFormData} checkoutFormErrors={checkoutFormErrors} handleFormChange={handleFormChange} />
        <Checkbox
          id="billing"
          name="billing"
          label="Use same address for billing"
          checked={billingSameShipping}
          onChange={() => setBillingSameShipping((prevState) => !prevState)}
          className="cursor-pointer"
        />
      </div>
    </fieldset>
  );
}
