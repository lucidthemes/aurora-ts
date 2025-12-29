import { useState } from 'react';

export default function useGallery() {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [selectedOverlayIndex, setSelectedOverlayIndex] = useState(0);

  return { selectedSlideIndex, setSelectedSlideIndex, selectedOverlayIndex, setSelectedOverlayIndex };
}
