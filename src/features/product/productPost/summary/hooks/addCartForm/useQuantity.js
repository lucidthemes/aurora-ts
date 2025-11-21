export default function useQuantity(summaryData, addCartFormData, setAddCartFormData) {
  const currentQuantity = Number(addCartFormData.quantity);
  const productMaxQuantity = Number(summaryData.maxQuantity);

  const updateQuantity = (newQuantity) => {
    let updatedQuantity = '';
    if (newQuantity) {
      if (productMaxQuantity) {
        if (newQuantity > productMaxQuantity) {
          updatedQuantity = productMaxQuantity;
        } else {
          updatedQuantity = newQuantity;
        }
      } else {
        updatedQuantity = newQuantity;
      }
    } else {
      updatedQuantity = productMaxQuantity;
    }
    if (updatedQuantity) {
      setAddCartFormData((prevData) => ({
        ...prevData,
        quantity: parseInt(newQuantity),
      }));
    }
  };

  const handleQuantityDecrease = (e) => {
    e.preventDefault();

    const newQuantity = currentQuantity - 1 > 0 ? currentQuantity - 1 : 1;
    updateQuantity(newQuantity);
  };

  const handleQuantityIncrease = (e) => {
    e.preventDefault();

    updateQuantity(currentQuantity + 1);
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    const newQuantity = Number(value) > 0 ? Number(value) : 1;
    updateQuantity(newQuantity);
  };

  if (currentQuantity && currentQuantity > productMaxQuantity) {
    updateQuantity(productMaxQuantity);
  }

  return { handleQuantityDecrease, handleQuantityIncrease, handleQuantityChange };
}
