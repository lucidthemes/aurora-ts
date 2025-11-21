import { useState } from 'react';
import { validateEmail } from '@utils/validators';

export default function useNewsletterForm() {
  const [newsletterFormEmail, setNewsletterFormEmail] = useState('');
  const [newsletterFormError, setNewsletterFormError] = useState('');

  const [newsletterFormNotification, setNewsletterFormNotification] = useState({
    type: '',
    message: '',
  });

  const resetNewsletterFormNotification = () => {
    setNewsletterFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange = (e) => {
    const { value } = e.target;
    setNewsletterFormEmail(value);
  };

  const validateFormData = () => {
    let formError = '';
    let formIsValid = true;

    const trimmedEmail = newsletterFormEmail.trim();

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      if (!trimmedEmail) {
        formError = 'Please enter an email address';
      } else {
        formError = 'Please enter a valid email address';
      }
      formIsValid = false;
    }

    setNewsletterFormError(formError);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let isFormValid = validateFormData();

    if (isFormValid === true) {
      setNewsletterFormEmail('');
      setNewsletterFormError('');

      setNewsletterFormNotification({
        type: 'success',
        message: 'Subscribed',
      });
    }
  };

  return {
    newsletterFormEmail,
    newsletterFormError,
    newsletterFormNotification,
    resetNewsletterFormNotification,
    handleFormChange,
    handleFormSubmit,
  };
}
