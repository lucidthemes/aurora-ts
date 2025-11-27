import { Customer } from '@typings/shop/customer';

export async function getCustomer<K extends 'id' | 'email'>(field: K, value: Customer[K]): Promise<Customer | undefined> {
  try {
    const res = await fetch('/data/shop-customers.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-customers.json: ${res.status}`);
    }

    const customers: Customer[] = await res.json();
    const customer = customers.find((customer) => customer[field] === value);

    return customer;
  } catch (error) {
    console.error('getCustomer', error);
    throw error;
  }
}

export function getCustomerById(id: number) {
  return getCustomer('id', id);
}

export function getCustomerByEmail(email: string) {
  return getCustomer('email', email);
}
