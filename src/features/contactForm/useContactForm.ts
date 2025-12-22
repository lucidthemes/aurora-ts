import { useState } from 'react';
import type { ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';

import { validateEmail } from '@utils/validators';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactFormValidation = {
  [K in keyof ContactFormData]: boolean;
};

type ContactFormErrors = {
  [K in keyof ContactFormData]: string;
};

interface ContactFormNotification {
  type: string;
  message: string;
}

export default function useContactForm() {
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactFormValidation: ContactFormValidation = {
    name: true,
    email: true,
    subject: true,
    message: true,
  };

  const [contactFormErrors, setContactFormErrors] = useState<ContactFormErrors>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [contactFormNotification, setContactFormNotification] = useState<ContactFormNotification>({
    type: '',
    message: '',
  });

  const resetContactFormNotification = () => {
    setContactFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const handleFormKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    if (e.key === 'Enter' && !(tag === 'textarea' || tag === 'select' || (tag === 'button' && (target as HTMLButtonElement).type === 'submit'))) {
      e.preventDefault();
    }
  };

  const validateFormData = () => {
    let formErrors = { ...contactFormErrors };
    let formIsValid = true;

    for (const field in contactFormData) {
      const key = field as keyof ContactFormData;

      const value = contactFormData[key];
      const required = contactFormValidation[key];

      if (key === 'email') {
        if ((!value && required) || !validateEmail(contactFormData.email)) {
          if (!value && required) {
            formErrors[key] = `Please enter an email address`;
          } else {
            formErrors[key] = 'Please enter a valid email address';
          }
          formIsValid = false;
        } else {
          formErrors[key] = '';
        }
      } else {
        if (!value && required) {
          formErrors[key] = `Please enter a ${key}`;
          formIsValid = false;
        } else {
          formErrors[key] = '';
        }
      }
    }

    setContactFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
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
