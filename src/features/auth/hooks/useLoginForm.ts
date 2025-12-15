import { useState } from 'react';
import type { ChangeEventHandler, FormEventHandler } from 'react';

import { getCustomerByEmail } from '@server/shop/getCustomer';
import type { Customer } from '@typings/shop/customer';
import { validateEmail } from '@utils/validators';

interface LoginFormData {
  email: string;
  password: string;
}

type LoginFormValidation = {
  [K in keyof LoginFormData]: boolean;
};

type LoginFormErrors = {
  [K in keyof LoginFormData]: string;
};

interface LoginFormNotification {
  type: string;
  message: string;
}

export default function useLoginForm(handleLogin: (userData: Customer) => void) {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const loginFormValidation: LoginFormValidation = {
    email: true,
    password: true,
  };

  const [loginFormErrors, setLoginFormErrors] = useState<LoginFormErrors>({
    email: '',
    password: '',
  });

  const [loginFormNotification, setLoginFormNotification] = useState<LoginFormNotification>({
    type: '',
    message: '',
  });

  const resetLoginFormNotification = () => {
    setLoginFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    let formErrors = { ...loginFormErrors };
    let formIsValid = true;

    for (const field in loginFormData) {
      const key = field as keyof LoginFormData;

      const value = loginFormData[key];
      const required = loginFormValidation[key];

      if (key === 'email') {
        if ((!value && required) || !validateEmail(loginFormData.email)) {
          if (!value && required) {
            formErrors[key] = 'Please enter an email address';
          } else {
            formErrors[key] = 'Please enter a valid email address';
          }
          formIsValid = false;
        } else {
          formErrors[key] = '';
        }
      }

      if (key === 'password') {
        if ((!value && required) || value.length < 8) {
          if (!value && required) {
            formErrors[key] = `Please enter a password`;
          } else {
            formErrors[key] = `Password needs to be longer than 8 characters`;
          }
          formIsValid = false;
        } else {
          formErrors[key] = '';
        }
      }
    }

    setLoginFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    if (isFormValid === true) {
      const fetchCustomer = async () => {
        try {
          const customer = await getCustomerByEmail('test@example.com');
          if (customer) {
            handleLogin(customer);

            setLoginFormData({
              email: '',
              password: '',
            });
          } else {
            setLoginFormNotification({
              type: 'error',
              message: 'No account found with those details',
            });
          }
        } catch (error) {
          console.error('Failed to fetch customer.', error);
        }
      };

      fetchCustomer();
    }
  };

  return { loginFormData, loginFormErrors, loginFormNotification, resetLoginFormNotification, handleFormChange, handleFormSubmit };
}
