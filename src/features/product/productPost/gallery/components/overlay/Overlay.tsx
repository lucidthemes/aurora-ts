import type { Dispatch, SetStateAction, RefObject } from 'react';

import type { Product } from '@typings/products/product';

import Icons from './Icons';
import Slideshow from '../slideshow';
import SingleImage from '../SingleImage';

interface OverlayProps {
  product: Product;
  overlayActive: boolean;
  overlayExpand: boolean;
  overlayRef: RefObject<HTMLDivElement | null>;
  handleOverlayActiveChange: () => void;
  handleOverlayExpandChange: () => void;
  selectedSlideIndex: number;
  setSelectedSlideIndex: Dispatch<SetStateAction<number>>;
  selectedOverlayIndex: number;
  setSelectedOverlayIndex: Dispatch<SetStateAction<number>>;
}

export default function Overlay({
  product,
  overlayActive,
  overlayExpand,
  overlayRef,
  handleOverlayActiveChange,
  handleOverlayExpandChange,
  selectedSlideIndex,
  setSelectedSlideIndex,
  selectedOverlayIndex,
  setSelectedOverlayIndex,
}: OverlayProps) {
  if (!overlayActive) return null;

  return (
    <div ref={overlayRef} className="fixed top-0 left-0 z-10 h-full w-full bg-black" aria-label="Gallery zoom overlay">
      <Icons
        product={product}
        overlayExpand={overlayExpand}
        selectedOverlayIndex={selectedOverlayIndex}
        handleOverlayActiveChange={handleOverlayActiveChange}
        handleOverlayExpandChange={handleOverlayExpandChange}
      />
      <div className="-mt-10 flex h-full w-full items-center justify-center">
        {product.gallery ? (
          <Slideshow
            product={product}
            selectedSlideIndex={selectedSlideIndex}
            setSelectedSlideIndex={setSelectedSlideIndex}
            setSelectedOverlayIndex={setSelectedOverlayIndex}
            overlay={true}
          />
        ) : (
          <SingleImage product={product} />
        )}
      </div>
    </div>
  );
}
