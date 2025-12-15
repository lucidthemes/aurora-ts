import OrderReceived from '@features/checkout/components/orderReceived';
import type { Order } from '@typings/shop/order';
import { dateFormat } from '@utils/formatters';

import useItem from '../../hooks/orders/useItem';

interface ItemProps {
  order: Order;
}

export default function Item({ order }: ItemProps) {
  const { orderDetailShow, handleOrderDetailShow } = useItem();

  return (
    <li className="flex flex-col gap-y-10 border-b-1 border-pearl-bush pb-10 last:border-b-0 last:pb-0" aria-label={`Order number: ${order.id}`}>
      <button
        onClick={handleOrderDetailShow}
        className="flex w-full cursor-pointer items-center justify-between rounded-md bg-pampas p-5 transition-colors duration-300 ease-in-out hover:bg-spring-wood"
        aria-label="Expand order"
      >
        <ul className="flex gap-x-6">
          <li className="border-l-1 border-boulder pl-6 first:border-l-0 first:pl-0">
            <p className="text-xl text-shark">#{order.id}</p>
          </li>
          <li className="border-l-1 border-boulder pl-6 first:border-l-0 first:pl-0">
            <p className="text-xl text-shark">{dateFormat(order.date)}</p>
          </li>
          <li className="border-l-1 border-boulder pl-6 first:border-l-0 first:pl-0">
            <p className="text-xl text-shark">£{order.total?.toFixed(2)}</p>
          </li>
        </ul>
        {!orderDetailShow ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5 fill-shark">
            <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5 fill-shark">
            <path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z" />
          </svg>
        )}
      </button>
      {orderDetailShow && <OrderReceived order={order} location="orders" />}
    </li>
  );
}
