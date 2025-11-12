import { useState } from 'react';
import { validateEmail } from '@utils/validators';

export default function useContactForm() {
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactFormValidation = {
    name: true,
    email: true,
    subject: true,
    message: true,
  };

  const [contactFormErrors, setContactFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [contactFormNotification, setContactFormNotification] = useState({
    type: '',
    message: '',
  });

  const resetContactFormNotification = () => {
    setContactFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const handleFormKeyDown = (e) => {
    const tag = e.target.tagName.toLowerCase();

    if (e.key === 'Enter' && !(tag === 'textarea' || tag === 'select' || (tag === 'button' && type === 'submit'))) {
      e.preventDefault();
    }
  };

  const validateFormData = () => {
    let formErrors = { ...contactFormErrors };
    let formIsValid = true;

    for (let field in contactFormData) {
      const value = contactFormData[field];
      const required = contactFormValidation[field];

      if (field === 'email') {
        if ((!value && required) || !validateEmail(contactFormData.email)) {
          if (!value && required) {
            formErrors[field] = `Please enter an email address`;
          } else {
            formErrors[field] = 'Please enter a valid email address';
          }
          formIsValid = false;
        } else {
          formErrors[field] = '';
        }
      } else {
        if (!value && required) {
          formErrors[field] = `Please enter a ${field}`;
          formIsValid = false;
        } else {
          formErrors[field] = '';
        }
      }
    }

    setContactFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    if (isFormValid === true) {
      setContactFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setContactFormNotification({
        type: 'success',
        message: 'Your message has successfully been sent',
      });
    }
  };

  return { contactFormData, contactFormErrors, contactFormNotification, resetContactFormNotification, handleFormChange, handleFormKeyDown, handleFormSubmit };
}
