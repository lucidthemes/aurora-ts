export default function Shipping({ shippingOption }) {
  if (!shippingOption) return null;

  return (
    <dl className="flex justify-between border-t-1 border-pearl-bush pt-4">
      <dt className="text-xl text-shark">{shippingOption.name}</dt>
      {shippingOption.amount === 0 ? <dd className="text-xl text-shark capitalize">Free</dd> : <dd className="text-xl text-shark">£{shippingOption.amount}</dd>}
    </dl>
  );
}
