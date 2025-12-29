import { useState, useEffect, useRef } from 'react';

export default function useOverlay() {
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayExpand, setOverlayExpand] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleOverlayActiveChange = () => {
    setOverlayActive((prevState) => {
      const newState = !prevState;

      if (!newState) {
        setOverlayExpand(false);
      }

      return newState;
    });
  };

  const handleOverlayExpandChange = () => {
    if (!document.fullscreenElement && overlayRef.current) {
      if (overlayRef.current.requestFullscreen) {
        overlayRef.current.requestFullscreen();
      }
      setOverlayExpand(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setOverlayExpand(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOverlayActive(false);
        setOverlayExpand(false);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setOverlayExpand(false);
      }
    };

    if (overlayActive) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [overlayActive]);

  return { overlayActive, overlayExpand, overlayRef, handleOverlayActiveChange, handleOverlayExpandChange };
}
