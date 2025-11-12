import useRating from '../hooks/useRating';
import StarRating from '@features/product/starRating';

export default function Rating({ singleProduct, setActiveTab, tabsRef }) {
  const handleSummaryRatingClick = useRating(setActiveTab, tabsRef);

  return (
    <button
      className="flex cursor-pointer items-center gap-x-2 text-boulder transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark"
      onClick={handleSummaryRatingClick}
    >
      <StarRating rating={singleProduct.averageReview} />
      <span className="text-lg">
        {singleProduct.reviewCount} {singleProduct.reviewCount > 1 ? 'reviews' : 'review'}
      </span>
    </button>
  );
}
