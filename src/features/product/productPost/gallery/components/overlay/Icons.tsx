import type { Product } from '@typings/products/product';

import ExpandIcon from './ExpandIcon';
import CompressIcon from './CompressIcon';
import CloseIcon from './CloseIcon';

interface IconsProps {
  product: Product;
  overlayExpand: boolean;
  selectedOverlayIndex: number;
  handleOverlayActiveChange: () => void;
  handleOverlayExpandChange: () => void;
}

export default function Icons({ product, overlayExpand, selectedOverlayIndex, handleOverlayActiveChange, handleOverlayExpandChange }: IconsProps) {
  return (
    <div className="flex justify-between px-2.5 pt-2.5">
      {product.gallery ? (
        <span className="text-white" aria-label={`Image ${selectedOverlayIndex + 1} of ${product.gallery.length}`}>
          {selectedOverlayIndex + 1}/{product.gallery.length}
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
