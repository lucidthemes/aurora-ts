export default function EstimatedTotal({ cartTotal }) {
  return (
    <dl className="flex justify-between border-t-1 border-pearl-bush pt-5">
      <dt className="text-2xl text-shark">Estimated total</dt>
      <dd className="text-2xl text-shark">£{cartTotal.toFixed(2)}</dd>
    </dl>
  );
}
