import type { Dispatch, SetStateAction } from 'react';

import type { Product } from '@typings/products/product';

import useSlideshow from '../../hooks/useSlideshow';
import Main from './Main';
import Thumbnails from './Thumbnails';

interface SlideshowProps {
  product: Product;
  selectedSlideIndex: number;
  setSelectedSlideIndex: Dispatch<SetStateAction<number>>;
  setSelectedOverlayIndex: Dispatch<SetStateAction<number>>;
  overlay?: boolean;
}

export default function Slideshow({ product, selectedSlideIndex, setSelectedSlideIndex, setSelectedOverlayIndex, overlay = false }: SlideshowProps) {
  const { emblaMainRef, emblaThumbsRef, onThumbClick, scrollPrev, scrollNext } = useSlideshow(
    selectedSlideIndex,
    setSelectedSlideIndex,
    setSelectedOverlayIndex,
    overlay
  );

  return (
    <div className="embla flex flex-col gap-y-5 overflow-hidden">
      <Main product={product} emblaMainRef={emblaMainRef} scrollPrev={scrollPrev} scrollNext={scrollNext} overlay={overlay} />
      {!overlay && <Thumbnails product={product} emblaThumbsRef={emblaThumbsRef} selectedSlideIndex={selectedSlideIndex} onThumbClick={onThumbClick} />}
    </div>
  );
}
