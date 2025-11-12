import { useState } from 'react';
import { validateEmail } from '@utils/validators';
import { getCustomerByEmail } from '@server/shop/getCustomer';

export default function useRegisterForm(handleRegister) {
  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const registerFormValidation = {
    email: true,
    password: true,
    confirmPassword: true,
  };

  const [registerFormErrors, setRegisterFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerFormNotification, setRegisterFormNotification] = useState({
    type: '',
    message: '',
  });

  const resetRegisterFormNotification = () => {
    setRegisterFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    let formErrors = { ...registerFormErrors };
    let formIsValid = true;

    for (let field in registerFormData) {
      const value = registerFormData[field];
      const required = registerFormValidation[field];

      if (field === 'email') {
        if ((!value && required) || !validateEmail(registerFormData.email)) {
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

      if (field === 'confirmPassword') {
        if ((!value && required) || registerFormData.password !== registerFormData.confirmPassword) {
          if (!value && required) {
            formErrors[field] = `Please confirm the password`;
          } else {
            formErrors[field] = `Passwords do no match`;
          }
          formIsValid = false;
        } else {
          formErrors[field] = '';
        }
      }
    }

    setRegisterFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
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
