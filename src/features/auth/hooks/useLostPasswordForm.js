import { useState } from 'react';
import { validateEmail } from '@utils/validators';

export default function useLostPasswordForm() {
  const [lostPasswordFormEmail, setLostPasswordFormEmail] = useState('');
  const [lostPasswordFormError, setLostPasswordFormError] = useState('');

  const [lostPasswordFormNotification, setLostPasswordFormNotification] = useState({
    type: '',
    message: '',
  });

  const resetLostPasswordFormNotification = () => {
    setLostPasswordFormNotification({
      type: '',
      message: '',
    });
  };

  const handleFormChange = (e) => {
    const { value } = e.target;
    setLostPasswordFormEmail(value);
  };

  const validateFormData = () => {
    let formError = '';
    let formIsValid = true;

    const trimmedEmail = lostPasswordFormEmail.trim();

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

  const handleFormSubmit = (e) => {
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
