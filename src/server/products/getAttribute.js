export async function getAttribute(field, value) {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const attributes = await res.json();
    const attribute = attributes.find((attribute) => attribute[field] === value);

    if (!attribute) return;

    return attribute;
  } catch (error) {
    console.error('getAttribute', error);
    throw error;
  }
}

export function getAttributeById(id) {
  return getAttribute('id', id);
}

export async function getAttributeMap(attributeIds) {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const attributes = await res.json();

    const attributesMap = {};

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

export async function getAttributeArray(attributeIds) {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const attributes = await res.json();
    const idSet = new Set(attributeIds);
    const attributeArray = attributes.filter((attribute) => idSet.has(attribute.id));

    if (!attributeArray) return;

    return attributeArray;
  } catch (error) {
    console.error('getAttributeArray', error);
    throw error;
  }
}
