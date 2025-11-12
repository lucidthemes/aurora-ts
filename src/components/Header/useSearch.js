import { useEffect, useRef } from 'react';

export default function useSearch(headerSearchActive) {
  const overlayInputRef = useRef(null);

  useEffect(() => {
    if (headerSearchActive && overlayInputRef.current) {
      overlayInputRef.current.focus();
    }
  }, [headerSearchActive]);

  return overlayInputRef;
}
