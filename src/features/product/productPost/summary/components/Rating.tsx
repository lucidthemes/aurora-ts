import { Dispatch, SetStateAction, RefObject } from 'react';

import StarRating from '@features/product/starRating';
import type { Product } from '@typings/products/product';
import type { ActiveTab } from '@typings/products/tab';

import useRating from '../hooks/useRating';

interface RatingProps {
  product: Product;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  tabsRef: RefObject<HTMLDivElement | null>;
}

export default function Rating({ product, setActiveTab, tabsRef }: RatingProps) {
  const handleSummaryRatingClick = useRating(setActiveTab, tabsRef);

  if (!product.reviewCount || product.reviewCount < 1) return null;

  return (
    <button
      className="flex cursor-pointer items-center gap-x-2 text-boulder transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark"
      onClick={handleSummaryRatingClick}
    >
      <StarRating rating={product.averageReview} />
      <span className="text-lg">
        {product.reviewCount} {product.reviewCount > 1 ? 'reviews' : 'review'}
      </span>
    </button>
  );
}
