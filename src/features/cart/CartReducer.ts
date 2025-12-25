import type { Cart, CartAction } from '@typings/cart/cart';
import type { Item } from '@typings/cart/item';
import type { Variation as VariationType } from '@typings/cart/variation';
import type { Coupon as CouponType } from '@typings/shop/coupon';
import type { Product } from '@typings/products/product';

import { createEmptyCartObject, createCartItemObject } from './CartObjects';

function findExistingCartItem(state: Cart, productId: number, variationId?: number): Item | undefined {
  if (productId == null) return undefined;

  if (!variationId) {
    return state.items.find((item) => item.productId === productId);
  } else {
    return state.items.find((item) => item.productId === productId && item.variation?.id === variationId);
  }
}

function findCartItemProductVariation(cartItemProduct: Product, variationId?: number): VariationType | undefined {
  if (!cartItemProduct.variations || !variationId) return undefined;

  return cartItemProduct.variations.find((variation) => variation.id === variationId);
}

function addCartItem(state: Cart, cartItemProduct: Product, productId: number, quantity: number, existingCartItem?: Item, variationId?: number) {
  const cartItemProductVariation = findCartItemProductVariation(cartItemProduct, variationId);

  if (!existingCartItem) {
    let newCartItemPrice = cartItemProduct.price;
    let newCartItemQuantity = quantity;

    if (cartItemProductVariation) {
      newCartItemPrice = cartItemProductVariation.price;
      if (cartItemProductVariation.stock && quantity > cartItemProductVariation.stock) {
        newCartItemQuantity = cartItemProductVariation.stock;
      }
    }

    const newCartItem = createCartItemObject(cartItemProduct, newCartItemPrice, newCartItemQuantity, cartItemProductVariation);

    return {
      ...state,
      items: [...state.items, newCartItem],
    };
  } else {
    const updatedCartItems = state.items.map((item) => {
      if (item.productId === productId) {
        let newQuantity = Number(item.quantity) + Number(quantity || 1);

        if (cartItemProductVariation && item.variation) {
          if (item.variation?.id === variationId) {
            if (cartItemProductVariation.stock && newQuantity > cartItemProductVariation.stock) {
              newQuantity = cartItemProductVariation.stock;
            }

            return {
              ...item,
              quantity: newQuantity,
            };
          } else {
            return {
              ...item,
            };
          }
        } else {
          if (cartItemProduct.stock && newQuantity > cartItemProduct.stock) {
            newQuantity = cartItemProduct.stock;
          }

          return {
            ...item,
            quantity: newQuantity,
          };
        }
      } else {
        return {
          ...item,
        };
      }
    });

    return {
      ...state,
      items: updatedCartItems,
    };
  }
}

function updateCartItem(state: Cart, productId: number, quantity: number, existingCartItem?: Item, variationId?: number) {
  if (existingCartItem) {
    const updatedCartItems = state.items
      .map((item) => {
        if (item.variation) {
          if (item.productId === productId && item.variation?.id === variationId) {
            let newCartItemQuantity = quantity;
            if (item.variation.stock) {
              if (newCartItemQuantity > item.variation.stock) newCartItemQuantity = item.variation.stock;
            }
            return {
              ...item,
              quantity: newCartItemQuantity,
            };
          }
        } else {
          if (item.productId === productId) {
            let newCartItemQuantity = quantity;
            if (item.stock) {
              if (newCartItemQuantity > item.stock) newCartItemQuantity = item.stock;
            }
            return {
              ...item,
              quantity: quantity,
            };
          }
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    return {
      ...state,
      items: updatedCartItems,
    };
  } else {
    return state;
  }
}

function removeCartItem(state: Cart, productId: number, existingCartItem?: Item, variationId?: number) {
  if (existingCartItem) {
    const updatedCartItems = state.items.filter((item) => {
      if (item.variation) {
        if (item.variation?.id !== variationId) return item;
      } else {
        if (item.productId !== productId) return item;
      }
    });

    return {
      ...state,
      items: updatedCartItems,
    };
  } else {
    return state;
  }
}

function addCartCoupon(state: Cart, coupon: CouponType) {
  if (coupon) {
    if (state.coupons && state.coupons.length > 0) {
      return {
        ...state,
        coupons: [...state.coupons, coupon],
      };
    } else {
      return {
        ...state,
        coupons: [coupon],
      };
    }
  } else {
    return state;
  }
}

function removeCartCoupon(state: Cart, couponId: number) {
  if (couponId) {
    if (state.coupons && state.coupons.length > 0) {
      const updatedCoupons = state.coupons.filter((coupon) => coupon.id !== couponId);
      return {
        ...state,
        coupons: updatedCoupons,
      };
    } else {
      return state;
    }
  } else {
    return state;
  }
}

function updateCartTotal(state: Cart) {
  let cartSubTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let cartTotal = cartSubTotal;

  if (state.coupons && state.coupons.length > 0) {
    state.coupons.forEach((coupon) => {
      if (coupon.type === 'fixed') {
        if (coupon.amount) cartTotal = cartTotal - coupon.amount;
      } else if (coupon.type === 'percentage') {
        if (coupon.amount) {
          const couponPercent = (100 - coupon.amount) / 100;
          cartTotal = cartTotal * couponPercent;
        }
      }
    });
  }

  return {
    ...state,
    subTotal: cartSubTotal,
    total: cartTotal,
  };
}

export default function CartReducer(state: Cart, action: CartAction) {
  switch (action.type) {
    case 'add_cart_item': {
      const { cartItemProduct, productId, quantity, variationId } = action.payload;

      const existingCartItem = findExistingCartItem(state, productId, variationId);

      return addCartItem(state, cartItemProduct, productId, quantity, existingCartItem, variationId);
    }

    case 'update_cart_item': {
      const { productId, quantity, variationId } = action.payload;

      const existingCartItem = findExistingCartItem(state, productId, variationId);

      return updateCartItem(state, productId, quantity, existingCartItem, variationId);
    }

    case 'remove_cart_item': {
      const { productId, variationId } = action.payload;

      const existingCartItem = findExistingCartItem(state, productId, variationId);

      return removeCartItem(state, productId, existingCartItem, variationId);
    }

    case 'add_cart_coupon': {
      const coupon = action.payload.coupon;

      return addCartCoupon(state, coupon);
    }

    case 'remove_cart_coupon': {
      const couponId = Number(action.payload.couponId);

      return removeCartCoupon(state, couponId);
    }

    case 'update_cart_total':
      return updateCartTotal(state);

    case 'empty_cart':
      return createEmptyCartObject();

    default:
      return state;
  }
}
