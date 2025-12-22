import type { Order } from '@typings/shop/order';
import { dateFormat } from '@utils/formatters';

interface OverviewProps {
  order: Order;
}

export default function Overview({ order }: OverviewProps) {
  return (
    <section aria-label="Overview">
      <div className="flex flex-col gap-y-5 md:grid md:grid-cols-4 md:text-center">
        <dl className="flex flex-col gap-y-1">
          <dt className="text-xl text-shark">Order number</dt>
          <dd className="text-lg text-boulder">{order.id}</dd>
        </dl>
        <dl className="flex flex-col gap-y-1">
          <dt className="text-xl text-shark">Date</dt>
          <dd className="text-lg text-boulder">{dateFormat(order.date)}</dd>
        </dl>
        <dl className="flex flex-col gap-y-1">
          <dt className="text-xl text-shark">Total</dt>
          <dd className="text-lg text-boulder">£{order.total}</dd>
        </dl>
        <dl className="flex flex-col gap-y-1">
          <dt className="text-xl text-shark">Payment option</dt>
          <dd className="text-lg text-boulder">{order.paymentOption?.name}</dd>
        </dl>
      </div>
    </section>
  );
}
