import { Attribute } from '@typings/products/attribute';

export async function getAttribute<K extends 'id'>(field: K, value: Attribute[K]): Promise<Attribute | undefined> {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const attributes: Attribute[] = await res.json();
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

    const attributes: Attribute[] = await res.json();

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

export async function getAttributeArray(attributeIds: number[]): Promise<Attribute[] | undefined> {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const attributes: Attribute[] = await res.json();
    const idSet = new Set(attributeIds);
    const attributeArray = attributes.filter((attribute) => idSet.has(attribute.id));

    return attributeArray;
  } catch (error) {
    console.error('getAttributeArray', error);
    throw error;
  }
}
