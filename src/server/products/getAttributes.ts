import { z } from 'zod';

import { AttributeSchema } from '@schemas/products/attribute.schema';
import type { Attribute } from '@typings/products/attribute';

export async function getAttributes<K extends 'type'>(field: K, value: Attribute[K]): Promise<Attribute[]> {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(AttributeSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const allAttributes = parsed.data;
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
