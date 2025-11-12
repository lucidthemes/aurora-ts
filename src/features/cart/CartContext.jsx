import { createContext, useContext, useReducer, useEffect } from 'react';
import { CartObject } from './cartObjects';
import CartReducer from './CartReducer';
import { getProductById } from '@server/products/getProduct';

export const CartContext = createContext();

const initialCartState = new CartObject();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialCartState, () => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : initialCartState;
    } catch (error) {
      return initialCartState;
    }
  });

  const addCartItem = (productId, variationId, quantity) => {
    const fetchProduct = async () => {
      try {
        const cartItemProduct = await getProductById(productId);
        if (cartItemProduct) {
          dispatch({ type: 'add_cart_item', cartItemProduct, productId, variationId, quantity });
        }
      } catch (error) {
        console.error('Failed to fetch product.', error);
      }
    };

    fetchProduct();
  };

  const updateCartItem = (productId, variationId, quantity) => {
    dispatch({ type: 'update_cart_item', productId, variationId, quantity });
  };

  const removeCartItem = (productId, variationId) => {
    dispatch({ type: 'remove_cart_item', productId, variationId });
  };

  const emptyCart = () => {
    dispatch({ type: 'empty_cart' });
  };

  const addCartCoupon = (coupon) => {
    dispatch({ type: 'add_cart_coupon', coupon });
  };

  const removeCartCoupon = (couponId) => {
    dispatch({ type: 'remove_cart_coupon', couponId });
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

export const useCartContext = () => useContext(CartContext);
