import { useState, useEffect } from 'react';

import { getOrderById } from '@server/shop/getOrder';
import type { Order } from '@typings/shop/order';

type OrderReceivedState = { status: 'loading' } | { status: 'not-found' } | { status: 'loaded'; order: Order };

export default function useOrderReceived(orderId: number | undefined) {
  const [orderReceived, setOrderReceived] = useState<OrderReceivedState>({ status: 'loading' });

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setOrderReceived({ status: 'not-found' });
        return;
      }

      const storedOrder = localStorage.getItem('order');

      if (storedOrder) {
        try {
          setOrderReceived({ status: 'loading' });

          const order = JSON.parse(storedOrder);

          if (orderId === order.id) {
            setOrderReceived({ status: 'loaded', order });
            return;
          }
        } catch {
          console.error('Failed to fetch stored order.');
        }
      }

      try {
        setOrderReceived({ status: 'loading' });

        const order = await getOrderById(orderId);

        if (!order) {
          setOrderReceived({ status: 'not-found' });
          return;
        }

        setOrderReceived({ status: 'loaded', order });
      } catch (error) {
        console.error('Failed to fetch order.', error);
        setOrderReceived({ status: 'not-found' });
      }
    };

    fetchOrder();
  }, [orderId]);

  return orderReceived;
}
