import type { Order } from '@typings/shop/order';

import Address from './Address';

interface CustomerDetailsProps {
  order: Order;
}

export default function CustomerDetails({ order }: CustomerDetailsProps) {
  return (
    <div className="flex flex-col gap-y-10 sm:flex-row sm:gap-x-10">
      <section className="flex basis-1/2 flex-col gap-y-5" aria-label="Shipping address">
        <h2>Shipping address</h2>
        <Address order={order} section="shipping" />
      </section>
      <section className="flex basis-1/2 flex-col gap-y-5" aria-label="Billing address">
        <h2>Billing address</h2>
        <Address order={order} section="billing" />
      </section>
    </div>
  );
}
