import { useState } from 'react';

export default function useHeader() {
  const [headerSearchActive, setheaderSearchActive] = useState(false);

  const handleHeaderSearchActive = () => {
    setheaderSearchActive((prevState) => !prevState);
  };

  return { headerSearchActive, handleHeaderSearchActive };
}
