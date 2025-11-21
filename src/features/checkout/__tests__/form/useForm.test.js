import { renderHook, act } from '@testing-library/react';
import useForm from '../../hooks/form/useForm';

describe('useEditForm hook', () => {
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

  const mockPaymentOption = {
    id: 1,
    name: 'Direct bank transfer',
    description:
      'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.',
  };

  const mockCheckoutTotal = 60;

  const mockLoggedInUser = {
    id: 1,
    email: 'test@example.com',
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
  };

  const navigateMock = vi.fn();

  const mockNotLoggedInUser = {};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('sets initial checkoutFormData email to logged in user email', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockLoggedInUser,
        navigateMock
      )
    );

    expect(result.current.checkoutFormData.contact.email).toBe('test@example.com');
  });

  test('sets initial checkoutFormData shipping address to logged in user shipping address if set', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockLoggedInUser,
        navigateMock
      )
    );

    expect(result.current.checkoutFormData.shipping.firstName).toBe('Matthew');
    expect(result.current.checkoutFormData.shipping.lastName).toBe('James');
    expect(result.current.checkoutFormData.shipping.country).toBe('GB');
    expect(result.current.checkoutFormData.shipping.addressLine1).toBe('68 Rose Place');
    expect(result.current.checkoutFormData.shipping.city).toBe('East Marybury');
    expect(result.current.checkoutFormData.shipping.county).toBe('Highland');
    expect(result.current.checkoutFormData.shipping.postcode).toBe('IV2 7EG');
    expect(result.current.checkoutFormData.shipping.phone).toBe('01234567890');
  });

  test('sets initial checkoutFormData billing address to logged in user billing address if set', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockLoggedInUser,
        navigateMock
      )
    );

    expect(result.current.checkoutFormData.billing.firstName).toBe('Matthew');
    expect(result.current.checkoutFormData.billing.lastName).toBe('James');
    expect(result.current.checkoutFormData.billing.country).toBe('GB');
    expect(result.current.checkoutFormData.billing.addressLine1).toBe('68 Rose Place');
    expect(result.current.checkoutFormData.billing.city).toBe('East Marybury');
    expect(result.current.checkoutFormData.billing.county).toBe('Highland');
    expect(result.current.checkoutFormData.billing.postcode).toBe('IV2 7EG');
    expect(result.current.checkoutFormData.billing.phone).toBe('01234567890');
  });

  test('does not set initial checkoutFormData state for visitors not logged in', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockNotLoggedInUser,
        navigateMock
      )
    );

    expect(result.current.checkoutFormData.contact.email).toBe('');

    expect(result.current.checkoutFormData.shipping.firstName).toBe('');
    expect(result.current.checkoutFormData.shipping.lastName).toBe('');

    expect(result.current.checkoutFormData.billing.firstName).toBe('');
    expect(result.current.checkoutFormData.billing.lastName).toBe('');
  });

  test('updates email on handleFormChange', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockLoggedInUser,
        navigateMock
      )
    );

    act(() => {
      result.current.handleFormChange({ target: { name: 'email', value: 'test2@example.com' } }, 'contact');
    });

    expect(result.current.checkoutFormData.contact.email).toBe('test2@example.com');
  });

  test('updates shipping address on handleFormChange', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockLoggedInUser,
        navigateMock
      )
    );

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: 'James' } }, 'shipping');
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: 'Matthew' } }, 'shipping');
    });

    expect(result.current.checkoutFormData.shipping.firstName).toBe('James');
    expect(result.current.checkoutFormData.shipping.lastName).toBe('Matthew');
  });

  test('updates billing address on handleFormChange', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockLoggedInUser,
        navigateMock
      )
    );

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: 'James' } }, 'billing');
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: 'Matthew' } }, 'billing');
    });

    expect(result.current.checkoutFormData.billing.firstName).toBe('James');
    expect(result.current.checkoutFormData.billing.lastName).toBe('Matthew');
  });

  test('prevent default enter key behaviour when not in textarea, select, or submit button to stop form submitting', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockLoggedInUser,
        navigateMock
      )
    );

    const preventDefault = vi.fn();

    const mockEvent = {
      key: 'Enter',
      target: { tagName: 'input', type: 'text' },
      preventDefault,
    };

    act(() => {
      result.current.handleFormKeyDown(mockEvent);
    });

    expect(preventDefault).toHaveBeenCalled();
  });

  test('updates error for missing email field', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockNotLoggedInUser,
        navigateMock
      )
    );

    act(() => {
      result.current.handleFormChange({ target: { name: 'email', value: '' } }, 'contact');
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.checkoutFormErrors.contact.email).toBe('Please enter an email address');
  });

  test('updates error for invalid email field', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockNotLoggedInUser,
        navigateMock
      )
    );

    act(() => {
      result.current.handleFormChange({ target: { name: 'email', value: 'invalid-email' } }, 'contact');
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.checkoutFormErrors.contact.email).toBe('Please enter a valid email address');
  });

  test('updates errors for missing shipping address fields', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockNotLoggedInUser,
        navigateMock
      )
    );

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: '' } }, 'shipping');
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: '' } }, 'shipping');
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.checkoutFormErrors.shipping.firstName).toBe('Please enter a first name');
    expect(result.current.checkoutFormErrors.shipping.lastName).toBe('Please enter a last name');
  });

  test('updates errors for missing billing address fields if same address for billing is disabled', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockNotLoggedInUser,
        navigateMock
      )
    );

    expect(result.current.billingSameShipping).toBe(true);

    act(() => {
      result.current.setBillingSameShipping(false);
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: '' } }, 'billing');
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: '' } }, 'billing');
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.billingSameShipping).toBe(false);
    expect(result.current.checkoutFormErrors.billing.firstName).toBe('Please enter a first name');
    expect(result.current.checkoutFormErrors.billing.lastName).toBe('Please enter a last name');
  });

  test('creates new order and navigates to order received page on valid form submission', () => {
    const { result } = renderHook(() =>
      useForm(
        mockCartItems,
        mockCartSubTotal,
        mockCartCoupons,
        emptyCartMock,
        mockShippingOption,
        mockPaymentOption,
        mockCheckoutTotal,
        mockLoggedInUser,
        navigateMock
      )
    );

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(emptyCartMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/checkout/order-received/1001');
  });
});
