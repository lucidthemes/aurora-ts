export async function getProducts(limit, category, tag = null) {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const products = await res.json();

    let filteredProducts = products;

    if (limit && limit > 0) {
      filteredProducts = filteredProducts.slice(0, limit);
    }

    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    if (tag) {
      filteredProducts = filteredProducts.filter((product) => product.tags?.includes(tag));
    }

    if (!filteredProducts) return;

    return filteredProducts;
  } catch (error) {
    console.error('getProducts', error);
    throw error;
  }
}

export async function getProductsMinMaxPrices() {
  try {
    const res = await fetch('/data/products.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }

    const products = await res.json();

    const prices = products.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (!minPrice && !maxPrice) return;

    return { minPrice: minPrice, maxPrice: maxPrice };
  } catch (error) {
    console.error('getProductsMinMaxPrices', error);
    throw error;
  }
}
