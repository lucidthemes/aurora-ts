import useItems from '../../../hooks/orderReceived/useItems';
import Item from './Item';

export default function Items({ order }) {
  const attributeMap = useItems(order.items);

  if (!order.items) return null;

  return (
    <section className="flex flex-col gap-y-5">
      <h3>Items</h3>
      <ul aria-label="Order items">
        {order.items.map((item) => {
          const itemId = item.variation?.id ? item.productId + '-' + item.variation.id : item.productId;
          return <Item key={itemId} item={item} attributeMap={attributeMap} />;
        })}
      </ul>
    </section>
  );
}
