import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

import { getProductById } from '@server/products/getProduct';
import type { Cart } from '@typings/cart/cart';
import type { Item } from '@typings/cart/item';
import type { Coupon as CouponType } from '@typings/shop/coupon';

import { createEmptyCartObject } from './CartObjects';
import CartReducer from './CartReducer';

interface CartContextType {
  cartItems: Item[];
  cartSubTotal: number;
  cartCoupons: CouponType[];
  cartTotal: number;
  addCartItem: (productId: number, quantity: number, variationId?: number | undefined) => void;
  updateCartItem: (productId: number, quantity: number, variationId?: number | undefined) => void;
  removeCartItem: (productId: number, variationId?: number | undefined) => void;
  emptyCart: () => void;
  addCartCoupon: (coupon: CouponType) => void;
  removeCartCoupon: (couponId: number) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartSubTotal: 0,
  cartCoupons: [],
  cartTotal: 0,
  addCartItem: () => {},
  updateCartItem: () => {},
  removeCartItem: () => {},
  emptyCart: () => {},
  addCartCoupon: () => {},
  removeCartCoupon: () => {},
});

const initialEmptyCartState = createEmptyCartObject();

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(CartReducer, initialEmptyCartState, (): Cart => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? (JSON.parse(stored) as Cart) : initialEmptyCartState;
    } catch {
      return initialEmptyCartState;
    }
  });

  const addCartItem = (productId: number, quantity: number, variationId?: number) => {
    const fetchProduct = async () => {
      try {
        const cartItemProduct = await getProductById(productId);
        if (cartItemProduct) {
          dispatch({ type: 'add_cart_item', payload: { cartItemProduct, productId, quantity, variationId } });
        }
      } catch (error) {
        console.error('Failed to fetch product.', error);
      }
    };

    fetchProduct();
  };

  const updateCartItem = (productId: number, quantity: number, variationId?: number) => {
    dispatch({ type: 'update_cart_item', payload: { productId, quantity, variationId } });
  };

  const removeCartItem = (productId: number, variationId?: number) => {
    dispatch({ type: 'remove_cart_item', payload: { productId, variationId } });
  };

  const emptyCart = () => {
    dispatch({ type: 'empty_cart' });
  };

  const addCartCoupon = (coupon: CouponType) => {
    dispatch({ type: 'add_cart_coupon', payload: { coupon } });
  };

  const removeCartCoupon = (couponId: number) => {
    dispatch({ type: 'remove_cart_coupon', payload: { couponId } });
  };

  useEffect(() => {
    dispatch({ type: 'update_cart_total' });
  }, [state.items, state.coupons]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const cartItems = state.items;
  const cartSubTotal = state.subTotal;
  const cartCoupons = state.coupons;
  const cartTotal = state.total;

  return (
    <CartContext.Provider
      value={{ cartItems, cartSubTotal, cartCoupons, cartTotal, addCartItem, updateCartItem, removeCartItem, emptyCart, addCartCoupon, removeCartCoupon }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  return useContext(CartContext);
};
