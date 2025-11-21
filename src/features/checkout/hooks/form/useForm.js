import { useState } from 'react';
import { validateEmail } from '@utils/validators';

export default function useForm(cartItems, cartSubTotal, cartCoupons, emptyCart, shippingOption, paymentOption, checkoutTotal, loggedInUser, navigate) {
  const [checkoutFormData, setCheckoutFormData] = useState({
    contact: {
      email: loggedInUser?.email || '',
    },
    shipping: {
      firstName: loggedInUser?.shipping?.firstName || '',
      lastName: loggedInUser?.shipping?.lastName || '',
      country: loggedInUser?.shipping?.country || '',
      addressLine1: loggedInUser?.shipping?.addressLine1 || '',
      addressLine2: loggedInUser?.shipping?.addressLine2 || '',
      city: loggedInUser?.shipping?.city || '',
      county: loggedInUser?.shipping?.county || '',
      postcode: loggedInUser?.shipping?.postcode || '',
      phone: loggedInUser?.shipping?.phone || '',
    },
    billing: {
      firstName: loggedInUser?.billing?.firstName || '',
      lastName: loggedInUser?.billing?.lastName || '',
      country: loggedInUser?.billing?.country || '',
      addressLine1: loggedInUser?.billing?.addressLine1 || '',
      addressLine2: loggedInUser?.billing?.addressLine2 || '',
      city: loggedInUser?.billing?.city || '',
      county: loggedInUser?.billing?.county || '',
      postcode: loggedInUser?.billing?.postcode || '',
      phone: loggedInUser?.billing?.phone || '',
    },
    note: {
      text: '',
    },
  });

  const checkoutFormValidation = {
    contact: {
      email: true,
    },
    shipping: {
      firstName: true,
      lastName: true,
      country: true,
      addressLine1: true,
      addressLine2: false,
      city: true,
      county: false,
      postcode: true,
      phone: false,
    },
    billing: {
      firstName: true,
      lastName: true,
      country: true,
      addressLine1: true,
      addressLine2: false,
      city: true,
      county: false,
      postcode: true,
      phone: false,
    },
    note: {
      text: false,
    },
  };

  const [checkoutFormErrors, setCheckoutFormErrors] = useState({
    contact: {
      email: '',
    },
    shipping: {
      firstName: '',
      lastName: '',
      country: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      postcode: '',
      phone: '',
    },
    billing: {
      firstName: '',
      lastName: '',
      country: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      postcode: '',
      phone: '',
    },
    note: {
      text: '',
    },
  });

  const [billingSameShipping, setBillingSameShipping] = useState(true);
  const [noteEnabled, setNoteEnabled] = useState(false);

  const handleFormChange = (e, section) => {
    const { name, value } = e.target;

    let inputFieldName = '';
    const inputNameParts = name.split('-');

    if (inputNameParts.length > 1) {
      inputFieldName = inputNameParts[1];
    } else {
      inputFieldName = name;
    }

    if (section && inputFieldName) {
      const checkoutFormDataSection = checkoutFormData[section];
      const updatedDataSection = { ...checkoutFormDataSection, [inputFieldName]: value };

      setCheckoutFormData({
        ...checkoutFormData,
        [section]: updatedDataSection,
      });
    }
  };

  const handleFormKeyDown = (e) => {
    const tag = e.target.tagName.toLowerCase();
    const type = e.target.type;

    if (e.key === 'Enter' && !(tag === 'textarea' || tag === 'select' || (tag === 'button' && type === 'submit'))) {
      e.preventDefault();
    }
  };

  const validateFormData = () => {
    let formErrors = { ...checkoutFormErrors };
    let formIsValid = true;

    for (let section in checkoutFormData) {
      for (let field in checkoutFormData[section]) {
        const value = checkoutFormData[section][field];
        const required = checkoutFormValidation[section][field];

        if (section != 'billing' || (section === 'billing' && !billingSameShipping)) {
          if ((!value && required) || (section === 'contact' && !validateEmail(checkoutFormData[section][field]))) {
            if (section !== 'contact') {
              switch (field) {
                case 'firstName':
                  formErrors[section][field] = 'Please enter a first name';
                  break;
                case 'lastName':
                  formErrors[section][field] = 'Please enter a last name';
                  break;
                case 'country':
                  formErrors[section][field] = 'Please select a country';
                  break;
                case 'addressLine1':
                  formErrors[section][field] = 'Please enter an address';
                  break;
                default:
                  formErrors[section][field] = `Please enter a ${field}`;
              }
            } else {
              if (!value) {
                formErrors[section][field] = 'Please enter an email address';
              } else if (!validateEmail(checkoutFormData[section][field])) {
                formErrors[section][field] = 'Please enter a valid email address';
              }
            }

            formIsValid = false;
          } else {
            formErrors[section][field] = '';
          }
        } else {
          formErrors[section][field] = '';
        }
      }
    }

    setCheckoutFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    if (isFormValid) {
      let checkoutData = { ...checkoutFormData };

      if (billingSameShipping) {
        const checkoutFormDataShipping = checkoutData.shipping;
        checkoutData = { ...checkoutFormData, billing: checkoutFormDataShipping };
      }

      const newOrder = {
        id: 1001,
        customerId: loggedInUser?.id || null,
        date: new Date().toISOString(),
        checkoutData,
        items: cartItems,
        subTotal: cartSubTotal,
        coupons: cartCoupons,
        shippingOption: shippingOption,
        paymentOption: paymentOption,
        total: checkoutTotal,
      };

      localStorage.setItem('order', JSON.stringify(newOrder));

      emptyCart();

      navigate('/checkout/order-received/1001');
    }
  };

  return {
    checkoutFormData,
    checkoutFormErrors,
    billingSameShipping,
    setBillingSameShipping,
    noteEnabled,
    setNoteEnabled,
    handleFormChange,
    handleFormKeyDown,
    handleFormSubmit,
  };
}
