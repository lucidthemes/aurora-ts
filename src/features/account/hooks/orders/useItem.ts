import { useState } from 'react';

export default function useItem() {
  const [orderDetailShow, setOrderDetailShow] = useState(false);

  const handleOrderDetailShow = () => {
    setOrderDetailShow((prevState) => !prevState);
  };

  return { orderDetailShow, handleOrderDetailShow };
}
