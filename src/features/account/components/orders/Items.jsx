import Item from './Item';

export default function Items({ orders }) {
  return (
    <ul className="flex flex-col gap-y-10" aria-label="Orders">
      {orders.map((order) => (
        <Item key={order.id} order={order} />
      ))}
    </ul>
  );
}
