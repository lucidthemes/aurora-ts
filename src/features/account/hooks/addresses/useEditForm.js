import { useState } from 'react';

export default function useEditForm(loggedInUser, handleUserUpdate, handleShippingEditShow, handleBillingEditShow, section) {
  const [editFormData, setEditFormData] = useState({
    firstName: loggedInUser[section]?.firstName || '',
    lastName: loggedInUser[section]?.lastName || '',
    country: loggedInUser[section]?.country || '',
    addressLine1: loggedInUser[section]?.addressLine1 || '',
    addressLine2: loggedInUser[section]?.addressLine2 || '',
    city: loggedInUser[section]?.city || '',
    county: loggedInUser[section]?.county || '',
    postcode: loggedInUser[section]?.postcode || '',
    phone: loggedInUser[section]?.phone || '',
  });

  const editFormValidation = {
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

  const [editFormErrors, setEditFormErrors] = useState({
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

  const handleFormChange = (e) => {
    let { name, value } = e.target;
    name = name.split('-').pop();

    if (editFormData[name] !== value) {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });

      setEditFormDataUpdated(true);
    }
  };

  const handleFormKeyDown = (e) => {
    const tag = e.target.tagName.toLowerCase();

    if (e.key === 'Enter' && !(tag === 'select' || (tag === 'button' && type === 'submit'))) {
      e.preventDefault();
    }
  };

  const validateFormData = () => {
    let formErrors = { ...editFormErrors };
    let formIsValid = true;

    for (let field in editFormData) {
      const value = editFormData[field];
      const required = editFormValidation[field];

      if (!value && required) {
        switch (field) {
          case 'firstName':
            formErrors[field] = 'Please enter a first name';
            break;
          case 'lastName':
            formErrors[field] = 'Please enter a last name';
            break;
          case 'country':
            formErrors[field] = 'Please select a country';
            break;
          case 'addressLine1':
            formErrors[field] = 'Please enter an address';
            break;
          default:
            formErrors[field] = `Please enter a ${field}`;
        }
        formIsValid = false;
      } else {
        formErrors[field] = '';
      }
    }

    setEditFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    // check data has changed. only update user if it has
    if (editFormDataUpdated) {
      if (isFormValid) {
        handleUserUpdate(section, editFormData);

        if (section === 'shipping') handleShippingEditShow();
        if (section === 'billing') handleBillingEditShow();
      }
    } else {
      if (section === 'shipping') handleShippingEditShow();
      if (section === 'billing') handleBillingEditShow();
    }
  };

  return { editFormData, editFormErrors, handleFormChange, handleFormKeyDown, handleFormSubmit };
}
