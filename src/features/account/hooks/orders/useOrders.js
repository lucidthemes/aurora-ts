import { useState, useEffect } from 'react';
import { getOrdersByCustomerId } from '@server/shop/getOrders';

export default function useOrders(customerId) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!customerId) {
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      try {
        const ordersList = await getOrdersByCustomerId(customerId);
        if (ordersList) setOrders(ordersList);
      } catch (error) {
        console.error('Failed to fetch orders.', error);
      }
    };

    fetchOrders();
  }, [customerId]);

  return orders;
}
