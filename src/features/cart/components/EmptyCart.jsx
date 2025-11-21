import Button from '@components/UI/Button';

export default function EmptyCart({ emptyCart }) {
  return (
    <div className="mt-10 border-t-1 border-pearl-bush pt-10">
      <Button onClick={emptyCart} className="flex justify-end">
        Empty cart
      </Button>
    </div>
  );
}
