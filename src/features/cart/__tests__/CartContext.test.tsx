import { renderHook, act } from '@testing-library/react';
import type { ReactNode, FC } from 'react';

vi.mock('@server/products/getProduct', () => ({
  getProductById: vi.fn(),
}));

import { getProductById } from '@server/products/getProduct';
import type { Product } from '@typings/products/product';
import type { Coupon } from '@typings/shop/coupon';
import type { Variation as VariationType } from '@typings/cart/variation';

import { CartProvider, useCartContext } from '../CartContext';

describe('CartContext', () => {
  type ProductWithVariations = Product & {
    variations: [VariationType, ...VariationType[]];
  };

  const mockProductWithVariation: ProductWithVariations = {
    id: 1,
    title: 'Cozy sweater',
    slug: 'cozy-sweater',
    date: '2025-09-10',
    image: '/images/products/product-1.jpg',
    price: 20,
    inStock: true,
    SKU: 'CS',
    variationAttributes: [
      {
        type: 'colour',
        options: [1, 2, 3],
      },
      {
        type: 'size',
        options: [4, 5, 6],
      },
    ],
    variations: [
      {
        id: 1001,
        colourId: 1,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-BLACK-S',
      },
      {
        id: 1002,
        colourId: 1,
        sizeId: 5,
        price: 22.5,
        stock: 15,
        SKU: 'CS-BLACK-M',
      },
      {
        id: 1003,
        colourId: 1,
        sizeId: 6,
        price: 25,
        stock: 15,
        SKU: 'CS-BLACK-L',
      },
      {
        id: 1004,
        colourId: 2,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-GREEN-S',
      },
      {
        id: 1005,
        colourId: 2,
        sizeId: 5,
        price: 22.5,
        stock: 5,
        SKU: 'CS-GREEN-M',
      },
      {
        id: 1006,
        colourId: 3,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-RED-S',
      },
    ],
  };

  const mockProductWithOutVariation: Product = {
    id: 4,
    title: 'Handmade bonnet',
    slug: 'handmade-bonnet',
    date: '2025-09-07',
    image: '/images/products/product-10.jpg',
    price: 20.0,
    inStock: true,
    stock: 5,
    SKU: 'HB',
  };

  const mockCoupon: Coupon = {
    id: 1,
    code: 'COUPON-5',
    type: 'fixed',
    amount: 5,
    expires: '',
  };

  let wrapper: FC<{ children: ReactNode }>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('initializes with empty cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.cartSubTotal).toBe(0);
    expect(result.current.cartCoupons).toEqual([]);
    expect(result.current.cartTotal).toBe(0);
  });

  test('adds new item with variation and updates cart items via context', async () => {
    vi.mocked(getProductById).mockResolvedValue(mockProductWithVariation);

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      result.current.addCartItem(1, 1, 1001);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toMatchObject({
      productId: mockProductWithVariation.id,
      price: mockProductWithVariation.variations[0].price,
      quantity: 1,
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('adds new item without variation and updates cart items via context', async () => {
    vi.mocked(getProductById).mockResolvedValue(mockProductWithOutVariation);

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      result.current.addCartItem(4, 1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toMatchObject({
      productId: mockProductWithOutVariation.id,
      price: mockProductWithOutVariation.price,
      quantity: 1,
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('updates a cart item with varition via context', async () => {
    vi.mocked(getProductById).mockResolvedValue(mockProductWithVariation);

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      result.current.addCartItem(1, 1, 1001);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toMatchObject({
      quantity: 1,
    });

    act(() => {
      result.current.updateCartItem(1, 2, 1001);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toMatchObject({
      quantity: 2,
    });
    expect(result.current.cartTotal).toBe(mockProductWithVariation.variations[0].price * 2);
  });

  test('updates a cart item without varition via context', async () => {
    vi.mocked(getProductById).mockResolvedValue(mockProductWithOutVariation);

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      result.current.addCartItem(4, 1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toMatchObject({
      quantity: 1,
    });

    act(() => {
      result.current.updateCartItem(4, 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toMatchObject({
      quantity: 2,
    });
    expect(result.current.cartTotal).toBe(mockProductWithOutVariation.price * 2);
  });

  test('removes a cart item with varition via context', async () => {
    vi.mocked(getProductById).mockResolvedValue(mockProductWithVariation);

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      result.current.addCartItem(1, 1, 1001);
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.removeCartItem(1, 1001);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  test('removes a cart item without varition via context', async () => {
    vi.mocked(getProductById).mockResolvedValue(mockProductWithOutVariation);

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      result.current.addCartItem(4, 1);
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.removeCartItem(4);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  test('adds coupon via context', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addCartCoupon(mockCoupon);
    });

    expect(result.current.cartCoupons).toHaveLength(1);
  });

  test('removes coupon via context', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addCartCoupon(mockCoupon);
    });

    expect(result.current.cartCoupons).toHaveLength(1);

    act(() => {
      result.current.removeCartCoupon(mockCoupon.id);
    });

    expect(result.current.cartCoupons).toHaveLength(0);
  });

  test('empties the cart via context', async () => {
    vi.mocked(getProductById).mockResolvedValue(mockProductWithVariation);

    const { result } = renderHook(() => useCartContext(), { wrapper });

    await act(async () => {
      result.current.addCartItem(1, 1, 1001);
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.emptyCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
