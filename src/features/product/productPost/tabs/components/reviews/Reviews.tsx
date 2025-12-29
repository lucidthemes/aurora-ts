import type { Product } from '@typings/products/product';
import type { ActiveTab } from '@typings/products/tab';

import useList from '../../hooks/reviews/useList';
import List from './List';
import Form from './Form';

interface ReviewsProps {
  product: Product;
  activeTab: ActiveTab;
}

export default function Reviews({ product, activeTab }: ReviewsProps) {
  const { reviews, setReviews } = useList(product);
  const tabVisibleClass = activeTab === 'reviews' ? 'block' : 'hidden';

  return (
    <div className={`flex flex-col gap-y-10 ${tabVisibleClass}`} role="tabpanel" aria-labelledby="reviews-tab">
      <List reviews={reviews} />
      <Form product={product} reviews={reviews} setReviews={setReviews} />
    </div>
  );
}
