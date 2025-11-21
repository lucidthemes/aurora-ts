import Items from './Items';
import Totals from './Totals';
import Note from './Note';

export default function OrderDetails({ order }) {
  return (
    <section aria-label="Order details">
      <h2 className="mb-5">Order details</h2>
      <div className="flex flex-col gap-y-10">
        <Items order={order} />
        <Totals order={order} />
        <Note order={order} />
      </div>
    </section>
  );
}
