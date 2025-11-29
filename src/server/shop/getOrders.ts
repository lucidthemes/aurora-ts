import { z } from 'zod';
import { Order } from '@typings/shop/order';
import { OrderSchema } from '@schemas/shop/order.schema';

export async function getOrders<K extends 'customerId'>(field: K, value: Order[K]): Promise<Order[]> {
  try {
    const res = await fetch('/data/shop-orders.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-orders.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(OrderSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const ordersList = parsed.data;
    const orders = ordersList.filter((order) => order[field] === value);

    return orders;
  } catch (error) {
    console.error('getOrders', error);
    throw error;
  }
}

export function getOrdersByCustomerId(customerId: number) {
  return getOrders('customerId', customerId);
}
