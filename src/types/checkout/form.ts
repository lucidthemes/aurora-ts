import type { Address } from '@typings/shop/address';

export interface CheckoutFormData {
  contact: {
    email: string;
  };
  shipping: Address;
  billing: Address;
  note: {
    text: string;
  };
}

export type CheckoutFormValidation = {
  [K in keyof CheckoutFormData]: {
    [F in keyof CheckoutFormData[K]]: boolean;
  };
};

export type CheckoutFormErrors = {
  [K in keyof CheckoutFormData]: {
    [F in keyof CheckoutFormData[K]]: string;
  };
};
