export default function useRemove(productId, variation, removeCartItem) {
  const handleRemoveCartItem = () => {
    if (variation) {
      removeCartItem(productId, variation.id);
    } else {
      removeCartItem(productId, null);
    }
  };

  return handleRemoveCartItem;
}
