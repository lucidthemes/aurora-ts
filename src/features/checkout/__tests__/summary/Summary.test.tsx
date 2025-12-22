import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@server/products/getAttribute', () => ({
  getAttributeMap: vi.fn(),
}));

vi.mock('@server/shop/getCoupon', () => ({
  getCouponByCode: vi.fn(),
}));

import { getAttributeMap } from '@server/products/getAttribute';
import { getCouponByCode } from '@server/shop/getCoupon';
import type { Item } from '@typings/cart/item';
import type { Coupon } from '@typings/shop/coupon';
import type { ShippingOption } from '@typings/shop/shippingOption';
import { Attribute } from '@typings/products/attribute';

import Summary from '../../components/summary';

describe('Summary component', () => {
  const mockCartItems: Item[] = [
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
  ];

  const mockCartSubTotal = 60;

  const mockCartCoupons: Coupon[] = [
    {
      id: 2,
      code: 'COUPON-10',
      type: 'percentage',
      amount: 10,
      expires: '',
    },
  ];

  const mockCartTotal = 54;

  const addCartCouponMock = vi.fn();

  const removeCartCouponMock = vi.fn();

  const mockShippingOption: ShippingOption = {
    id: 1,
    name: 'Standard',
    amount: 0,
  };

  const mockCheckoutTotal = 54;

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

  const mockNewValidCoupon: Coupon = {
    id: 1,
    code: 'COUPON-5',
    type: 'fixed',
    amount: 5,
    expires: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders summary', () => {
    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /order summary/i })).toBeInTheDocument();

    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/£60/i)).toBeInTheDocument();

    expect(screen.getByText(/standard/i)).toBeInTheDocument();
    expect(screen.getByText(/free/i)).toBeInTheDocument();

    expect(screen.getByText(/total/)).toBeInTheDocument();
    expect(screen.getByText(/£54/i)).toBeInTheDocument();
  });

  test('renders cart items', () => {
    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    const itemList = screen.getByRole('list', { name: /cart items/i });
    expect(itemList).toBeInTheDocument();

    const listItems = itemList.querySelectorAll(':scope > li');
    expect(listItems).toHaveLength(3);
  });

  test('renders cart item information', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    const itemList = await screen.findByRole('list', { name: /cart items/i });
    expect(itemList).toBeInTheDocument();

    const firstListItem = itemList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('img', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByText(/£20.00/i)).toBeInTheDocument();

    const variations = await within(firstListItem).findByRole('list', { name: /Selected variations/i });
    expect(variations).toBeInTheDocument();
    expect(within(variations).getByText(/colour/i)).toBeInTheDocument();
    expect(within(variations).getByText(/black/i)).toBeInTheDocument();
    expect(within(variations).getByText(/size/i)).toBeInTheDocument();
    expect(within(variations).getByText(/small/i)).toBeInTheDocument();
  });

  test('renders add coupon button', async () => {
    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add coupons/i })).toBeInTheDocument();
    });
  });

  test('renders add coupon form when button clicked', async () => {
    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /add coupons/i }));

    await waitFor(() => {
      expect(screen.getByRole('form', { name: /add coupon/i })).toBeInTheDocument();
    });
  });

  test('adds new coupon when form successfully submitted', async () => {
    vi.mocked(getCouponByCode).mockResolvedValue(mockNewValidCoupon);

    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /add coupons/i }));

    const couponForm = screen.getByRole('form', { name: /add coupon/i });
    expect(couponForm).toBeInTheDocument();

    fireEvent.change(within(couponForm).getByLabelText(/enter code/i), {
      target: { value: 'coupon-5' },
    });

    fireEvent.click(within(couponForm).getByRole('button', { name: /apply/i }));

    await waitFor(() => {
      expect(addCartCouponMock).toHaveBeenCalledWith(mockNewValidCoupon);
    });
  });

  test('removes coupon when remove button clicked', async () => {
    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    const couponsList = screen.getByRole('list', { name: /active coupons/i });
    expect(couponsList).toBeInTheDocument();

    fireEvent.click(within(couponsList).getByRole('button', { name: /remove coupon/i }));

    await waitFor(() => {
      expect(removeCartCouponMock).toHaveBeenCalledWith(2);
    });
  });

  test('renders discount if coupon active', async () => {
    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={mockCartCoupons}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/discount/i)).toBeInTheDocument();
      expect(screen.getByText(/-£6/i)).toBeInTheDocument();
    });

    const couponsList = screen.getByRole('list', { name: /active coupons/i });
    expect(couponsList).toBeInTheDocument();

    const coupons = within(couponsList).getAllByRole('listitem');
    expect(coupons).toHaveLength(1);
  });

  test('hides discount if no coupon active', async () => {
    render(
      <MemoryRouter>
        <Summary
          cartItems={mockCartItems}
          cartSubTotal={mockCartSubTotal}
          cartCoupons={[]}
          cartTotal={mockCartTotal}
          addCartCoupon={addCartCouponMock}
          removeCartCoupon={removeCartCouponMock}
          shippingOption={mockShippingOption}
          checkoutTotal={mockCheckoutTotal}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText(/discount/i)).not.toBeInTheDocument();
    });
  });
});
