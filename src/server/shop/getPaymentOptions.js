export async function getPaymentOptions() {
  try {
    const res = await fetch('/data/shop-payment.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-payment.json: ${res.status}`);
    }

    const paymentOptions = await res.json();

    if (!paymentOptions) return;

    return paymentOptions;
  } catch (error) {
    console.error('getPaymentOptions', error);
    throw error;
  }
}
