import type { EmblaViewportRefType } from 'embla-carousel-react';

import type { Product } from '@typings/products/product';

interface ThumbnailsProps {
  product: Product;
  emblaThumbsRef: EmblaViewportRefType;
  selectedSlideIndex: number;
  onThumbClick: (index: number) => void;
}

export default function Thumbnails({ product, emblaThumbsRef, selectedSlideIndex, onThumbClick }: ThumbnailsProps) {
  if (!product.gallery) return null;

  return (
    <div className="embla-thumbs">
      <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
        <div className="embla-thumbs__container grid grid-cols-4 gap-5">
          {product.gallery.map((imgUrl, index) => {
            const selectedThumbnailClass = index === selectedSlideIndex ? 'border-boulder' : 'border-pearl-bush';
            return (
              <button
                className={`embla-thumbs__slide rounded-md border-1 transition-colors duration-300 ease-in-out hover:border-shark focus:border-shark ${selectedThumbnailClass}`}
                key={index}
                onClick={() => onThumbClick(index)}
              >
                <img key={index} src={imgUrl} alt={`Gallery thumbnail image ${index + 1}`} className="cursor-pointer rounded-md" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
