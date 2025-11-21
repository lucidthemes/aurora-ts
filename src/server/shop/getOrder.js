export async function getOrder(field, value) {
  try {
    const res = await fetch('/data/shop-orders.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-orders.json: ${res.status}`);
    }

    const orders = await res.json();
    const order = orders.find((order) => order[field] === value);

    if (!order) return;

    return order;
  } catch (error) {
    console.error('getOrder', error);
    throw error;
  }
}

export function getOrderById(id) {
  return getOrder('id', id);
}
