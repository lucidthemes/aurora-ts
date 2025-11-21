export async function getShippingOptions() {
  try {
    const res = await fetch('/data/shop-shipping.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-shipping.json: ${res.status}`);
    }

    const shippingOptions = await res.json();

    if (!shippingOptions) return;

    return shippingOptions;
  } catch (error) {
    console.error('getShippingOptions', error);
    throw error;
  }
}
