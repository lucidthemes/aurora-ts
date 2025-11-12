import useSlideshow from '../../hooks/useSlideshow';
import Main from './Main';
import Thumbnails from './Thumbnails';

export default function Slideshow({ singleProduct, selectedSlideIndex, setSelectedSlideIndex, setSelectedOverlayIndex, overlay = false }) {
  const { emblaMainRef, emblaThumbsRef, onThumbClick, scrollPrev, scrollNext } = useSlideshow(
    selectedSlideIndex,
    setSelectedSlideIndex,
    setSelectedOverlayIndex,
    overlay
  );

  return (
    <div className="embla flex flex-col gap-y-5 overflow-hidden">
      <Main singleProduct={singleProduct} emblaMainRef={emblaMainRef} scrollPrev={scrollPrev} scrollNext={scrollNext} overlay={overlay} />
      {!overlay && (
        <Thumbnails singleProduct={singleProduct} emblaThumbsRef={emblaThumbsRef} selectedSlideIndex={selectedSlideIndex} onThumbClick={onThumbClick} />
      )}
    </div>
  );
}
