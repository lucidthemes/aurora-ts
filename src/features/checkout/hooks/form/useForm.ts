import { useState } from 'react';
import type { ChangeEvent, KeyboardEventHandler, FormEventHandler } from 'react';
import type { NavigateFunction } from 'react-router-dom';

import type { Item } from '@typings/cart/item';
import type { Coupon } from '@typings/shop/coupon';
import type { CheckoutFormData, CheckoutFormValidation, CheckoutFormErrors } from '@typings/checkout/form';
import type { ShippingOption } from '@typings/shop/shippingOption';
import type { PaymentOption } from '@typings/shop/paymentOption';
import type { Customer } from '@typings/shop/customer';
import { validateEmail } from '@utils/validators';

export default function useForm(
  cartItems: Item[],
  cartSubTotal: number,
  cartCoupons: Coupon[],
  emptyCart: () => void,
  shippingOption: ShippingOption | null,
  paymentOption: PaymentOption | null,
  checkoutTotal: number,
  loggedInUser: Customer | null,
  navigate: NavigateFunction
) {
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData>({
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

  const checkoutFormValidation: CheckoutFormValidation = {
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

  const [checkoutFormErrors, setCheckoutFormErrors] = useState<CheckoutFormErrors>({
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

  const handleFormChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section: 'contact' | 'shipping' | 'billing' | 'note'
  ) => void = (e, section) => {
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

  const handleFormKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    if (e.key === 'Enter' && !(tag === 'textarea' || tag === 'select' || (tag === 'button' && (target as HTMLButtonElement).type === 'submit'))) {
      e.preventDefault();
    }
  };

  function validateContactSection(
    data: CheckoutFormData['contact'],
    validation: CheckoutFormValidation['contact'],
    errors: CheckoutFormErrors['contact']
  ): boolean {
    const email = data.email;

    if (validation.email && !email) {
      errors.email = 'Please enter an email address';
      return false;
    }

    if (email && !validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
      return false;
    }

    errors.email = '';
    return true;
  }

  function validateSection<K extends keyof CheckoutFormData>(
    sectionKey: K,
    data: CheckoutFormData[K],
    validation: CheckoutFormValidation[K],
    errors: { [F in keyof CheckoutFormData[K]]: string }
  ): boolean {
    const getAddressErrorMessage = (field: string): string => {
      switch (field) {
        case 'firstName':
          return 'Please enter a first name';
        case 'lastName':
          return 'Please enter a last name';
        case 'country':
          return 'Please select a country';
        case 'addressLine1':
          return 'Please enter an address';
        default:
          return `Please enter a ${field}`;
      }
    };

    let isValid = true;

    for (const field in data) {
      const key = field as keyof CheckoutFormData[K];
      const value = data[key];
      const required = validation[key];

      if (required && !value) {
        errors[key] = sectionKey === 'shipping' || sectionKey === 'billing' ? getAddressErrorMessage(String(key)) : 'This field is required';

        isValid = false;
      } else {
        errors[key] = '';
      }
    }

    return isValid;
  }

  const validateFormData = () => {
    const formErrors: CheckoutFormErrors = structuredClone(checkoutFormErrors);

    let formIsValid = true;

    formIsValid = validateContactSection(checkoutFormData.contact, checkoutFormValidation.contact, formErrors.contact) && formIsValid;

    formIsValid = validateSection('shipping', checkoutFormData.shipping, checkoutFormValidation.shipping, formErrors.shipping) && formIsValid;

    if (!billingSameShipping) {
      formIsValid = validateSection('billing', checkoutFormData.billing, checkoutFormValidation.billing, formErrors.billing) && formIsValid;
    } else {
      for (const key in formErrors.billing) {
        formErrors.billing[key as keyof typeof formErrors.billing] = '';
      }
    }

    formIsValid = validateSection('note', checkoutFormData.note, checkoutFormValidation.note, formErrors.note) && formIsValid;

    setCheckoutFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
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
