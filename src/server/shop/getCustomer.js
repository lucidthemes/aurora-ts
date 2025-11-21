export async function getCustomer(field, value) {
  try {
    const res = await fetch('/data/shop-customers.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-customers.json: ${res.status}`);
    }

    const customers = await res.json();
    const customer = customers.find((customer) => customer[field] === value);

    if (!customer) return;

    return customer;
  } catch (error) {
    console.error('getCustomer', error);
    throw error;
  }
}

export function getCustomerById(id) {
  return getCustomer('id', id);
}

export function getCustomerByEmail(email) {
  return getCustomer('email', email);
}
