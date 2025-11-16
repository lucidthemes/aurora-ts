import { render, screen, fireEvent, within } from '@testing-library/react';
import Items from '../../components/orders/Items';

vi.mock('@server/products/getAttribute', () => ({
  getAttributeMap: vi.fn(),
}));

import { getAttributeMap } from '@server/products/getAttribute';

describe('Items component', () => {
  const mockOrders = [
    {
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
          price: 20.0,
          variation: {
            id: 1001,
            colourId: 1,
            sizeId: 4,
            price: 20.0,
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
          price: 20.0,
          variation: {
            id: 2002,
            colourId: 2,
            price: 20.0,
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
          price: 20.0,
          quantity: 1,
        },
      ],
      subTotal: 60,
      coupons: [
        {
          id: 2,
          code: 'COUPON-10',
          type: 'percentage',
          amount: 10.0,
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
      total: 54.0,
    },
    {
      id: 1002,
      customerId: 1,
      date: '2025-10-22T15:30:51.372Z',
    },
  ];

  const mockAttributeMap = {
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

  beforeEach(() => {
    vi.clearAllMocks();

    getAttributeMap.mockResolvedValue(mockAttributeMap);
  });

  test('renders list of orders', () => {
    render(<Items orders={mockOrders} />);

    const ordersList = screen.getByRole('list', { name: /orders/i });
    expect(ordersList).toBeInTheDocument();

    const listItems = ordersList.querySelectorAll(':scope > li');
    expect(listItems).toHaveLength(2);
  });

  test('renders order expand button', () => {
    render(<Items orders={mockOrders} />);

    const ordersList = screen.getByRole('list', { name: /orders/i });
    expect(ordersList).toBeInTheDocument();

    const firstListItem = ordersList.querySelector(':scope > li:first-child');
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('button', { name: /expand order/i })).toBeInTheDocument();
  });

  test('renders order details when expand button clicked', () => {
    render(<Items orders={mockOrders} />);

    const ordersList = screen.getByRole('list', { name: /orders/i });
    expect(ordersList).toBeInTheDocument();

    const firstListItem = ordersList.querySelector(':scope > li:first-child');
    expect(firstListItem).toBeInTheDocument();

    const expandButton = within(firstListItem).getByRole('button', { name: /expand order/i });
    expect(expandButton).toBeInTheDocument();
    fireEvent.click(expandButton);

    expect(within(firstListItem).getByRole('heading', { name: /order details/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /items/i })).toBeInTheDocument();

    const itemsList = within(firstListItem).getByRole('list', { name: /Order items/i });
    expect(itemsList).toBeInTheDocument();

    const listItems = itemsList.querySelectorAll(':scope > li');
    expect(listItems).toHaveLength(3);

    expect(within(firstListItem).getByRole('heading', { name: /totals/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /note/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /shipping address/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /billing address/i })).toBeInTheDocument();
  });
});
