import { useState } from 'react';

export default function useFormStars() {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (star: number) => {
    setHoveredRating(star);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return { hoveredRating, handleMouseEnter, handleMouseLeave };
}
