import type { ChangeEvent } from 'react';

import type { CheckoutFormData, CheckoutFormErrors } from '@typings/checkout/form';

import AddressFields from './AddressFields';

interface BillingAddressProps {
  checkoutFormData: CheckoutFormData;
  checkoutFormErrors: CheckoutFormErrors;
  billingSameShipping: boolean;
  handleFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, section: 'contact' | 'shipping' | 'billing' | 'note') => void;
}

export default function BillingAddress({ checkoutFormData, checkoutFormErrors, billingSameShipping, handleFormChange }: BillingAddressProps) {
  if (billingSameShipping) return null;

  return (
    <fieldset className="mb-10 flex flex-col gap-y-6">
      <legend className="sr-only">Billing address</legend>
      <h2 className="text-3xl">3. Billing address</h2>
      <div className="relative pl-7.5 before:absolute before:left-0 before:left-2 before:h-full before:border-l-1 before:border-pearl-bush">
        <AddressFields formSection="billing" checkoutFormData={checkoutFormData} checkoutFormErrors={checkoutFormErrors} handleFormChange={handleFormChange} />
      </div>
    </fieldset>
  );
}
