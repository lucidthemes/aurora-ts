import type { Order } from '@typings/shop/order';

interface TotalsProps {
  order: Order;
}

export default function Totals({ order }: TotalsProps) {
  return (
    <section className="flex flex-col gap-y-5">
      <h3>Totals</h3>
      <ul>
        {order.subTotal && (
          <li className="border-b-1 border-pearl-bush py-5 first:pt-0 last:border-b-0 last:pb-0">
            <dl className="flex justify-between">
              <dt className="text-xl text-shark">Subtotal:</dt>
              <dd className="text-xl text-shark">£{order.subTotal.toFixed(2)}</dd>
            </dl>
          </li>
        )}
        {order.coupons?.length > 0 && (
          <li className="border-b-1 border-pearl-bush py-5 first:pt-0 last:border-b-0 last:pb-0">
            <dl className="flex justify-between">
              <dt className="text-xl text-shark">Discount:</dt>
              <dd className="flex flex-col items-end gap-y-2.5">
                <ul className="flex flex-wrap justify-end gap-2.5" aria-label="Order coupons">
                  {order.coupons.map((coupon) => (
                    <li key={coupon.id} className="flex items-center gap-x-2 rounded-full border-1 border-pearl-bush px-2.5 py-1 lowercase">
                      {coupon.code}
                    </li>
                  ))}
                </ul>
                <p className="text-xl text-green-500">-£{(order.subTotal - (order.total - order.shippingOption.amount)).toFixed(2)}</p>
              </dd>
            </dl>
          </li>
        )}
        {order.shippingOption?.name && (
          <li className="border-b-1 border-pearl-bush py-5 first:pt-0 last:border-b-0 last:pb-0">
            <dl className="flex justify-between">
              <dt className="text-xl text-shark">Shipping option:</dt>
              <dd className="text-end text-xl text-shark capitalize">
                {order.shippingOption?.name} - {order.shippingOption?.amount === 0 ? 'free' : '£' + order.shippingOption?.amount}
              </dd>
            </dl>
          </li>
        )}
        {order.paymentOption?.name && (
          <li className="border-b-1 border-pearl-bush py-5 first:pt-0 last:border-b-0 last:pb-0">
            <dl className="flex justify-between">
              <dt className="text-xl text-shark">Payment option:</dt>
              <dd className="text-end text-xl text-shark">{order.paymentOption?.name}</dd>
            </dl>
          </li>
        )}
        {order.total && (
          <li className="border-b-1 border-pearl-bush py-5 first:pt-0 last:border-b-0 last:pb-0">
            <dl className="flex justify-between">
              <dt className="text-2xl text-shark">Total:</dt>
              <dd className="text-2xl text-shark">£{order.total.toFixed(2)}</dd>
            </dl>
          </li>
        )}
      </ul>
    </section>
  );
}
