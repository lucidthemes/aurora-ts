import ListItem from './ListItem';

export default function List({ reviews }) {
  return (
    <>
      {Array.isArray(reviews) && reviews.length > 0 ? (
        <ul className="flex flex-col gap-y-10" aria-label="Reviews">
          {reviews.map((review) => (
            <ListItem key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p className="rounded-sm bg-pampas p-5 text-center">No reviews found</p>
      )}
    </>
  );
}
