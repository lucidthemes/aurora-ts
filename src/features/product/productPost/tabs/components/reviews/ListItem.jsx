import { dateFormat } from '@utils/formatters';
import StarRating from '@features/product/starRating';

export default function ListItem({ review }) {
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
