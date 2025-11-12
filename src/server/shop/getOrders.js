export async function getOrders(field, value) {
  try {
    const res = await fetch('/data/shop-orders.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-orders.json: ${res.status}`);
    }

    const ordersList = await res.json();
    const orders = ordersList.filter((order) => order[field] === value);

    if (!orders) return;

    return orders;
  } catch (error) {
    console.error('getOrders', error);
    throw error;
  }
}

export function getOrdersByCustomerId(customerId) {
  return getOrders('customerId', customerId);
}
