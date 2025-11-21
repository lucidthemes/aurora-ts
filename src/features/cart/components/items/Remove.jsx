import useRemove from '../../hooks/items/useRemove';

export default function Remove({ productId, variation, removeCartItem }) {
  const handleRemoveCartItem = useRemove(productId, variation, removeCartItem);

  return (
    <button
      onClick={handleRemoveCartItem}
      className="size-max cursor-pointer text-lg text-boulder underline transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark"
    >
      Remove item
    </button>
  );
}
