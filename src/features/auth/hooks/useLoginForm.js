import { useState } from 'react';
import { validateEmail } from '@utils/validators';
import { getCustomerByEmail } from '@server/shop/getCustomer';

export default function useLoginForm(handleLogin) {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const loginFormValidation = {
    email: true,
    password: true,
  };

  const [loginFormErrors, setLoginFormErrors] = useState({
    email: '',
    password: '',
  });

  const [loginFormNotification, setLoginFormNotification] = useState({
    type: '',
    message: '',
  });

  const resetLoginFormNotification = () => {
    setLoginFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    let formErrors = { ...loginFormErrors };
    let formIsValid = true;

    for (let field in loginFormData) {
      const value = loginFormData[field];
      const required = loginFormValidation[field];

      if (field === 'email') {
        if ((!value && required) || !validateEmail(loginFormData.email)) {
          if (!value && required) {
            formErrors[field] = 'Please enter an email address';
          } else {
            formErrors[field] = 'Please enter a valid email address';
          }
          formIsValid = false;
        } else {
          formErrors[field] = '';
        }
      }

      if (field === 'password') {
        if ((!value && required) || value.length < 8) {
          if (!value && required) {
            formErrors[field] = `Please enter a password`;
          } else {
            formErrors[field] = `Password needs to be longer than 8 characters`;
          }
          formIsValid = false;
        } else {
          formErrors[field] = '';
        }
      }
    }

    setLoginFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
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
