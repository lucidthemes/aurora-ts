import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/products/getAttribute', () => ({
  getAttributeMap: vi.fn(),
}));

import { getAttributeMap } from '@server/products/getAttribute';
import type { Order } from '@typings/shop/order';
import type { Attribute } from '@typings/products/attribute';

import useItems from '../../hooks/orderReceived/useItems';

describe('useItems hook', () => {
  const mockOrder: Order = {
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

  const mockAttributeMap: Record<number, Attribute> = {
    1: {
      id: 1,
      name: 'Black',
      slug: 'black',
      type: 'colour',
    },
    2: {
      id: 2,
      name: 'Green',
      slug: 'green',
      type: 'colour',
    },
    4: {
      id: 4,
      name: 'Small',
      slug: 'small',
      type: 'size',
    },
  };

  const mockAttributeIds = mockOrder.items.flatMap((item) => [item.variation?.colourId, item.variation?.sizeId]).filter(Boolean) as number[];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches attributes data and sets attributeMap state', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    const { result } = renderHook(() => useItems(mockOrder.items));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockAttributeMap);
    });

    expect(getAttributeMap).toHaveBeenCalledWith(mockAttributeIds);
  });
});
