import Address from './Address';

export default function CustomerDetails({ order }) {
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
