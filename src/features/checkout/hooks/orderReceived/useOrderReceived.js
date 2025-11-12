import { useState, useEffect } from 'react';
import { getOrderById } from '@server/shop/getOrder';

export default function useOrderReceived(orderId) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      return;
    }

    const storedOrder = localStorage.getItem('order');

    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);

      if (Number(orderId) === parsedOrder.id) {
        setOrder(parsedOrder);
      } else {
        setOrder(false);
      }
    } else {
      const fetchOrder = async () => {
        try {
          const order = await getOrderById(Number(orderId));
          if (order) {
            setOrder(order);
          } else {
            setOrder(false);
          }
        } catch (error) {
          console.error('Failed to fetch order.', error);
        }
      };
      fetchOrder();
    }
  }, [orderId]);

  return order;
}
