import ExpandIcon from './ExpandIcon';
import CompressIcon from './CompressIcon';
import CloseIcon from './CloseIcon';

export default function Icons({ overlayExpand, selectedOverlayIndex, handleOverlayActiveChange, handleOverlayExpandChange, singleProduct }) {
  return (
    <div className="flex justify-between px-2.5 pt-2.5">
      {singleProduct.gallery ? (
        <span className="text-white" aria-label={`Image ${selectedOverlayIndex + 1} of ${singleProduct.gallery.length}`}>
          {selectedOverlayIndex + 1}/{singleProduct.gallery.length}
        </span>
      ) : (
        <p className="text-white" aria-label="Image 1 of 1">
          1/1
        </p>
      )}
      <div className="flex gap-x-5">
        {!overlayExpand && <ExpandIcon handleOverlayExpandChange={handleOverlayExpandChange} />}
        {overlayExpand && <CompressIcon handleOverlayExpandChange={handleOverlayExpandChange} />}
        <CloseIcon handleOverlayActiveChange={handleOverlayActiveChange} />
      </div>
    </div>
  );
}
