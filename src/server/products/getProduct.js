export async function getProduct(field, value) {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const products = await res.json();
    const product = products.find((product) => product[field] === value);

    if (!product) return;

    return product;
  } catch (error) {
    console.error('getProduct', error);
    throw error;
  }
}

export function getProductById(id) {
  return getProduct('id', id);
}

export function getProductBySlug(slug) {
  return getProduct('slug', slug);
}

export async function getProductArray(productIds) {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const products = await res.json();
    const idSet = new Set(productIds);
    const productArray = products.filter((product) => idSet.has(product.id));

    if (!productArray) return;

    return productArray;
  } catch (error) {
    console.error('getProductArray', error);
    throw error;
  }
}
