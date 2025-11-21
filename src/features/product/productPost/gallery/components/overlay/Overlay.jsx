import Icons from './Icons';
import Slideshow from '../slideshow';
import SingleImage from '../SingleImage';

export default function Overlay({
  overlayActive,
  overlayExpand,
  overlayRef,
  handleOverlayActiveChange,
  handleOverlayExpandChange,
  singleProduct,
  selectedSlideIndex,
  setSelectedSlideIndex,
  selectedOverlayIndex,
  setSelectedOverlayIndex,
}) {
  if (!overlayActive) return null;

  return (
    <div ref={overlayRef} className="fixed top-0 left-0 z-10 h-full w-full bg-black" aria-label="Gallery zoom overlay">
      <Icons
        overlayExpand={overlayExpand}
        selectedOverlayIndex={selectedOverlayIndex}
        handleOverlayActiveChange={handleOverlayActiveChange}
        handleOverlayExpandChange={handleOverlayExpandChange}
        singleProduct={singleProduct}
      />
      <div className="-mt-10 flex h-full w-full items-center justify-center">
        {singleProduct.gallery ? (
          <Slideshow
            singleProduct={singleProduct}
            selectedSlideIndex={selectedSlideIndex}
            setSelectedSlideIndex={setSelectedSlideIndex}
            selectedOverlayIndex={selectedOverlayIndex}
            setSelectedOverlayIndex={setSelectedOverlayIndex}
            overlay={true}
          />
        ) : (
          <SingleImage singleProduct={singleProduct} />
        )}
      </div>
    </div>
  );
}
