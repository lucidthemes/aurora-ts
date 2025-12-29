import StarRating from '@features/product/starRating';
import type { Review } from '@typings/products/review';
import { dateFormat } from '@utils/formatters';

interface ListItemProps {
  review: Review;
}

export default function ListItem({ review }: ListItemProps) {
  return (
    <li>
      <div className="flex flex-col gap-y-5 border-b border-pearl-bush pb-10">
        <div className="flex justify-between">
          <StarRating rating={review.rating} />
          <span className="text-sm/3 tracking-xwide text-boulder uppercase">{dateFormat(review.date)}</span>
        </div>
        <p>{review.review}</p>
        <p className="text-2xl text-shark">{review.name}</p>
      </div>
    </li>
  );
}
