export async function getAttributes(field, value) {
  try {
    const res = await fetch('/data/product-attributes.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch product-attributes.json: ${res.status}`);
    }

    const allAttributes = await res.json();
    const attributes = allAttributes.filter((attribute) => attribute[field] === value);

    if (!attributes) return;

    return attributes;
  } catch (error) {
    console.error('getAttributes', error);
    throw error;
  }
}

export function getAttributesByType(type) {
  return getAttributes('type', type);
}
