import { renderHook, waitFor } from '@testing-library/react';
import useOrderReceived from '../../hooks/orderReceived/useOrderReceived';

vi.mock('@server/shop/getOrder', () => ({
  getOrderById: vi.fn(),
}));

import { getOrderById } from '@server/shop/getOrder';

describe('useOrderReceived hook', () => {
  const mockOrder = {
    id: 1001,
    customerId: 1,
    date: '2025-10-23T15:28:51.355Z',
    checkoutData: {
      contact: {
        email: 'test@example.com',
      },
      shipping: {
        firstName: 'Matthew',
        lastName: 'James',
        country: 'GB',
        addressLine1: '68 Rose Place',
        addressLine2: '',
        city: 'East Marybury',
        county: 'Highland',
        postcode: 'IV2 7EG',
        phone: '01234567890',
      },
      billing: {
        firstName: 'Matthew',
        lastName: 'James',
        country: 'GB',
        addressLine1: '68 Rose Place',
        addressLine2: '',
        city: 'East Marybury',
        county: 'Highland',
        postcode: 'IV2 7EG',
        phone: '01234567890',
      },
      note: {
        text: 'Please leave inside porch',
      },
    },
    items: [
      {
        productId: 1,
        title: 'Cozy sweater',
        slug: 'cozy-sweater',
        image: '/images/products/product-1.jpg',
        stock: null,
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
        productId: 2,
        title: 'Autumn beanie',
        slug: 'autumn-beanie',
        image: '/images/products/product-5.jpg',
        stock: null,
        price: 20,
        variation: {
          id: 2002,
          colourId: 2,
          price: 20,
          stock: 5,
          SKU: 'AB-GREEN',
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
        variation: null,
        quantity: 1,
      },
    ],
    subTotal: 60,
    coupons: [
      {
        id: 2,
        code: 'COUPON-10',
        type: 'percentage',
        amount: 10,
        expires: '',
      },
    ],
    shippingOption: {
      id: 1,
      name: 'Standard',
      amount: 0,
    },
    paymentOption: {
      id: 1,
      name: 'Direct bank transfer',
      description:
        'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
    },
    total: 54,
  };

  const mockOrderId = 1001;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches order data and sets order state', async () => {
    getOrderById.mockResolvedValue(mockOrder);

    const { result } = renderHook(() => useOrderReceived(mockOrderId));

    expect(result.current).toBeNull();

    await waitFor(() => {
      expect(result.current).toEqual(mockOrder);
    });

    expect(getOrderById).toHaveBeenCalledWith(mockOrderId);
  });

  test('sets order state to null if orderId is missing', () => {
    const { result } = renderHook(() => useOrderReceived());

    expect(result.current).toBeNull();

    expect(getOrderById).not.toHaveBeenCalled();
  });

  test('sets order state to false if no order found', async () => {
    getOrderById.mockResolvedValue(false);

    const mockInvalidOrder = 1002;

    const { result } = renderHook(() => useOrderReceived(mockInvalidOrder));

    expect(result.current).toBeNull();

    await waitFor(() => {
      expect(result.current).toEqual(false);
    });

    expect(getOrderById).toHaveBeenCalledWith(mockInvalidOrder);
  });
});
