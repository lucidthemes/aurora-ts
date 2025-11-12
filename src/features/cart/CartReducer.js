import { CartObject, CartItemObject } from './cartObjects';

function addCartItem(state, cartItemProduct, productId, variationId, quantity, existingCartItem) {
  let cartItemProductVariation = '';

  if (variationId) {
    cartItemProductVariation = cartItemProduct.variations.find((variation) => variation.id === variationId);
  }

  if (!existingCartItem) {
    let newCartItemPrice = cartItemProduct.price;
    let newCartItemQuantity = quantity;

    if (cartItemProductVariation) {
      newCartItemPrice = cartItemProductVariation.price;
      if (quantity > cartItemProductVariation.stock) {
        newCartItemQuantity = cartItemProductVariation.stock;
      }
    }

    const newCartItem = new CartItemObject(cartItemProduct, cartItemProductVariation, newCartItemPrice, newCartItemQuantity);

    return {
      ...state,
      items: [...state.items, newCartItem],
    };
  } else {
    const updatedCartItems = state.items.map((item) => {
      if (item.productId === productId) {
        let newQuantity = Number(item.quantity) + Number(quantity || 1);

        if (item.variation) {
          if (item.variation?.id === variationId) {
            if (newQuantity > cartItemProductVariation.stock) {
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
          if (newQuantity > cartItemProduct.stock) {
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

function updateCartItem(state, productId, variationId, quantity, existingCartItem) {
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

function removeCartItem(state, productId, variationId, existingCartItem) {
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

function addCartCoupon(state, coupon) {
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

function removeCartCoupon(state, couponId) {
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

function updateCartTotal(state) {
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

export default function CartReducer(state, action) {
  if (action.type === 'empty_cart') {
    return new CartObject();
  }

  const cartItemProduct = action.cartItemProduct != null ? action.cartItemProduct : null;
  const productId = action.productId != null ? Number(action.productId) : null;
  const variationId = action.variationId != null ? Number(action.variationId) : null;
  const quantity = action.quantity != null ? Number(action.quantity) : null;

  const existingCartItem =
    productId != null && variationId === null
      ? state.items.find((item) => item.productId === productId)
      : productId != null && variationId != null
        ? state.items.find((item) => item.productId === productId && item.variation?.id === variationId)
        : null;

  const coupon = action.coupon != null ? action.coupon : null;
  const couponId = action.couponId != null ? Number(action.couponId) : null;

  switch (action.type) {
    case 'add_cart_item':
      return addCartItem(state, cartItemProduct, productId, variationId, quantity, existingCartItem);

    case 'update_cart_item':
      return updateCartItem(state, productId, variationId, quantity, existingCartItem);

    case 'remove_cart_item':
      return removeCartItem(state, productId, variationId, existingCartItem);

    case 'add_cart_coupon':
      return addCartCoupon(state, coupon);

    case 'remove_cart_coupon':
      return removeCartCoupon(state, couponId);

    case 'update_cart_total':
      return updateCartTotal(state);

    default:
      return state;
  }
}
