import type { Product } from '@typings/products/product';

import useGallery from './hooks/useGallery';
import useOverlay from './hooks/useOverlay';
import Slideshow from './components/slideshow';
import SingleImage from './components/SingleImage';
import Overlay from './components/overlay';
import OpenIcon from './components/overlay/OpenIcon';

interface GalleryProps {
  product: Product;
}

export default function Gallery({ product }: GalleryProps) {
  const { selectedSlideIndex, setSelectedSlideIndex, selectedOverlayIndex, setSelectedOverlayIndex } = useGallery();

  const { overlayActive, overlayExpand, overlayRef, handleOverlayActiveChange, handleOverlayExpandChange } = useOverlay();

  return (
    <div className="relative" role="region" aria-label="Product gallery">
      {product.gallery ? (
        <Slideshow
          product={product}
          selectedSlideIndex={selectedSlideIndex}
          setSelectedSlideIndex={setSelectedSlideIndex}
          setSelectedOverlayIndex={setSelectedOverlayIndex}
        />
      ) : (
        <SingleImage product={product} />
      )}
      <OpenIcon handleOverlayActiveChange={handleOverlayActiveChange} />
      <Overlay
        product={product}
        overlayActive={overlayActive}
        overlayExpand={overlayExpand}
        overlayRef={overlayRef}
        handleOverlayActiveChange={handleOverlayActiveChange}
        handleOverlayExpandChange={handleOverlayExpandChange}
        selectedSlideIndex={selectedSlideIndex}
        setSelectedSlideIndex={setSelectedSlideIndex}
        selectedOverlayIndex={selectedOverlayIndex}
        setSelectedOverlayIndex={setSelectedOverlayIndex}
      />
    </div>
  );
}
