import { render, screen, within, waitFor } from '@testing-library/react';

vi.mock('@server/products/getAttribute', () => ({
  getAttributeMap: vi.fn(),
}));

import { getAttributeMap } from '@server/products/getAttribute';
import type { Order } from '@typings/shop/order';
import type { Attribute } from '@typings/products/attribute';

import OrderReceived from '../../components/orderReceived/OrderReceived';

describe('OrderReceived component', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders heading', () => {
    render(<OrderReceived order={mockOrder} />);

    expect(screen.getByRole('heading', { name: /thank you/i })).toBeInTheDocument();
  });

  test('renders overview', () => {
    render(<OrderReceived order={mockOrder} />);

    const overview = screen.getByRole('region', { name: /overview/i });

    expect(overview).toBeInTheDocument();
    expect(within(overview).getByText(/order number/i)).toBeInTheDocument();
    expect(within(overview).getByText(/date/i)).toBeInTheDocument();
    expect(within(overview).getByText(/total/i)).toBeInTheDocument();
    expect(within(overview).getByText(/payment option/i)).toBeInTheDocument();
  });

  test('renders order details items', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    render(<OrderReceived order={mockOrder} />);

    const orderDetails = screen.getByRole('region', { name: /order details/i });

    expect(orderDetails).toBeInTheDocument();
    expect(within(orderDetails).getByRole('heading', { name: /items/i })).toBeInTheDocument();

    const itemList = await screen.findByRole('list', { name: /order items/i });
    expect(itemList).toBeInTheDocument();

    const listItems = itemList.querySelectorAll(':scope > li');
    expect(listItems).toHaveLength(3);
  });

  test('renders order details item information', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    render(<OrderReceived order={mockOrder} />);

    const itemList = await screen.findByRole('list', { name: /order items/i });
    expect(itemList).toBeInTheDocument();

    const firstListItem = itemList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByText(/£20.00/i)).toBeInTheDocument();

    const variations = await within(firstListItem).findByRole('list', { name: /item variations/i });
    expect(variations).toBeInTheDocument();
    expect(within(variations).getByText(/colour/i)).toBeInTheDocument();
    expect(within(variations).getByText(/black/i)).toBeInTheDocument();
    expect(within(variations).getByText(/size/i)).toBeInTheDocument();
    expect(within(variations).getByText(/small/i)).toBeInTheDocument();
  });

  test('renders order details totals', async () => {
    render(<OrderReceived order={mockOrder} />);

    const orderDetails = screen.getByRole('region', { name: /order details/i });

    expect(orderDetails).toBeInTheDocument();

    await waitFor(() => {
      expect(within(orderDetails).getByRole('heading', { name: /totals/i })).toBeInTheDocument();

      expect(within(orderDetails).getByText(/subtotal/i)).toBeInTheDocument();
      expect(within(orderDetails).getByText(/£60/i)).toBeInTheDocument();

      expect(within(orderDetails).getByText(/discount/i)).toBeInTheDocument();
      expect(within(orderDetails).getByText(/coupon-10/i)).toBeInTheDocument();
      expect(within(orderDetails).getByText(/-£6.00/i)).toBeInTheDocument();

      expect(within(orderDetails).getByText(/shipping option/i)).toBeInTheDocument();
      expect(within(orderDetails).getByText(/standard/i)).toBeInTheDocument();
      expect(within(orderDetails).getByText(/free/i)).toBeInTheDocument();

      expect(within(orderDetails).getByText(/payment option/i)).toBeInTheDocument();
      expect(within(orderDetails).getByText(/direct bank transfer/i)).toBeInTheDocument();

      expect(within(orderDetails).getByText(/total/)).toBeInTheDocument();
      expect(within(orderDetails).getByText(/£54/i)).toBeInTheDocument();
    });
  });

  test('renders order details note', async () => {
    render(<OrderReceived order={mockOrder} />);

    const orderDetails = screen.getByRole('region', { name: /order details/i });

    expect(orderDetails).toBeInTheDocument();

    await waitFor(() => {
      expect(within(orderDetails).getByRole('heading', { name: /note/i })).toBeInTheDocument();
      expect(within(orderDetails).getByText(/please leave inside porch/i)).toBeInTheDocument();
    });
  });

  test('renders shipping address', async () => {
    render(<OrderReceived order={mockOrder} />);

    const shipping = screen.getByRole('region', { name: /shipping address/i });

    await waitFor(() => {
      expect(shipping).toBeInTheDocument();
    });
  });

  test('renders billing address', async () => {
    render(<OrderReceived order={mockOrder} />);

    const billing = screen.getByRole('region', { name: /billing address/i });

    await waitFor(() => {
      expect(billing).toBeInTheDocument();
    });
  });
});
