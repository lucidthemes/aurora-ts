import { useEffect, useRef } from 'react';

export default function useSearch(headerSearchActive: boolean) {
  const overlayInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (headerSearchActive && overlayInputRef.current) {
      overlayInputRef.current.focus();
    }
  }, [headerSearchActive]);

  return overlayInputRef;
}
