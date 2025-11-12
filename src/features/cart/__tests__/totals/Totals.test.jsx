import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import Totals from '../../components/totals';

vi.mock('@features/Cart/cartContext', () => ({
  useCartContext: vi.fn(),
}));

vi.mock('@server/shop/getCoupon', () => ({
  getCouponByCode: vi.fn(),
}));

import { useCartContext } from '@features/Cart/cartContext';
import { getCouponByCode } from '@server/shop/getCoupon';
import { MemoryRouter } from 'react-router-dom';

describe('Totals component', () => {
  const addCartCouponMock = vi.fn();
  const removeCartCouponMock = vi.fn();

  useCartContext.mockReturnValue({
    addCartCoupon: addCartCouponMock,
    removeCartCoupon: removeCartCouponMock,
  });

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

  const mockCartTotal = 54;

  const mockNewValidCoupon = {
    id: 1,
    code: 'COUPON-5',
    type: 'fixed',
    amount: 5,
    expires: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders totals', () => {
    render(
      <MemoryRouter>
        <Totals cartSubTotal={mockCartSubTotal} cartCoupons={mockCartCoupons} cartTotal={mockCartTotal} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /cart totals/i })).toBeInTheDocument();

    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/£60/i)).toBeInTheDocument();

    expect(screen.getByText(/estimated total/i)).toBeInTheDocument();
    expect(screen.getByText(/£54/i)).toBeInTheDocument();
  });

  test('renders add coupon button', () => {
    render(
      <MemoryRouter>
        <Totals cartSubTotal={mockCartSubTotal} cartCoupons={mockCartCoupons} cartTotal={mockCartTotal} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /add coupons/i })).toBeInTheDocument();
  });

  test('renders add coupon form when button clicked', () => {
    render(
      <MemoryRouter>
        <Totals cartSubTotal={mockCartSubTotal} cartCoupons={mockCartCoupons} cartTotal={mockCartTotal} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /add coupons/i }));

    expect(screen.getByRole('form', { name: /add coupon/i })).toBeInTheDocument();
  });

  test('adds new coupon when form successfully submitted', async () => {
    getCouponByCode.mockResolvedValue(mockNewValidCoupon);

    render(
      <MemoryRouter>
        <Totals cartSubTotal={mockCartSubTotal} cartCoupons={mockCartCoupons} cartTotal={mockCartTotal} addCartCoupon={addCartCouponMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /add coupons/i }));

    const couponForm = await screen.findByRole('form', { name: /add coupon/i });
    expect(couponForm).toBeInTheDocument();

    fireEvent.change(within(couponForm).getByLabelText(/enter code/i), {
      target: { value: 'coupon-5' },
    });

    fireEvent.click(within(couponForm).getByRole('button', { name: /apply/i }));

    await waitFor(() => {
      expect(addCartCouponMock).toHaveBeenCalledWith(mockNewValidCoupon);
    });
  });

  test('removes coupon when remove button clicked', () => {
    render(
      <MemoryRouter>
        <Totals cartSubTotal={mockCartSubTotal} cartCoupons={mockCartCoupons} cartTotal={mockCartTotal} removeCartCoupon={removeCartCouponMock} />
      </MemoryRouter>
    );

    const couponsList = screen.getByRole('list', { name: /active coupons/i });
    expect(couponsList).toBeInTheDocument();

    fireEvent.click(within(couponsList).getByRole('button', { name: /remove coupon/i }));

    expect(removeCartCouponMock).toHaveBeenCalledWith(2);
  });

  test('renders discount if coupon active', () => {
    render(
      <MemoryRouter>
        <Totals cartSubTotal={mockCartSubTotal} cartCoupons={mockCartCoupons} cartTotal={mockCartTotal} />
      </MemoryRouter>
    );

    expect(screen.getByText(/discount/i)).toBeInTheDocument();
    expect(screen.getByText(/-£6/i)).toBeInTheDocument();

    const couponsList = screen.getByRole('list', { name: /active coupons/i });
    expect(couponsList).toBeInTheDocument();

    const coupons = within(couponsList).getAllByRole('listitem');
    expect(coupons).toHaveLength(1);
  });

  test('hides discount if no coupon active', () => {
    render(
      <MemoryRouter>
        <Totals cartSubTotal={mockCartSubTotal} cartTotal={mockCartTotal} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/discount/i)).not.toBeInTheDocument();
  });

  test('renders checkout button', () => {
    render(
      <MemoryRouter>
        <Totals cartSubTotal={mockCartSubTotal} cartCoupons={mockCartCoupons} cartTotal={mockCartTotal} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /proceed to checkout/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /proceed to checkout/i })).toHaveAttribute('href', '/checkout');
  });
});
