import { useState } from 'react';
import { validateEmail } from '@utils/validators';

export default function useEmailForm(loggedInUser, handleUserUpdate, handleEmailEditShow) {
  const [emailFormData, setEmailFormData] = useState(() => {
    return loggedInUser.email ? loggedInUser.email : null;
  });

  const [emailFormError, setEmailFormError] = useState('');

  const [emailFormDataUpdated, setEmailFormDataUpdated] = useState(false);

  const handleFormChange = (e) => {
    const { value } = e.target;
    if (emailFormData !== value) {
      setEmailFormData(value);

      setEmailFormDataUpdated(true);
    }
  };

  const validateFormData = () => {
    let formError = '';
    let formIsValid = true;

    const trimmedEmail = emailFormData.trim();

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      if (!trimmedEmail) {
        formError = 'Please enter an email address';
      } else {
        formError = 'Please enter a valid email address';
      }
      formIsValid = false;
    }

    setEmailFormError(formError);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    // check data has changed. only update user if it has
    if (emailFormDataUpdated) {
      if (isFormValid) {
        handleUserUpdate('email', emailFormData);

        handleEmailEditShow();
      }
    } else {
      handleEmailEditShow();
    }
  };

  return { emailFormData, emailFormError, handleFormChange, handleFormSubmit };
}
