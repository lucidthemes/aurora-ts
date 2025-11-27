import { Attribute } from '@typings/products/attribute';

export async function getAttributes<K extends 'type'>(field: K, value: Attribute[K]): Promise<Attribute[] | undefined> {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const allAttributes: Attribute[] = await res.json();
    const attributes = allAttributes.filter((attribute) => attribute[field] === value);

    return attributes;
  } catch (error) {
    console.error('getAttributes', error);
    throw error;
  }
}

export function getAttributesByType(type: Attribute['type']) {
  return getAttributes('type', type);
}
