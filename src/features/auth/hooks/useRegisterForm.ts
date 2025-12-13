import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { validateEmail } from '@utils/validators';
import { getCustomerByEmail } from '@server/shop/getCustomer';
import { Customer } from '@typings/shop/customer';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

type RegisterFormValidation = {
  [k in keyof RegisterFormData]: boolean;
};

type RegisterFormErrors = {
  [k in keyof RegisterFormData]: string;
};

interface RegisterFormNotification {
  type: string;
  message: string;
}

export default function useRegisterForm(handleRegister: (userData: Customer) => void) {
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const registerFormValidation: RegisterFormValidation = {
    email: true,
    password: true,
    confirmPassword: true,
  };

  const [registerFormErrors, setRegisterFormErrors] = useState<RegisterFormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerFormNotification, setRegisterFormNotification] = useState<RegisterFormNotification>({
    type: '',
    message: '',
  });

  const resetRegisterFormNotification = () => {
    setRegisterFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    let formErrors = { ...registerFormErrors };
    let formIsValid = true;

    for (const field in registerFormData) {
      const key = field as keyof RegisterFormData;

      const value = registerFormData[key];
      const required = registerFormValidation[key];

      if (key === 'email') {
        if ((!value && required) || !validateEmail(registerFormData.email)) {
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

      if (key === 'confirmPassword') {
        if ((!value && required) || registerFormData.password !== registerFormData.confirmPassword) {
          if (!value && required) {
            formErrors[key] = `Please confirm the password`;
          } else {
            formErrors[key] = `Passwords do no match`;
          }
          formIsValid = false;
        } else {
          formErrors[key] = '';
        }
      }
    }

    setRegisterFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    if (isFormValid === true) {
      const fetchCustomer = async () => {
        try {
          const customer = await getCustomerByEmail(registerFormData.email);
          if (!customer) {
            const newUser = {
              id: 1,
              email: registerFormData.email,
            };

            handleRegister(newUser);

            setRegisterFormData({
              email: '',
              password: '',
              confirmPassword: '',
            });
          } else {
            setRegisterFormNotification({
              type: 'error',
              message: 'An account with this email address already exists',
            });
          }
        } catch (error) {
          console.error('Failed to fetch customer.', error);
        }
      };

      fetchCustomer();
    }
  };

  return { registerFormData, registerFormErrors, registerFormNotification, resetRegisterFormNotification, handleFormChange, handleFormSubmit };
}
