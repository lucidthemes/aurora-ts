import type { EmblaViewportRefType } from 'embla-carousel-react';

import type { Product } from '@typings/products/product';

import Previous from './Previous';
import Next from './Next';

interface MainProps {
  product: Product;
  emblaMainRef: EmblaViewportRefType;
  scrollPrev: () => void | undefined;
  scrollNext: () => void | undefined;
  overlay: boolean;
}

export default function Main({ product, emblaMainRef, scrollPrev, scrollNext, overlay }: MainProps) {
  if (!product.gallery) return null;

  return (
    <div className="flex items-center">
      {overlay && <Previous scrollPrev={scrollPrev} />}
      <div className="embla__viewport overflow-hidden rounded-md" ref={emblaMainRef}>
        <div className="embla__container flex">
          {product.gallery.map((imgUrl, index) => (
            <div className="embla__slide mr-10 flex min-w-px flex-[0_0_100%] justify-center rounded-md" key={index}>
              <img key={index} src={imgUrl} alt={`Gallery main image ${index + 1}`} className="cursor-pointer rounded-md" />
            </div>
          ))}
        </div>
      </div>
      {overlay && <Next scrollNext={scrollNext} />}
    </div>
  );
}
