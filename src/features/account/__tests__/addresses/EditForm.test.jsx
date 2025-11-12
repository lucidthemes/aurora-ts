import { render, screen, fireEvent } from '@testing-library/react';
import EditForm from '../../components/addresses/EditForm';

describe('EditForm component', () => {
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

  const mockLoggedInUserUpdated = {
    firstName: 'James',
    lastName: 'Matthew',
    country: 'GB',
    addressLine1: '68 Rose Place',
    addressLine2: '',
    city: 'East Marybury',
    county: 'Highland',
    postcode: 'IV2 7EG',
    phone: '01234567890',
  };

  const handleUserUpdateMock = vi.fn();

  const handleShippingEditShowMock = vi.fn();

  const handleBillingEditShowMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders shipping address input fields and submit button', () => {
    render(
      <EditForm
        loggedInUser={mockLoggedInUser}
        handleUserUpdate={handleUserUpdateMock}
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        section="shipping"
      />
    );

    expect(screen.getByRole('form', { name: /shipping address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address line 1/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address line 2/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /city/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /county/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /postcode/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('renders billing address input fields and submit button', () => {
    render(
      <EditForm
        loggedInUser={mockLoggedInUser}
        handleUserUpdate={handleUserUpdateMock}
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        section="billing"
      />
    );

    expect(screen.getByRole('form', { name: /billing address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address line 1/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /address line 2/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /city/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /county/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /postcode/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('shows error messages for missing shipping address fields', () => {
    render(
      <EditForm
        loggedInUser={mockLoggedInUser}
        handleUserUpdate={handleUserUpdateMock}
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        section="shipping"
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: '' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(screen.getByText(/please enter a first name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a last name/i)).toBeInTheDocument();
  });

  test('shows error messages for missing billing address fields', () => {
    render(
      <EditForm
        loggedInUser={mockLoggedInUser}
        handleUserUpdate={handleUserUpdateMock}
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        section="billing"
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: '' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(screen.getByText(/please enter a first name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a last name/i)).toBeInTheDocument();
  });

  test('updates shipping address on valid form submission if address has been changed', () => {
    render(
      <EditForm
        loggedInUser={mockLoggedInUser}
        handleUserUpdate={handleUserUpdateMock}
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        section="shipping"
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: 'James' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: 'Matthew' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(handleUserUpdateMock).toHaveBeenCalledWith('shipping', mockLoggedInUserUpdated);
    expect(handleShippingEditShowMock).toHaveBeenCalled();
  });

  test('updates billing address on valid form submission if address has been changed', () => {
    render(
      <EditForm
        loggedInUser={mockLoggedInUser}
        handleUserUpdate={handleUserUpdateMock}
        handleShippingEditShow={handleShippingEditShowMock}
        handleBillingEditShow={handleBillingEditShowMock}
        section="billing"
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: /first name/i }), {
      target: { value: 'James' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /last name/i }), {
      target: { value: 'Matthew' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(handleUserUpdateMock).toHaveBeenCalledWith('billing', mockLoggedInUserUpdated);
    expect(handleBillingEditShowMock).toHaveBeenCalled();
  });
});
