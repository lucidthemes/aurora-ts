import { useState } from 'react';
import type { ChangeEventHandler, FormEventHandler } from 'react';

import { validateEmail } from '@utils/validators';

interface LostPasswordFormNotification {
  type: string;
  message: string;
}

export default function useLostPasswordForm() {
  const [lostPasswordFormEmail, setLostPasswordFormEmail] = useState('');
  const [lostPasswordFormError, setLostPasswordFormError] = useState('');

  const [lostPasswordFormNotification, setLostPasswordFormNotification] = useState<LostPasswordFormNotification>({
    type: '',
    message: '',
  });

  const resetLostPasswordFormNotification = () => {
    setLostPasswordFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setLostPasswordFormEmail(value);
  };

  const validateFormData = () => {
    let formError = '';
    let formIsValid = true;

    const trimmedEmail = lostPasswordFormEmail?.trim();

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      if (!trimmedEmail) {
        formError = 'Please enter an email address';
      } else {
        formError = 'Please enter a valid email address';
      }
      formIsValid = false;
    }

    setLostPasswordFormError(formError);

    return formIsValid;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    let isFormValid = validateFormData();

    if (isFormValid === true) {
      setLostPasswordFormEmail('');

      setLostPasswordFormNotification({
        type: 'success',
        message: 'Password reset email sent. Please check your inbox.',
      });
    }
  };

  return {
    lostPasswordFormEmail,
    lostPasswordFormError,
    lostPasswordFormNotification,
    resetLostPasswordFormNotification,
    handleFormChange,
    handleFormSubmit,
  };
}
