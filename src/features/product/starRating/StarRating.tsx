import Full from './components/Full';
import Half from './components/Half';
import Empty from './components/Empty';

interface StarRatingProps {
  rating?: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  if (!rating) return null;

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(Full);
    } else if (rating >= i - 0.5 && rating < i) {
      stars.push(Half);
    } else {
      stars.push(Empty);
    }
  }

  if (!stars.length) return null;

  return (
    <div className="flex gap-x-1" aria-label={`${rating} out of 5 stars`}>
      {stars.map((StarComponent, index) => (
        <StarComponent key={index} />
      ))}
    </div>
  );
}
