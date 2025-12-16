interface SubTotalProps {
  cartSubTotal: number;
}

export default function SubTotal({ cartSubTotal }: SubTotalProps) {
  return (
    <dl className="flex justify-between border-t-1 border-pearl-bush pt-5">
      <dt className="text-xl text-shark">Subtotal</dt>
      <dd className="text-xl text-shark">£{cartSubTotal.toFixed(2)}</dd>
    </dl>
  );
}
