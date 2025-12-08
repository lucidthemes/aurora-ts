import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { validateEmail } from '@utils/validators';

interface UseNewsletterFormReturn {
  newsletterFormEmail: string;
  newsletterFormError: string;
  newsletterFormNotification: { type: string; message: string };
  resetNewsletterFormNotification: () => void;
  handleFormChange: ChangeEventHandler<HTMLInputElement>;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

export default function useNewsletterForm(): UseNewsletterFormReturn {
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

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
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
