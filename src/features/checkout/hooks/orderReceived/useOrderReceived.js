import { useState, useEffect } from 'react';
import { getOrderById } from '@server/shop/getOrder';

export default function useOrderReceived(orderId) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setOrder(null);
        return;
      }

      const storedOrder = localStorage.getItem('order');

      if (storedOrder) {
        try {
          const parsedOrder = JSON.parse(storedOrder);
          if (Number(orderId) === parsedOrder.id) {
            setOrder(parsedOrder);
            return;
          }
        } catch {
          console.error('Failed to fetch stored order.');
        }
      }

      try {
        const order = await getOrderById(Number(orderId));
        setOrder(order || false);
      } catch (error) {
        console.error('Failed to fetch order.', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  return order;
}
