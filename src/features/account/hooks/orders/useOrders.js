import { useState, useEffect } from 'react';
import { getOrdersByCustomerId } from '@server/shop/getOrders';

export default function useOrders(customerId) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerId) {
        setOrders([]);
        return;
      }

      try {
        const ordersList = await getOrdersByCustomerId(customerId);
        setOrders(ordersList);
      } catch (error) {
        console.error('Failed to fetch orders.', error);
      }
    };

    fetchOrders();
  }, [customerId]);

  return orders;
}
