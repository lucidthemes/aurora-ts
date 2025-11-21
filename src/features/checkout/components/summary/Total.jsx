export default function Total({ checkoutTotal }) {
  if (!checkoutTotal) return null;

  return (
    <dl className="flex justify-between border-t-1 border-pearl-bush pt-4">
      <dt className="text-2xl text-shark">Total </dt>
      <dd className="text-2xl text-shark">£{checkoutTotal.toFixed(2)}</dd>
    </dl>
  );
}
