import type { Cart } from '@typings/cart/cart';
import type { Product } from '@typings/products/product';
import type { Item } from '@typings/cart/item';
import type { Variation as VariationType } from '@typings/cart/variation';

export function createEmptyCartObject(): Cart {
  return {
    items: [],
    subTotal: 0,
    coupons: [],
    total: 0,
  };
}

export function createCartItemObject(product: Product, price: number, quantity: number, variation?: VariationType): Item {
  return {
    productId: product.id,
    title: product.title,
    slug: product.slug,
    image: product.image,
    stock: product.stock,
    price,
    quantity,
    variation,
  };
}
