import AddressFields from './AddressFields';

export default function BillingAddress({ checkoutFormData, checkoutFormErrors, billingSameShipping, handleFormChange }) {
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
