import useEditForm from '../../hooks/addresses/useEditForm';
import Input from '@components/Form/Input';
import Select from '@components/Form/Select';
import Button from '@components/UI/Button';

export default function EditForm({ loggedInUser, handleUserUpdate, handleShippingEditShow, handleBillingEditShow, section }) {
  const { editFormData, editFormErrors, handleFormChange, handleFormKeyDown, handleFormSubmit } = useEditForm(
    loggedInUser,
    handleUserUpdate,
    handleShippingEditShow,
    handleBillingEditShow,
    section
  );

  const countryOptions = [{ value: 'GB', text: 'United Kingdom (UK)' }];

  return (
    <form onKeyDown={handleFormKeyDown} onSubmit={handleFormSubmit} className="flex flex-col gap-y-5" aria-label={`${section} address`} noValidate>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${section}-firstName`}
            value={editFormData?.firstName || ''}
            onChange={handleFormChange}
            placeholder="First name"
            autoComplete="given-name"
            required={true}
            label="First name"
            error={editFormErrors.firstName}
          />
        </div>
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${section}-lastName`}
            value={editFormData?.lastName}
            onChange={handleFormChange}
            placeholder="Last name"
            autoComplete="family-name"
            required={true}
            label="Last name"
            error={editFormErrors.lastName}
          />
        </div>
      </div>
      <Select
        name={`${section}-country`}
        options={countryOptions}
        value={editFormData?.country}
        onChange={handleFormChange}
        placeholder="Select a country/region"
        autoComplete="country"
        required={true}
        label="Select a country/region"
        error={editFormErrors.country}
      />
      <Input
        type="text"
        name={`${section}-addressLine1`}
        value={editFormData?.addressLine1}
        onChange={handleFormChange}
        placeholder="Address line 1"
        autoComplete="address-line1"
        required={true}
        label="Address line 1"
        error={editFormErrors.addressLine1}
      />
      <Input
        type="text"
        name={`${section}-addressLine2`}
        value={editFormData?.addressLine2}
        onChange={handleFormChange}
        placeholder="Address line 2 (optional)"
        autoComplete="address-line2"
        required={false}
        label="Address line 2"
        error={editFormErrors.addressLine2}
      />
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${section}-city`}
            value={editFormData?.city}
            onChange={handleFormChange}
            placeholder="City"
            autoComplete="address-level2"
            required={true}
            label="City"
            error={editFormErrors.city}
          />
        </div>
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${section}-county`}
            value={editFormData?.county}
            onChange={handleFormChange}
            placeholder="County (optional)"
            autoComplete="address-level1"
            required={false}
            label="County (optional)"
            error={editFormErrors.county}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="sm:basis-1/2">
          <Input
            type="text"
            name={`${section}-postcode`}
            value={editFormData?.postcode}
            onChange={handleFormChange}
            placeholder="Postcode"
            autoComplete="postal-code"
            required={true}
            label="Postcode"
            error={editFormErrors.postcode}
          />
        </div>
        <div className="sm:basis-1/2">
          <Input
            type="tel"
            name={`${section}-phone`}
            value={editFormData?.phone}
            onChange={handleFormChange}
            placeholder="Phone (optional)"
            autoComplete="tel"
            required={false}
            label="Phone (optional)"
            error={editFormErrors.phone}
          />
        </div>
      </div>
      <Button type="submit" className="max-w-fit">
        Save changes
      </Button>
    </form>
  );
}
