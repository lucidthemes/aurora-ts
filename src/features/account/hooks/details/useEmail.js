import { useState } from 'react';

export default function useEmail() {
  const [emailEditShow, setEmailEditShow] = useState(false);

  const handleEmailEditShow = () => {
    setEmailEditShow((prevState) => !prevState);
  };

  return { emailEditShow, handleEmailEditShow };
}
