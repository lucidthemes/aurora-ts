import { useState, ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';
import { Customer } from '@typings/shop/customer';

interface EditFormData {
  firstName: string;
  lastName: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  postcode: string;
  phone: string;
}

type EditFormValidation = {
  [K in keyof EditFormData]: boolean;
};

type EditFormErrors = {
  [K in keyof EditFormData]: string;
};

export default function useEditForm(
  loggedInUser: Customer | null,
  section: 'shipping' | 'billing',
  handleUserUpdate: <K extends 'email' | 'shipping' | 'billing'>(section: K, data: Customer[K]) => void,
  handleShippingEditShow?: () => void,
  handleBillingEditShow?: () => void
) {
  const [editFormData, setEditFormData] = useState<EditFormData>({
    firstName: (loggedInUser && loggedInUser[section]?.firstName) || '',
    lastName: (loggedInUser && loggedInUser[section]?.lastName) || '',
    country: (loggedInUser && loggedInUser[section]?.country) || '',
    addressLine1: (loggedInUser && loggedInUser[section]?.addressLine1) || '',
    addressLine2: (loggedInUser && loggedInUser[section]?.addressLine2) || '',
    city: (loggedInUser && loggedInUser[section]?.city) || '',
    county: (loggedInUser && loggedInUser[section]?.county) || '',
    postcode: (loggedInUser && loggedInUser[section]?.postcode) || '',
    phone: (loggedInUser && loggedInUser[section]?.phone) || '',
  });

  const editFormValidation: EditFormValidation = {
    firstName: true,
    lastName: true,
    country: true,
    addressLine1: true,
    addressLine2: false,
    city: true,
    county: false,
    postcode: true,
    phone: false,
  };

  const [editFormErrors, setEditFormErrors] = useState<EditFormErrors>({
    firstName: '',
    lastName: '',
    country: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    postcode: '',
    phone: '',
  });

  const [editFormDataUpdated, setEditFormDataUpdated] = useState(false);

  const handleFormChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    let { name, value } = e.target;

    if (!name) return;

    name = name.split('-').pop()!;

    const key = name as keyof EditFormData;

    if (editFormData[key] !== value) {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });

      setEditFormDataUpdated(true);
    }
  };

  const handleFormKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    if (e.key === 'Enter' && !(tag === 'select' || (tag === 'button' && (target as HTMLButtonElement).type === 'submit'))) {
      e.preventDefault();
    }
  };

  const validateFormData = () => {
    let formErrors = { ...editFormErrors };
    let formIsValid = true;

    for (const field in editFormData) {
      const key = field as keyof EditFormData;

      const value = editFormData[key];
      const required = editFormValidation[key];

      if (!value && required) {
        switch (key) {
          case 'firstName':
            formErrors[key] = 'Please enter a first name';
            break;
          case 'lastName':
            formErrors[key] = 'Please enter a last name';
            break;
          case 'country':
            formErrors[key] = 'Please select a country';
            break;
          case 'addressLine1':
            formErrors[key] = 'Please enter an address';
            break;
          default:
            formErrors[key] = `Please enter a ${key}`;
        }
        formIsValid = false;
      } else {
        formErrors[key] = '';
      }
    }

    setEditFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    // check data has changed. only update user if it has
    if (editFormDataUpdated) {
      if (isFormValid) {
        handleUserUpdate(section, editFormData);

        if (section === 'shipping' && handleShippingEditShow) handleShippingEditShow();
        if (section === 'billing' && handleBillingEditShow) handleBillingEditShow();
      }
    } else {
      if (section === 'shipping' && handleShippingEditShow) handleShippingEditShow();
      if (section === 'billing' && handleBillingEditShow) handleBillingEditShow();
    }
  };

  return { editFormData, editFormErrors, handleFormChange, handleFormKeyDown, handleFormSubmit };
}
