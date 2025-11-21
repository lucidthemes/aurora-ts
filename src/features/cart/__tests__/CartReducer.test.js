import CartReducer from '../CartReducer';
import { CartObject } from '../CartObjects';

describe('CartReducer', () => {
  const mockProductWithVariation = {
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

  const mockProductWithOutVariation = {
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

  const mockExistingCartItems = [
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

  const mockCouponFixed = {
    id: 1,
    code: 'COUPON-5',
    type: 'fixed',
    amount: 5,
    expires: '',
  };

  const mockCouponPercentage = {
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
    const state = new CartObject();

    const result = CartReducer(state, {
      type: 'add_cart_item',
      cartItemProduct: mockProductWithVariation,
      productId: 1,
      variationId: 1001,
      quantity: 1,
    });

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
    const state = new CartObject();

    const result = CartReducer(state, {
      type: 'add_cart_item',
      cartItemProduct: mockProductWithOutVariation,
      productId: 4,
      quantity: 1,
    });

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
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const result = CartReducer(existingState, {
      type: 'add_cart_item',
      cartItemProduct: mockProductWithVariation,
      productId: 1,
      variationId: 1001,
      quantity: 1,
    });

    expect(result.items[0].quantity).toBe(2);
  });

  test('updates quantity if item without variation already within cart', () => {
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const result = CartReducer(existingState, {
      type: 'add_cart_item',
      cartItemProduct: mockProductWithOutVariation,
      productId: 4,
      quantity: 1,
    });

    expect(result.items[1].quantity).toBe(2);
  });

  test('removes a cart item with variation', () => {
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const result = CartReducer(existingState, {
      type: 'remove_cart_item',
      productId: 1,
      variationId: 1001,
    });

    expect(result.items).toHaveLength(1);
  });

  test('removes a cart item without variation', () => {
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const result = CartReducer(existingState, {
      type: 'remove_cart_item',
      productId: 4,
    });

    expect(result.items).toHaveLength(1);
  });

  test('adds a coupon', () => {
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const result = CartReducer(existingState, { type: 'add_cart_coupon', coupon: mockCouponFixed });

    expect(result.coupons).toContainEqual(mockCouponFixed);
  });

  test('removes a coupon', () => {
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [mockCouponFixed],
      total: 40,
    };

    const result = CartReducer(existingState, {
      type: 'remove_cart_coupon',
      couponId: 1,
    });

    expect(result.coupons).toHaveLength(0);
  });

  test('applies fixed amount coupon discount', async () => {
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [mockCouponFixed],
      total: 40,
    };

    const result = CartReducer(existingState, { type: 'update_cart_total' });

    expect(result.subTotal).toBe(existingState.subTotal);
    expect(result.total).toBe(existingState.subTotal - mockCouponFixed.amount);
  });

  test('applies percentage amount coupon discount', async () => {
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [mockCouponPercentage],
      total: 40,
    };

    const result = CartReducer(existingState, { type: 'update_cart_total' });

    expect(result.subTotal).toBe(existingState.subTotal);
    expect(result.total).toBe(((100 - mockCouponPercentage.amount) / 100) * existingState.subTotal);
  });

  test('empties the cart', () => {
    const existingState = {
      items: mockExistingCartItems,
      subTotal: 40,
      coupons: [],
      total: 40,
    };

    const result = CartReducer(existingState, { type: 'empty_cart' });

    expect(result.items).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.coupons).toHaveLength(0);
  });
});
