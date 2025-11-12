export default function useQuantity(productId, productStock, variation, quantity, updateCartItem) {
  const handleQuantityDecrease = () => {
    if (variation) {
      updateCartItem(productId, variation.id, quantity - 1);
    } else {
      updateCartItem(productId, null, quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    if (variation) {
      if (quantity <= variation.stock) {
        updateCartItem(productId, variation.id, newQuantity);
      } else {
        updateCartItem(productId, variation.id, variation.stock);
      }
    } else {
      if (productStock) {
        if (quantity <= productStock) {
          updateCartItem(productId, null, newQuantity);
        } else {
          updateCartItem(productId, null, productStock);
        }
      } else {
        updateCartItem(productId, null, newQuantity);
      }
    }
  };

  const handleQuantityIncrease = () => {
    if (variation) {
      if (quantity < variation.stock) updateCartItem(productId, variation.id, quantity + 1);
    } else {
      if (productStock) {
        if (quantity < productStock) updateCartItem(productId, null, quantity + 1);
      } else {
        updateCartItem(productId, null, quantity + 1);
      }
    }
  };

  return { handleQuantityDecrease, handleQuantityChange, handleQuantityIncrease };
}
