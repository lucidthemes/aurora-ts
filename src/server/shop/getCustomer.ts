import { z } from 'zod';
import { Customer } from '@typings/shop/customer';
import { CustomerSchema } from '@schemas/shop/customer.schema';

export async function getCustomer<K extends 'id' | 'email'>(field: K, value: Customer[K]): Promise<Customer | undefined> {
  try {
    const res = await fetch('/data/shop-customers.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch shop-customers.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(CustomerSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const customers = parsed.data;
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
