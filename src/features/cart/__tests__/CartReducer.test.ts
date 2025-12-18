import type { Product } from '@typings/products/product';
import type { Item } from '@typings/cart/item';
import type { Coupon } from '@typings/shop/coupon';
import type { Cart, CartAction } from '@typings/cart/cart';

import CartReducer from '../CartReducer';
import { createEmptyCartObject } from '../CartObjects';

describe('CartReducer', () => {
  const mockProductWithVariation: Product = {
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

  const mockProductVariation = {
    id: 1001,
    colourId: 1,
    sizeId: 4,
    price: 20,
    stock: 5,
    SKU: 'CS-BLACK-S',
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

  const mockExistingCartItems: Item[] = [
    {
      productId: 1,
      title: 'Cozy sweater',
      slug: 'cozy-sweater',
      image: '/images/products/product-1.jpg',
      price: 20,
      variation: {
        id: 1001,
        colourId: 1,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-BLACK-S',
      },
      quantity: 1,
    },
    {
      productId: 4,
      title: 'Handmade bonnet',
      slug: 'handmade-bonnet',
      image: '/images/products/product-10.jpg',
      stock: 5,
      price: 20,
      quantity: 1,
    },
  ];

  const mockCouponFixed: Coupon = {
    id: 1,
    code: 'COUPON-5',
    type: 'fixed',
    amount: 5,
    expires: '',
  };

  const mockCouponPercentage: Coupon = {
    id: 2,
    code: 'COUPON-10',
    type: 'percentage',
    amount: 10,
    expires: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('adds a new cart item with variation', () => {
    const mockCartState = createEmptyCartObject();

    const mockCartAction: CartAction = {
      type: 'add_cart_item',
      payload: { cartItemProduct: mockProductWithVariation, productId: 1, quantity: 1, variationId: 1001 },
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].productId).toBe(1);
    expect(result.items[0].title).toBe('Cozy sweater');
    expect(result.items[0].slug).toBe('cozy-sweater');
    expect(result.items[0].image).toBe('/images/products/product-1.jpg');
    expect(result.items[0].stock).toBe(undefined);
    expect(result.items[0].price).toBe(20);
    expect(result.items[0].variation).toEqual(mockProductVariation);
    expect(result.items[0].quantity).toBe(1);
  });

  test('adds a new cart item without variation', () => {
    const mockCartState = createEmptyCartObject();

    const mockCartAction: CartAction = {
      type: 'add_cart_item',
      payload: { cartItemProduct: mockProductWithOutVariation, productId: 4, quantity: 1 },
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].productId).toBe(4);
    expect(result.items[0].title).toBe('Handmade bonnet');
    expect(result.items[0].slug).toBe('handmade-bonnet');
    expect(result.items[0].image).toBe('/images/products/product-10.jpg');
    expect(result.items[0].stock).toBe(5);
    expect(result.items[0].price).toBe(20);
    expect(result.items[0].quantity).toBe(1);
  });

  test('updates quantity if item with variation already within cart', () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'add_cart_item',
      payload: { cartItemProduct: mockProductWithVariation, productId: 1, quantity: 1, variationId: 1001 },
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.items[0].quantity).toBe(2);
  });

  test('updates quantity if item without variation already within cart', () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'add_cart_item',
      payload: { cartItemProduct: mockProductWithOutVariation, productId: 4, quantity: 1 },
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.items[1].quantity).toBe(2);
  });

  test('removes a cart item with variation', () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'remove_cart_item',
      payload: { productId: 1, variationId: 1001 },
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.items).toHaveLength(1);
  });

  test('removes a cart item without variation', () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'remove_cart_item',
      payload: { productId: 4 },
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.items).toHaveLength(1);
  });

  test('adds a coupon', () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'add_cart_coupon',
      payload: { coupon: mockCouponFixed },
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.coupons).toContainEqual(mockCouponFixed);
  });

  test('removes a coupon', () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [mockCouponFixed],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'remove_cart_coupon',
      payload: { couponId: 1 },
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.coupons).toHaveLength(0);
  });

  test('applies fixed amount coupon discount', async () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [mockCouponFixed],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'update_cart_total',
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.subTotal).toBe(mockCartState.subTotal);
    expect(result.total).toBe(mockCartState.subTotal - mockCouponFixed.amount);
  });

  test('applies percentage amount coupon discount', async () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [mockCouponPercentage],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'update_cart_total',
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.subTotal).toBe(mockCartState.subTotal);
    expect(result.total).toBe(((100 - mockCouponPercentage.amount) / 100) * mockCartState.subTotal);
  });

  test('empties the cart', () => {
    const mockCartState: Cart = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const mockCartAction: CartAction = {
      type: 'empty_cart',
    };

    const result = CartReducer(mockCartState, mockCartAction);

    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.coupons).toHaveLength(0);
  });
});
