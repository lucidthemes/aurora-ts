import useList from '../../hooks/reviews/useList';
import List from './List';
import Form from './Form';

export default function Reviews({ activeTab, singleProduct }) {
  const { reviews, setReviews } = useList(singleProduct);
  const tabVisibleClass = activeTab === 'reviews' ? 'block' : 'hidden';

  return (
    <div className={`flex flex-col gap-y-10 ${tabVisibleClass}`} role="tabpanel" aria-labelledby="reviews-tab">
      <List reviews={reviews} />
      <Form singleProduct={singleProduct} reviews={reviews} setReviews={setReviews} />
    </div>
  );
}
