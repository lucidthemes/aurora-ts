import { Order } from '@typings/shop/order';
import Item from './Item';

interface ItemsProps {
  orders: Order[];
}

export default function Items({ orders }: ItemsProps) {
  return (
    <ul className="flex flex-col gap-y-10" aria-label="Orders">
      {orders.map((order) => (
        <Item key={order.id} order={order} />
      ))}
    </ul>
  );
}
