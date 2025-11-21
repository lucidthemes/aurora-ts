import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import Form from '../../components/form';

vi.mock('@contexts/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

vi.mock('@server/shop/getShippingOptions', () => ({
  getShippingOptions: vi.fn(),
}));

vi.mock('@server/shop/getPaymentOptions', () => ({
  getPaymentOptions: vi.fn(),
}));

import { useAuthContext } from '@contexts/AuthContext';
import { getShippingOptions } from '@server/shop/getShippingOptions';
import { getPaymentOptions } from '@server/shop/getPaymentOptions';
import { MemoryRouter } from 'react-router-dom';

describe('Form component', () => {
  useAuthContext.mockReturnValue({
    loggedInUser: '',
  });

  const mockCartItems = [
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
      variationId: null,
      variation: null,
      quantity: 1,
    },
  ];

  const mockCartSubTotal = 60;

  const mockCartCoupons = [
    {
      id: 2,
      code: 'COUPON-10',
      type: 'percentage',
      amount: 10,
      expires: '',
    },
  ];

  const emptyCartMock = vi.fn();

  const mockShippingOption = {
    id: 1,
    name: 'Standard',
    amount: 0,
  };

  const setShippingOptionMock = vi.fn();

  const mockPaymentOption = {
    id: 1,
    name: 'Direct bank transfer',
    description:
      'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
  };

  const setPaymentOptionMock = vi.fn();

  const mockCheckoutTotal = 54;

  const mockShippingOptions = [
    {
      id: 1,
      name: 'Standard',
      amount: 0,
    },
    {
      id: 2,
      name: 'Express',
      amount: 1.99,
    },
  ];

  const mockPaymentOptions = [
    {
      id: 1,
      name: 'Direct bank transfer',
      description:
        'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
    },
    {
      id: 2,
      name: 'Cheque payment',
      description: 'Please send a cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.',
    },
    {
      id: 3,
      name: 'Cash on delivery',
      description: 'Pay with cash upon delivery.',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders form', () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('form', { name: /checkout/i })).toBeInTheDocument();
  });

  test('renders contact information fieldset', () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    const fieldset = screen.getByRole('group', { name: /contact information/i });

    expect(fieldset).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  });

  test('renders shipping address fieldset', () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    const fieldset = screen.getByRole('group', { name: /shipping address/i });

    expect(fieldset).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /first/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /last/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('combobox', { name: /country/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /line 1/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /line 2/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /city/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /county/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /postcode/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
  });

  test('renders billing address checkbox', () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('checkbox', { name: /use same address for billing/i })).toBeInTheDocument();
  });

  test('renders billing address fieldset after checkbox ticked', () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('checkbox', { name: /use same address for billing/i }));

    const fieldset = screen.getByRole('group', { name: /billing address/i });

    expect(fieldset).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /first/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /last/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('combobox', { name: /country/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /line 1/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /line 2/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /city/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /county/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /postcode/i })).toBeInTheDocument();
    expect(within(fieldset).getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
  });

  test('renders shipping options fieldset when shipping option data is fetched', async () => {
    getShippingOptions.mockResolvedValue(mockShippingOptions);

    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    const fieldset = await screen.findByRole('group', { name: /shipping options/i });
    expect(fieldset).toBeInTheDocument();

    const shippingOptions = await within(fieldset).findAllByRole('listitem');
    expect(shippingOptions).toHaveLength(2);
  });

  test('renders payment options fieldset when payment option data is fetched', async () => {
    getPaymentOptions.mockResolvedValue(mockPaymentOptions);

    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    const fieldset = await screen.findByRole('group', { name: /payment options/i });
    expect(fieldset).toBeInTheDocument();

    const paymentOptions = await within(fieldset).findAllByRole('listitem');
    expect(paymentOptions).toHaveLength(3);
  });

  test('renders note checkbox', async () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/add a note to your order/i)).toBeInTheDocument();
    });
  });

  test('renders note textarea after checkbox ticked', async () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('checkbox', { name: /add a note to your order/i }));

    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /notes about your order/i })).toBeInTheDocument();
    });
  });

  test('renders terms and conditions text', async () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/by proceeding/i)).toBeInTheDocument();
    });
  });

  test('renders place order button', async () => {
    render(
      <MemoryRouter>
        <Form
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          emptyCart={emptyCartMock}
          shippingOption={mockShippingOption}
          setShippingOption={setShippingOptionMock}
          paymentOption={mockPaymentOption}
          setPaymentOption={setPaymentOptionMock}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /place order/i })).toBeInTheDocument();
    });
  });
});
