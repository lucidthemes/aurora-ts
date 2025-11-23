import { useState } from 'react';

interface UseHeaderReturn {
  headerSearchActive: boolean;
  handleHeaderSearchActive: () => void;
}

export default function useHeader(): UseHeaderReturn {
  const [headerSearchActive, setheaderSearchActive] = useState(false);

  const handleHeaderSearchActive = () => {
    setheaderSearchActive((prevState) => !prevState);
  };

  return { headerSearchActive, handleHeaderSearchActive };
}
