import { Order } from '@typings/shop/order';

export async function getOrders<K extends 'customerId'>(field: K, value: Order[K]): Promise<Order[] | undefined> {
  try {
    const res = await fetch('/data/shop-orders.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-orders.json: ${res.status}`);
    }

    const ordersList: Order[] = await res.json();
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
