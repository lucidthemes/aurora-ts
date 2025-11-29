import { z } from 'zod';
import { Attribute } from '@typings/products/attribute';
import { AttributeSchema } from '@schemas/products/attribute.schema';

export async function getAttribute<K extends 'id'>(field: K, value: Attribute[K]): Promise<Attribute | undefined> {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(AttributeSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid date: ${parsed.error}`);
    }

    const attributes = parsed.data;
    const attribute = attributes.find((attribute) => attribute[field] === value);

    return attribute;
  } catch (error) {
    console.error('getAttribute', error);
    throw error;
  }
}

export function getAttributeById(id: number) {
  return getAttribute('id', id);
}

export async function getAttributeMap(attributeIds: number[]): Promise<Record<number, Attribute>> {
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

    const attributes = parsed.data;
    const attributesMap: Record<number, Attribute> = {};

    if (Array.isArray(attributes) && Array.isArray(attributeIds)) {
      const idSet = new Set(attributeIds);
      attributes.forEach((attribute) => {
        if (idSet.has(attribute.id)) {
          attributesMap[attribute.id] = attribute;
        }
      });
    }

    return attributesMap;
  } catch (error) {
    console.error('getAttributeMap', error);
    throw error;
  }
}

export async function getAttributeArray(attributeIds: number[]): Promise<Attribute[]> {
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

    const attributes = parsed.data;
    const idSet = new Set(attributeIds);
    const attributeArray = attributes.filter((attribute) => idSet.has(attribute.id));

    return attributeArray;
  } catch (error) {
    console.error('getAttributeArray', error);
    throw error;
  }
}
