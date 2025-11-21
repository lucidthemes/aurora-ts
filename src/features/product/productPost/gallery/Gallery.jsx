import useGallery from './hooks/useGallery';
import useOverlay from './hooks/useOverlay';
import Slideshow from './components/slideshow';
import SingleImage from './components/SingleImage';
import Overlay from './components/overlay';
import OpenIcon from './components/overlay/OpenIcon';

export default function Gallery({ singleProduct }) {
  const { selectedSlideIndex, setSelectedSlideIndex, selectedOverlayIndex, setSelectedOverlayIndex } = useGallery();

  const { overlayActive, overlayExpand, overlayRef, handleOverlayActiveChange, handleOverlayExpandChange } = useOverlay();

  return (
    <div className="relative" role="region" aria-label="Product gallery">
      {singleProduct.gallery ? (
        <Slideshow
          singleProduct={singleProduct}
          selectedSlideIndex={selectedSlideIndex}
          setSelectedSlideIndex={setSelectedSlideIndex}
          setSelectedOverlayIndex={setSelectedOverlayIndex}
          handleOverlayActiveChange={handleOverlayActiveChange}
        />
      ) : (
        <SingleImage singleProduct={singleProduct} handleOverlayActiveChange={handleOverlayActiveChange} />
      )}
      <OpenIcon handleOverlayActiveChange={handleOverlayActiveChange} />
      <Overlay
        overlayActive={overlayActive}
        overlayExpand={overlayExpand}
        overlayRef={overlayRef}
        handleOverlayActiveChange={handleOverlayActiveChange}
        handleOverlayExpandChange={handleOverlayExpandChange}
        singleProduct={singleProduct}
        selectedSlideIndex={selectedSlideIndex}
        setSelectedSlideIndex={setSelectedSlideIndex}
        selectedOverlayIndex={selectedOverlayIndex}
        setSelectedOverlayIndex={setSelectedOverlayIndex}
      />
    </div>
  );
}
