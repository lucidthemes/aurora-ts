import { z } from 'zod';
import { Order } from '@typings/shop/order';
import { OrderSchema } from '@schemas/shop/order.schema';

export async function getOrder<K extends 'id'>(field: K, value: Order[K]): Promise<Order | undefined> {
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

    const orders = parsed.data;
    const order = orders.find((order) => order[field] === value);

    return order;
  } catch (error) {
    console.error('getOrder', error);
    throw error;
  }
}

export function getOrderById(id: number) {
  return getOrder('id', id);
}
