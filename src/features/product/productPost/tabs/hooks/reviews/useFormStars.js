import { useState } from 'react';

export default function useFormStars() {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (star) => {
    setHoveredRating(star);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return { hoveredRating, handleMouseEnter, handleMouseLeave };
}
