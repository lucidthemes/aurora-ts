import Input from '@components/Form/Input';
import Select from '@components/Form/Select';

export default function AddressFields({ formSection, checkoutFormData, checkoutFormErrors, handleFormChange }) {
  if (formSection !== 'shipping' && formSection !== 'billing') return null;

  const countryOptions = [{ value: 'GB', text: 'United Kingdom (UK)' }];

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${formSection}-firstName`}
            value={checkoutFormData[formSection].firstName}
            onChange={(e) => handleFormChange(e, formSection)}
            placeholder="First name"
            autoComplete="given-name"
            required={true}
            label="First name"
            error={checkoutFormErrors[formSection].firstName}
          />
        </div>
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${formSection}-lastName`}
            value={checkoutFormData[formSection].lastName}
            onChange={(e) => handleFormChange(e, formSection)}
            placeholder="Last name"
            autoComplete="family-name"
            required={true}
            label="Last name"
            error={checkoutFormErrors[formSection].lastName}
          />
        </div>
      </div>
      <Select
        name={`${formSection}-country`}
        options={countryOptions}
        value={checkoutFormData[formSection].country}
        onChange={(e) => handleFormChange(e, formSection)}
        placeholder="Select a country/region"
        autoComplete="country"
        required={true}
        label="Select a country/region"
        error={checkoutFormErrors[formSection].country}
      />
      <Input
        type="text"
        name={`${formSection}-addressLine1`}
        value={checkoutFormData[formSection].addressLine1}
        onChange={(e) => handleFormChange(e, formSection)}
        placeholder="Address line 1"
        autoComplete="address-line1"
        required={true}
        label="Address line 1"
        error={checkoutFormErrors[formSection].addressLine1}
      />
      <Input
        type="text"
        name={`${formSection}-addressLine2`}
        value={checkoutFormData[formSection].addressLine2}
        onChange={(e) => handleFormChange(e, formSection)}
        placeholder="Address line 2 (optional)"
        autoComplete="address-line2"
        required={false}
        label="Address line 2"
        error={checkoutFormErrors[formSection].addressLine2}
      />
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${formSection}-city`}
            value={checkoutFormData[formSection].city}
            onChange={(e) => handleFormChange(e, formSection)}
            placeholder="City"
            autoComplete="address-level2"
            required={true}
            label="City"
            error={checkoutFormErrors[formSection].city}
          />
        </div>
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${formSection}-county`}
            value={checkoutFormData[formSection].county}
            onChange={(e) => handleFormChange(e, formSection)}
            placeholder="County (optional)"
            autoComplete="address-level1"
            required={false}
            label="County (optional)"
            error={checkoutFormErrors[formSection].county}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${formSection}-postcode`}
            value={checkoutFormData[formSection].postcode}
            onChange={(e) => handleFormChange(e, formSection)}
            placeholder="Postcode"
            autoComplete="postal-code"
            required={true}
            label="Postcode"
            error={checkoutFormErrors[formSection].postcode}
          />
        </div>
        <div className="sm:basis-1/2">
          <Input
            type="tel"
            name={`${formSection}-phone`}
            value={checkoutFormData[formSection].phone}
            onChange={(e) => handleFormChange(e, formSection)}
            placeholder="Phone (optional)"
            autoComplete="tel"
            required={false}
            label="Phone (optional)"
            error={checkoutFormErrors[formSection].phone}
          />
        </div>
      </div>
    </div>
  );
}
