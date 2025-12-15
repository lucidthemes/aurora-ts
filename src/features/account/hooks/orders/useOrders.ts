import { useState, useEffect } from 'react';

import { getOrdersByCustomerId } from '@server/shop/getOrders';
import type { Order } from '@typings/shop/order';

export default function useOrders(customerId: number | undefined) {
  const [orders, setOrders] = useState<Order[]>([]);

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
